import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ReadinessService } from './readiness.service';

@Controller('api/readiness')
export class ReadinessController {
  constructor(private service: ReadinessService) {}

  @Post('compute')
  compute(@Body() body: { hospitalId: string }) {
    return this.service.compute(body.hospitalId);
  }

  @Get(':hospitalId')
  get(@Param('hospitalId') id: string) {
    return this.service.get(id);
  }
}
