import { Bus } from './../../bus/entities/bus.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'real' })
  lat: number;

  @Column({ type: 'real' })
  lon: number;

  @Column({ type: 'int', nullable: true })
  speed: number;

  @Column({ type: 'timestamp' })
  device_timestamp: Date;

  @Column({ type: 'timestamp' })
  server_timestamp: Date;

  @Column({ type: 'int' })
  direction: number;

  @ManyToOne(() => Bus)
  @JoinColumn({ name: 'bus_id' })
  bus: Bus;

  constructor(options: Partial<Point>) {
    Object.assign(this, options);
  }
}
