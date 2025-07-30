import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from './queue.entity';
import { Doctor } from '../doctor/doctor.entity';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private queueRepo: Repository<Queue>,
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) {}

  async addToQueue(data: {
    patientName: string;
    timeSlot: string;
    date: string;
    doctorId: number;
  }) {
    const doctor = await this.doctorRepo.findOneBy({ id: data.doctorId });
    if (!doctor) throw new Error('Doctor not found');

    const entry = this.queueRepo.create({
      patientName: data.patientName,
      timeSlot: data.timeSlot,
      date: data.date,
      status: 'waiting',
      doctor,
    });

    return this.queueRepo.save(entry);
  }

  findAll() {
    return this.queueRepo.find({ relations: ['doctor'] });
  }

  async updateStatus(id: number, status: string) {
    const entry = await this.queueRepo.findOneBy({ id });
    if (!entry) throw new Error('Queue entry not found');

    entry.status = status;
    return this.queueRepo.save(entry);
  }

  delete(id: number) {
    return this.queueRepo.delete(id);
  }
}
