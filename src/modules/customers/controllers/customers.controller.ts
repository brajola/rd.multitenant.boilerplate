import { Controller, Get, Param } from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomersResponse } from '../dto/customers.response.dto';

@Controller('customers')
@ApiTags('Customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'Get Customer By CNPJ' })
  @ApiHeader({ name: 'x-tenant-id', description: 'Tenant Id' })
  @Get('/cnpj/:cnpj')
  async findByCnpj(@Param('cnpj') cnpj: number): Promise<CustomersResponse> {
    return this.customersService.findByCnpj(cnpj);
  }

  @ApiOperation({ summary: 'Get Customer By Id' })
  @ApiHeader({ name: 'x-tenant-id', description: 'Tenant Id' })
  @Get('/:customerId')
  async findOne(@Param('customerId') customerId: number): Promise<CustomersResponse> {
    return this.customersService.findOne(customerId);
  }

  @ApiOperation({ summary: 'Get Customers' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiHeader({ name: 'x-tenant-id', description: 'Tenant Id' })
  @Get('/')
  async findAll(): Promise<CustomersResponse[]> {
    return this.customersService.findAll();
  }
}
