import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ReadingsModule } from './readings/readings.module';

@Module({
    imports: [ConfigModule.forRoot(), DatabaseModule, ReadingsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
