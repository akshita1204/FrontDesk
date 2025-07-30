import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Post()
  create(@Body() doctor: Partial<Doctor>) {
    return this.doctorService.create(doctor);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() doctor: Partial<Doctor>) {
    return this.doctorService.update(+id, doctor);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.doctorService.delete(+id);
  }
}
