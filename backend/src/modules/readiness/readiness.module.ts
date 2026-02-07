import { Module } from '@nestjs/common';
import { ReadinessService } from './readiness.service';
import { ReadinessController } from './readiness.controller';

@Module({
  imports: [],
  providers: [ReadinessService],
  controllers: [ReadinessController],
})
export class ReadinessModule {}
