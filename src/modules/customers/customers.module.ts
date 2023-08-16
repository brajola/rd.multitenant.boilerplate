import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { SwaggerModule } from '@nestjs/swagger';
import { TenantModule } from '@modules/tenant/tenant.module';

@Module({
    imports: [
        TenantModule,
        ConfigModule.forRoot(),
        SwaggerModule
    ],
    providers: [CustomersService],
    controllers: [CustomersController],
})

export class CustomersModule { }