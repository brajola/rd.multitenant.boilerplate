import { BadRequestException, Injectable } from '@nestjs/common';
import { Connection, createConnection, getConnection, Repository } from 'typeorm';
import { SystemMessages } from '@common/constants/system.messages';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from '@modules/tenant/entity/tenant.entity';

@Injectable()
export class TenantService {
  constructor(@InjectRepository(Tenant) private readonly tenantsRepository: Repository<Tenant>) {}

  async findSimple(tenantId: string): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findOne({ where: { tenantId: tenantId } });
    if (!tenant) throw new Error(SystemMessages.POEC0020);

    return tenant;
  }

  async getTenant(TenantRequest: any): Promise<any> {
    let contract = new Tenant();

    if (TenantRequest.hasOwnProperty('tenantId')) {
      const contracts = await this.tenantsRepository.find({ tenantId: TenantRequest.tenantId });
      contract = contracts[0];
    } else {
      throw new BadRequestException(SystemMessages.POEC0003);
    }

    const where = TenantRequest.hasOwnProperty('where') ? TenantRequest.where : { ContractId: contract.id };

    const databaseSettings = contract.config.database;
    const connectionName = String(contract.code + '_' + Math.floor(Math.random() * 1024));

    const createdConnection: Connection = await createConnection({
      name: connectionName,
      type: 'mysql',
      host: String(databaseSettings.hostname),
      port: 3306,
      username: databaseSettings.username,
      password: databaseSettings.password,
      database: databaseSettings.database,
      entities: [TenantRequest.entity],
      synchronize: true,
    });

    if (!createdConnection) {
      throw new BadRequestException(SystemMessages.POEC0003);
    }

    const tenantRepository = getConnection(connectionName).getRepository(TenantRequest.entity);
    const tenants = await tenantRepository.find(where);

    await createdConnection.close().then(async () => {});

    return tenants;
  }
}
