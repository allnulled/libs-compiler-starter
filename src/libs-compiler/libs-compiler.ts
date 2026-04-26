import Compiler from "./Compiler.ts";

declare const __dirname:string;

Compiler.create(__dirname + "/..").compile("src/bin.ts");