import { Command } from "@squareboat/nest-console";
import { Injectable } from "@nestjs/common";
import { createSpinner } from "nestjs-console";
import { getComments } from "./xml.parser";
import { CommentsService } from "../comments/services/comments.service";

@Injectable()
export class CommentsImportService {
  constructor(
    private readonly commentsService: CommentsService
  ) {}

  @Command('import-comments', {
    desc: 'Import command',
    args: { name: { req: false } },
  })
  async getComments() {
    const spin = createSpinner();
    spin.start(`Importing comments`);

    try {
      const comments = await getComments();
      for (const comment of comments) {
        await this.commentsService.create(comment.$.Text);
      }
    } catch (e) {
      console.log(e);
    }

    spin.succeed("Done");
  }
}