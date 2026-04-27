import fs from "fs";
import path from "path";
import { createRequire } from 'node:module';
import { fileURLToPath } from "url";
import { rollup } from "rollup";
import sourceToString from "./utils/rollup-plugins/sourceToString.js";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";
import hasSpecificEntry from "./utils/hasSpecificEntry.js";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const require = createRequire(projectRoot);
const libsConfig = require(path.resolve(projectRoot, "libsconfig.js"));
const allDrivers = libsConfig.drivers;
const driverIds = Object.keys(allDrivers);
const customPathsForRollup = driverIds.map(id => ({ find: id, replacement: path.resolve(projectRoot, allDrivers[id] || "") }));
const customPathsForTsconfig = driverIds.reduce((output, id) => {
  output[id + "/*"] = allDrivers[id] ? [allDrivers[id] + "/*"] : ["*"];
  return output;
}, {});

console.log("🚕 Final drivers:", customPathsForTsconfig);

const pack = async function ({ input: inputFile, output: outputFile }) {
  console.log("[🎁] Packing entrypoint:")
  console.log("  - from:  " + inputFile);
  console.log("  - to:   " + outputFile);
  const bundle = await rollup({
    input: inputFile,
    plugins: [
      alias({
        entries: customPathsForRollup,
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
    format: "cjs", // esm para import/export clásico
    sourcemap: false,
  });
};

const syncDrivers = async function () {
  console.log("[♻️] Updating tsconfig drivers...");
  const tsconfigPath = path.resolve(projectRoot, "tsconfig.json");
  const tsconfigData = await require(tsconfigPath);
  tsconfigData.compilerOptions.paths = customPathsForTsconfig;
  await fs.promises.writeFile(tsconfigPath, JSON.stringify(tsconfigData, null, 2), "utf8");
  console.log("[♻️] Updating libs drivers...");
  const libsSettingsPath = path.resolve(projectRoot, "src/modules/settings.json");
  const libsSettings = await require(libsSettingsPath);
  libsSettings.drivers = allDrivers;
  await fs.promises.writeFile(libsSettingsPath, JSON.stringify(libsSettings, null, 2), "utf8");
};

const handleStaticModuleInTs = async function(file) {
  const modulesDir = path.resolve(projectRoot, "src/modules/");
  // si no es el dir, seguimos normal (false):
  if(!file.startsWith(modulesDir)) {
    return false;
  }
  // si no es extensión ts, interrumpimos, no seguimos normal (true);
  if(!file.endsWith(".ts")) {
    console.log(`[♻️ ] Changes ignored as only «*.ts» files are observed under «src/modules/»`);
    return true;
  }
  // si es .d.ts, interrumpimos, no seguimos normal (true);
  if(!file.endsWith(".ts")) {
    console.log(`[♻️ ] Changes ignored as «*.d.ts» files are omitted under «src/modules/»`);
    return true;
  }
  await pack({
    input: path.resolve(file),
    output: path.resolve(file.replace(/\.ts$/g, "") + ".js"),
  });
  return true;
}

const main = async function () {
  await syncDrivers();
  const [file] = process.argv.concat([]).splice(2);
  if(await handleStaticModuleInTs(file)) return;
  const srcdir = path.resolve(projectRoot, "src");
  const nodes = await fs.promises.readdir(srcdir + "/app");
  const entries = nodes.filter(it => it.endsWith(".ts"));
  for (let index = 0; index < entries.length; index++) {
    const entry = entries[index].replace(/\.ts$/g, "");
    if (hasSpecificEntry(file, entry, srcdir)) {
      console.log(`[♻️ ] Compiling specific entry: ${entry}`);
      await pack({
        input: path.resolve(projectRoot, `src/app/${entry}.ts`),
        output: path.resolve(projectRoot, `dist/app/${entry}/${entry}.dist.js`),
      });
      await pack({
        input: path.resolve(projectRoot, `src/test/${entry}.test.ts`),
        output: path.resolve(projectRoot, `dist/app/${entry}/${entry}.test.dist.js`),
      });
    }
  }
  console.log("[♻️ *️⃣ ] Compiling all entries");
  for (let index = 0; index < entries.length; index++) {
    const entry = entries[index].replace(/\.ts$/g, "");
    await pack({
      input: path.resolve(projectRoot, `src/app/${entry}.ts`),
      output: path.resolve(projectRoot, `dist/app/${entry}/${entry}.dist.js`),
    });
    await pack({
      input: path.resolve(projectRoot, `src/test/${entry}.test.ts`),
      output: path.resolve(projectRoot, `dist/app/${entry}/${entry}.test.dist.js`),
    });
  }
};

main();
