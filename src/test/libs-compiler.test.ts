import LibsCompiler from "{root}/src/app/libs-compiler.ts";

// Esto se ejecuta desde "commands/test.js"
LibsCompiler.create("..").start("src/modules/std/demo/commands/hello.js");