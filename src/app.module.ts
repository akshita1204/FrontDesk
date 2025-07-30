import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { QueueModule } from './queue/queue.module';
import { AppointmentModule } from './appointment/appointment.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Akshita@14',
      database: 'clinic',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    DoctorModule,
    AppointmentModule,
    QueueModule,
  ],
})
export class AppModule {}
