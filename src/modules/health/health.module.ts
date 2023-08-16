import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './controllers/health.controller';
import { SwaggerModule } from '@nestjs/swagger';

@Module({
    imports: [ConfigModule.forRoot(), SwaggerModule],
    controllers: [HealthController],
})

export class HealthModule { }
