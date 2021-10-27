import { Controller, Get, Param, Query } from '@nestjs/common';
import ReadingQueries from 'src/types/ReadingQueries';
import { ReadingsService } from './readings.service';

@Controller('readings')
export class ReadingsController {
    constructor(private readonly readingsService: ReadingsService) {}

    @Get('devices')
    findAllDevices() {
        return this.readingsService.findAllDevices();
    }

    @Get()
    // todo: validate query parameters...
    findAll(@Query() queries?: ReadingQueries) {
        return this.readingsService.findAll(queries);
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.readingsService.findById(id);
    }
}
