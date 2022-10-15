import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'tbluser' })
export class User extends BaseEntity {
  @PrimaryColumn()
  @Generated('increment')
  public id: number;

  @Column({
    type: 'varchar',
    length: '20',
    unique: true,
    nullable: false,
  })
  public email: string;

  @Column({
    type: 'varchar',
    length: '20',
    nullable: false,
  })
  public password: string;

  @Column({
    type: 'varchar',
    length: '20',
    nullable: false,
  })
  public userName: string;

  @Column({ type: 'varchar', length: '100', nullable: false })
  @Generated('uuid')
  public idUnique: string;

  @Column()
  public picture: string;

  @Column()
  public phone: string;

  @Column()
  public comment: string;

  @Column({ type: 'timestamp' })
  public createdAt: Date;

  @Column({ type: 'timestamp' })
  public updatedAt: Date;
}
