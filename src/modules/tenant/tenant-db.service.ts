import { Connection, createConnection, getConnection, Repository } from 'typeorm';
import { DatabaseDto } from './dto/database.dto';
import { sqlCreateDatabase } from './db/create.database';
import { BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantEntities } from './entities';
import { SystemMessages } from '@common/constants/system.messages';
import { Tenant } from '@modules/tenant/tenant.entity';
import { TenantService } from '@modules/tenant/tenant.service';

export class TenantDBService {
  constructor(
    @InjectRepository(Tenant) private readonly contractsRepository: Repository<Tenant>,
    @Inject(TenantService) private tenantService: TenantService,
  ) {}

  async generateDatabase(tenantId: string): Promise<DatabaseDto> {
    try {
      const databasePrefix = 'pdvomni_';
      const contract = await this.tenantService.findSimple(tenantId);
      const contractCode = contract.code.replace('-', '_');
      const database = await getConnection('default').query(
        sqlCreateDatabase.replace('[DBNAME]', tenantId.toLowerCase()),
      );

      const updateContract = {
        config: {
          database: {
            database: (databasePrefix + contractCode).toLowerCase(),
            hostname: process.env.MYSQL_HOST,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
          },
        }
      };

      const createdConnection: Connection = await createConnection({
        name: (databasePrefix + contractCode).toLowerCase(),
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: 3306,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: (databasePrefix + contractCode).toLowerCase(),
        entities: TenantEntities,
        synchronize: true,
      });

      if (!createdConnection) {
        throw new BadRequestException(SystemMessages.POEC0003);
      }

      await createdConnection.synchronize();
      //await this.tenantService.updateSimple(contractId, updateContract);
      return database;
    } catch (e) {
      //await this.tenantService.delete(contractId);
    }
  }

  async createTenantArtifacts(databaseName: string): Promise<DatabaseDto> {
    const sqlQuery = sqlCreateDatabase.replace('[DBNAME]', databaseName);
    return await getConnection('default').query(sqlQuery);
  }
}
