export class StateException extends Error {
  constructor(msg: string = "") {
    super(`StateException:${msg ? (" " + msg) : ''}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, StateException.prototype);
  }
} 
