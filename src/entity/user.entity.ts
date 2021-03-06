import { BaseEntity, Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity({ name: 'TBL_USER' })
export class User extends BaseEntity {
  @PrimaryColumn({ name: 'USE_ID' })
  @Generated('increment')
  public id: number;

  @Column({
    type: 'varchar',
    length: '20',
    unique: true,
    nullable: false,
    name: 'USE_EMAIL',
  })
  public email: string;

  @Column({
    type: 'varchar',
    length: '20',
    nullable: false,
    name: 'USE_PASSWORD',
  })
  public password: string;

  @Column({
    type: 'varchar',
    length: '20',
    nullable: false,
    name: 'USE_USERNAME',
  })
  public userName: string;

  @Column({ type: 'timestamp', name: 'USE_CREATE_AT' })
  public createdAt: Date;

  @Column({ type: 'timestamp', name: 'USE_UPDATE_AT' })
  public updatedAt: Date;
}
