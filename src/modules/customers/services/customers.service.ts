import { Inject } from '@nestjs/common';

import { TenantService } from '../../tenant/decorators/tenant-service.decorator';
import { TENANT_CONNECTION } from '../../tenant/tenant.module';
import { Customers } from '../entity/customers.entity';
import { CustomerAddresses } from '../entity/customeraddresses.entity';
import { CustomersResponse } from '../dto/customers.response.dto';

@TenantService()
export class CustomersService {
  constructor(@Inject(TENANT_CONNECTION) private connection) {}

  async findAll(): Promise<CustomersResponse[]> {
    const customersRepository = await this.connection.getRepository(Customers);
    return await customersRepository.find();
  }

  async findOne(customerId: number): Promise<CustomersResponse> {
    const customersRepository = await this.connection.getRepository(Customers);
    const customerAddressRepository = await this.connection.getRepository(CustomerAddresses);

    let response = await customersRepository.findOne(customerId);
    response.addresses = await customerAddressRepository.find({ where: { CompanyId: customerId } });

    return response;
  }

  async findByCnpj(cnpj: number): Promise<CustomersResponse> {
    const customersRepository = await this.connection.getRepository(Customers);
    const customerAddressRepository = await this.connection.getRepository(CustomerAddresses);

    const company = await customersRepository.find({ where: { cnpj: cnpj } });
    company[0].addresses = await customerAddressRepository.find({ where: { CompanyId: company[0].id } });

    return company[0];
  }
}
