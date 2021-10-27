import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ReadingQueries from 'src/types/ReadingQueries';
import { Between, Repository } from 'typeorm';
import { Reading } from './entities/reading.entity';
import * as moment from 'moment';

@Injectable()
export class ReadingsService {
    constructor(
        @InjectRepository(Reading) private readonly repo: Repository<Reading>
    ) {}

    findAll(queries: ReadingQueries): Promise<Reading[]> {
        const where = {};

        for (const [query, value] of Object.entries(queries)) {
            if (!value) {
                continue;
            }

            if (query === 'DateTime') {
                where[query] = Between(
                    moment(value).startOf('day'),
                    moment(value).endOf('day')
                );
            } else {
                console.log(query, value);
                where[query] = value;
            }
        }

        return this.repo.find({
            where,
            select: ['Serial_Number', 'DateTime', 'Device_ID', 'Wattage'],
        });
    }

    findById(id: string) {
        return this.repo.find({
            where: {
                Serial_Number: id,
            },
        });
    }

    async findAllDevices() {
        const serials = await this.findAllSerialNumbers();

        const deviceMap = {};

        for (const { serial_number } of serials) {
            const devices = await this.repo
                .createQueryBuilder('readings')
                .select(['readings.Device_ID AS Device_ID'])
                .where('readings.Serial_Number = :id', {
                    id: serial_number,
                })
                .distinct(true)
                .getRawMany();
            deviceMap[serial_number] = {
                devices: devices.map((item) => item.device_id),
            };
        }

        return deviceMap;
    }

    findAllSerialNumbers() {
        return this.repo
            .createQueryBuilder('readings')
            .select('readings.Serial_Number AS Serial_Number')
            .distinct(true)
            .getRawMany();
    }
}
