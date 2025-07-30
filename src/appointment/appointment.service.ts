import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { Repository } from 'typeorm';
import { Doctor } from '../doctor/doctor.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) {}

  async book(data: {
    patientName: string;
    patientContact: string;
    timeSlot: string;
    date: string;
    doctorId: number;
  }) {
    const doctor = await this.doctorRepo.findOneBy({ id: data.doctorId });
    if (!doctor) throw new Error('Doctor not found');

    const appointment = this.appointmentRepo.create({
      ...data,
      doctor,
      status: 'booked',
    });

    return this.appointmentRepo.save(appointment);
  }

  findAll() {
    return this.appointmentRepo.find({ relations: ['doctor'] });
  }

  async updateStatus(id: number, status: string) {
    const appointment = await this.appointmentRepo.findOneBy({ id });
    if (!appointment) throw new Error('Appointment not found');

    appointment.status = status;
    return this.appointmentRepo.save(appointment);
  }

  delete(id: number) {
    return this.appointmentRepo.delete(id);
  }

  async deleteByPatientName(patientName: string) {
    return this.appointmentRepo
      .createQueryBuilder()
      .delete()
      .from(Appointment)
      .where('patientName = :name', { name: patientName })
      .execute();
  }
}
