import { Controller, Get, Query } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { FetchCommentsListDto } from './fetch-comments-list.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async commentAction(@Query() fetchCommentsListDto: FetchCommentsListDto) {
    const comments = await this.commentsService.get(
      fetchCommentsListDto.phrase,
    );

    return comments;
  }
}
