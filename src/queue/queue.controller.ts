import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('add')
  addToQueue(
    @Body()
    body: {
      patientName: string;
      timeSlot: string;
      date: string;
      doctorId: number;
    },
  ) {
    return this.queueService.addToQueue(body);
  }

  @Get()
  findAll() {
    return this.queueService.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.queueService.updateStatus(+id, body.status);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.queueService.delete(+id);
  }
}
