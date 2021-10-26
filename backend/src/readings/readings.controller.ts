import { Controller, Get, Param, Query } from '@nestjs/common';
import { ReadingsService } from './readings.service';

@Controller('readings')
export class ReadingsController {
    constructor(private readonly readingsService: ReadingsService) {}

    @Get()
    findAll(@Query() start: string, end: string) {
        console.log(start);
        return this.readingsService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.readingsService.findById(id);
    }
}
