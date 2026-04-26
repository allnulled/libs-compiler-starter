import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { rollup } from "rollup";
import sourceToString from "./utils/rollup-plugins/sourceToString.js";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";
import hasSpecificEntry from "./utils/hasSpecificEntry.js";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const pack = async function ({ input: inputFile, output: outputFile }) {
  const bundle = await rollup({
    input: inputFile,
    plugins: [
      alias({
        entries: [{
          find: "{src}",
          replacement: path.resolve(projectRoot, "src"),
        }, {
          find: "{root}",
          replacement: path.resolve(projectRoot),
        }],
      }),
      resolve({
        extensions: [".js", ".ts"]
      }),
      sourceToString(),
      babel({
        babelHelpers: "bundled",
        extensions: [".js", ".ts"],
        presets: [
          [
            "@babel/preset-env", {
              targets: {
                // esmodules: true,
                node: "20"
              }
            }
          ],
          "@babel/preset-typescript"
        ],
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }]
        ]
      }),
    ],
  });
  return await bundle.write({
    file: outputFile,
    format: "esm",
    sourcemap: false,
  });
};

const main = async function() {
  const [file] = process.argv.concat([]).splice(2);
  const srcdir = path.resolve(projectRoot, "src");
  const nodes = await fs.promises.readdir(srcdir + "/app");
  const entries = nodes.filter(it => it.endsWith(".ts"));
  for(let index=0; index<entries.length; index++) {
    const entry = entries[index].replace(/\.ts$/g, "");
    if(hasSpecificEntry(file, entry, srcdir)) {
      console.log(`[♻️ ] Compiling specific entry: ${entry}`);
      return await pack({
        input: path.resolve(projectRoot, `src/app/${entry}.ts`),
        output: path.resolve(projectRoot, `dist/app.${entry}.dist.js`),
      });
    }
  }
  console.log("[♻️ *️⃣ ] Compiling all entries");
  for(let index=0; index<entries.length; index++) {
    const entry = entries[index].replace(/\.ts$/g, "");
    await pack({
      input: path.resolve(projectRoot, `src/app/${entry}.ts`),
      output: path.resolve(projectRoot, `dist/app.${entry}.dist.js`),
    });
    await pack({
      input: path.resolve(projectRoot, `src/test/${entry}.test.ts`),
      output: path.resolve(projectRoot, `dist/test.${entry}.dist.js`),
    });
  }
};

main();
