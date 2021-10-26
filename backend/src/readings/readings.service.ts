import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reading } from './entities/reading.entity';

@Injectable()
export class ReadingsService {
    constructor(
        @InjectRepository(Reading) private readonly repo: Repository<Reading>
    ) {}

    findAll(): Promise<Reading[]> {
        return this.repo.find();
    }

    findById(id: string) {
        return this.repo.find({
            where: {
                Serial_Number: id,
            },
        });
    }
}
