import type CommandExecution$ from "../classes/CommandExecution.ts";

const CommandExecution = Libs.require("src/modules/std/demo/classes/CommandExecution.js");

const command:CommandExecution$ = new CommandExecution({
  basedir: ".",
  command: "src/modules/std/demo/alguna-cosa.txt"
});

command.start();