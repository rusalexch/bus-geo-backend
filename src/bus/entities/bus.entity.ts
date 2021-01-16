import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bus')
export class Bus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar' })
  ident: string;

  constructor(options: Partial<Bus>) {
    Object.assign(this, options);
  }
}
