import { Module } from "@nestjs/common";
import { CommentsModule } from "../comments/comments.module";
import { CommentsImportService } from "../comments/comments-import.service";

@Module({
  imports: [CommentsModule],
  providers: [CommentsImportService],
})
export class ImportModule {}