import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentModule } from './comments/comment.module';
import { ormConfig } from "../ormconfig";
import { ConsoleModule } from "@squareboat/nest-console";
import { CommentsImportService } from "./comments/comments-import.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormConfig,
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ]}),
    CommentModule,
    ConsoleModule,
  ],
  controllers: [],
  providers: [CommentsImportService],
})
export class AppModule {}
