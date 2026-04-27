module.exports = {
  drivers: {
    "{root}": "",
    "{src}": "src",
    "{types}": "src/types",
    "{core}": "src/core",
    "{modules}": "src/modules",
    "{test}": "src/test",
    "{app}": "src/app",
    "{dist}": "dist",
  },
  copies: {
    "libs-compiler": [
      "src/external/libs-compiler/libs-compiler.dist.js"
    ]
  }
};