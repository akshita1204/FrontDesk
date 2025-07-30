import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) {}

  findAll() {
    return this.doctorRepo.find();
  }

  findOne(id: number) {
    return this.doctorRepo.findOneBy({ id });
  }

  create(doctor: Partial<Doctor>) {
    return this.doctorRepo.save(doctor);
  }

  async update(id: number, doctor: Partial<Doctor>) {
    await this.doctorRepo.update(id, doctor);
    return this.doctorRepo.findOneBy({ id });
  }

  delete(id: number) {
    return this.doctorRepo.delete(id);
  }
}
