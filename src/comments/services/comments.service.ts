import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(content: string) {
    const comment = new Comment();
    const searchVector = await this.commentRepository.manager.query(
      `SELECT to_tsvector('${content.replace(/'/g, '')}');`,
    );
    comment.content = content.replace(/'/g, '');
    comment.search_vector = searchVector[0].to_tsvector;
    await this.commentRepository.save(comment);
  }

  async get(phrase: string): Promise<Comment[]> {
    return await this.commentRepository
      .createQueryBuilder('comments')
      .select(['id', 'content', 'search_vector'])
      .where(`comments.search_vector @@ to_tsquery('${phrase}')`)
      .getRawMany();
  }
}
