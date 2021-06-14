import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsModule } from './comments/comments.module';
import { ormConfig } from "../ormconfig";
import { ConsoleModule } from "@squareboat/nest-console";
import { ImportModule } from "./import/import.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormConfig,
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ]}),
    CommentsModule,
    ImportModule,
    ConsoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
