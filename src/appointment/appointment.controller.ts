import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Post('book')
  book(
    @Body()
    body: {
      patientName: string;
      patientContact: string;
      timeSlot: string;
      date: string;
      doctorId: number;
    },
  ) {
    return this.service.book(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.service.updateStatus(+id, body.status);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @Post('delete-by-name')
  deleteByName(@Body() body: { patientName: string }) {
    return this.service.deleteByPatientName(body.patientName);
  }
}
