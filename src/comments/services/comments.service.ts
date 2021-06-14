import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "../comment.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository
  ) {}

  async create(content: string) {
    const comment = new Comment();
    const searchVector = await this.commentRepository.manager.query(`SELECT to_tsvector('${content.replace(/'/g, "")}');`);
    comment.content = content.replace(/'/g, "");
    comment.searchVector = searchVector[0].to_tsvector;
    await this.commentRepository.save(comment);
  }
}