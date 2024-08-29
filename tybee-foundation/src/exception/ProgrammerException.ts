export class ProgrammerException extends Error {
  constructor(msg: string = "") {
    super(`ProgrammerException:${msg ? (" " + msg) : ''}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ProgrammerException.prototype);
  }
} 
