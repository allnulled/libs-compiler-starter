import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import hasSpecificEntry from "./utils/hasSpecificEntry.js";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const main = async function() {
  const [file] = process.argv.concat([]).splice(2);
  const srcdir = path.resolve(projectRoot, "src");
  const nodes = await fs.promises.readdir(srcdir + "/app");
  const entries = nodes.filter(it => it.endsWith(".ts"));
  for(let index=0; index<entries.length; index++) {
    const entry = entries[index].replace(/\.ts$/g, "");
    if(hasSpecificEntry(file, entry, srcdir)) {
      console.log(`[🧪] Testing specific entry: ${entry}`);
      return await import(path.resolve(projectRoot, `dist/app/${entry}/${entry}.test.dist.js`));
    }
  }
  console.log("[🧪*️⃣ ] Testing all entries");
  for(let index=0; index<entries.length; index++) {
    const entry = entries[index].replace(/\.ts$/g, "");
    console.log(`[🧪=${index+1}/${entries.length}] Testing entry «${entry}»`);
    try {
      await import(path.resolve(projectRoot, `dist/app/${entry}/${entry}.test.dist.js`));
    } catch (error) {
      console.error(`[🧪❌] Test failed on entry «${entry}»:`, error);
    }
  }
};

main();
