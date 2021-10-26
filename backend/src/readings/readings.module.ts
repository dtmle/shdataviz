import { Module } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { ReadingsController } from './readings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from './entities/reading.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Reading])],
    controllers: [ReadingsController],
    providers: [ReadingsService],
})
export class ReadingsModule {}
