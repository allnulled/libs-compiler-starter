'use strict';

const CommandExecution = Libs.require("src/modules/std/demo/classes/CommandExecution.js");
const command = new CommandExecution({
  basedir: ".",
  command: "src/modules/std/demo/alguna-cosa.txt"
});
command.start();
