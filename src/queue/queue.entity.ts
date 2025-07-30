import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from '../doctor/doctor.entity';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  status: string; // waiting, in_consultation, done

  @Column()
  timeSlot: string;

  @Column()
  date: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.id)
  doctor: Doctor;
}
