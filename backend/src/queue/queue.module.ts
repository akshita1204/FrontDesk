import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Queue } from './queue.entity';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { Doctor } from '../doctor/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Queue, Doctor])],
  providers: [QueueService],
  controllers: [QueueController],
})
export class QueueModule {}
