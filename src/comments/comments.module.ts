import { Module } from '@nestjs/common';
import { Comment } from "./comment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsService } from "./services/comments.service";

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
