import { BaseEntity, Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity('TBL_PERSON')
export class Person extends BaseEntity {
  @PrimaryColumn({ name: 'PRS_ID' })
  @Generated('increment')
  public id: number;

  @Column({ name: 'PRS_PICTURE' })
  public picture: string;

  @Column({ name: 'PRS_PHONE' })
  public phone: number;

  @Column({ name: 'PRS_COMMENT' })
  public comment: string;
}
