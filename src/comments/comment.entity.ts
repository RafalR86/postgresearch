import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column({ type: 'tsvector'})
  searchVector: string
}