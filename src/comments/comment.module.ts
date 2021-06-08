import { Module } from '@nestjs/common';
import { CommentEntity } from "./comment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])]
})
export class CommentModule {}
