export class NotFoundException extends Error {
  constructor(msg: string = "") {
    super(`NotFoundException:${msg ? (" " + msg) : ''}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
} 
