'use strict';

class CommandExecution {
  constructor(options = {}) {
    this.basedir = "";
    this.command = "";
    this.status = "";
    Object.assign(this, options);
  }
  async start() {
    console.log(`Command started ${this.command}`);
    return {};
  }
  stop() {
    return this;
  }
}

module.exports = CommandExecution;
