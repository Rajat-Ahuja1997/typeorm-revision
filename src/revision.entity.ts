import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from 'typeorm';

@Entity()
export class Revision extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tableName: string;

  @Column()
  rowId: number;

  @Column('json')
  data: any;

  @CreateDateColumn()
  createdAt: Date;
}
