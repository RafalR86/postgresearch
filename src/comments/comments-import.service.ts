import { Command } from "@squareboat/nest-console";
import { Injectable } from "@nestjs/common";
import { createSpinner } from "nestjs-console";
import { getComments } from "../import/xml.parser";

@Injectable()
export class CommentsImportService {
  @Command('import-comments', {
    desc: 'Import command',
    args: { name: { req: false } },
  })
  async getComments() {
    const spin = createSpinner();
    spin.start(`Importing comments`);

    try {
      await getComments();
    } catch (e) {
      console.log(e);
    }

    spin.succeed("Done");
  }
}