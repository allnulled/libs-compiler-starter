import type { CommandResult } from "./CommandResult";

export default class CommandExecution {

  basedir:string;
  command:string;
  status:string;

  constructor(options = {}) {
    this.basedir = "";
    this.command = "";
    this.status = "";
    Object.assign(this, options);
  }

  async start():Promise<{}> {
    console.log(`Command started ${this.command}`);
    return {};
  }
  stop():CommandExecution {
    return this;
  };

};