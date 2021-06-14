import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "../comment.entity";
import { CommentDto } from "../comment.dto";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository
  ) {}

  async create(commentDto: CommentDto) {
    const comment = new Comment();
    comment.content = commentDto.text;
    comment.searchVector = this.commentRepository.queryRunner(`SELECT to_tsvector(${commentDto.text});`);
    this.commentRepository.save(comment);
  }
}