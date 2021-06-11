export class NoFileToImportError extends Error {
  constructor() {
    super("No file to import");
  }
}