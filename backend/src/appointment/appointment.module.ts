import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { Doctor } from '../doctor/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Doctor])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
