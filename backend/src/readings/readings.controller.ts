import { Controller, Get, Param } from '@nestjs/common';
import { ReadingsService } from './readings.service';

@Controller('readings')
export class ReadingsController {
    constructor(private readonly readingsService: ReadingsService) {}

    @Get()
    findAll() {
        return this.readingsService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.readingsService.findById(id);
    }
}
