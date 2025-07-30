import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from '../doctor/doctor.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  patientContact: string;

  @Column()
  timeSlot: string;

  @Column()
  date: string;

  @Column({ default: 'booked' })
  status: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { eager: true })
  doctor: Doctor;
}
