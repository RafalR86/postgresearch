import { Command, Console, createSpinner } from "nestjs-console";

@Console({
  command: "import-comments",
  description: "Import comments from a xml",
})
export class GenerateDdl {
  @Command({
    command: "all",
    description: "Generating all DDL's ",
  })
  async generateDdl() {
    const spin = createSpinner();
    spin.start(`Importing comments`);
    spin.succeed("Done");
  }
}