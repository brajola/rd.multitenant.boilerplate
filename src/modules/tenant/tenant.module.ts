import { BadRequestException, MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, createConnection, getConnection } from 'typeorm';
import { SystemMessages } from '@common/constants/system.messages';
import { NextFunction } from 'express';
import { TenantEntities } from './entity/entities';
import { Tenant } from '@modules/tenant/entity/tenant.entity';
import { Users } from '@modules/users/entity/users.entity';

export const TENANT_CONNECTION = 'TENANT_CONNECTION';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Users])],
  providers: [
    {
      provide: TENANT_CONNECTION,
      inject: [REQUEST, Connection],
      scope: Scope.REQUEST,
      useFactory: async (request, connection) => {
        if (!request.headers['x-tenant-id']) {
          request.headers['x-tenant-id'] = process.env.DEFAULT_TENANT;
        }

        const tenantsQuery: Tenant = await connection
          .getRepository(Tenant)
          .findOne({ where: { tenantId: request.headers['x-tenant-id'] } });

        if (!tenantsQuery) {
          throw new BadRequestException(SystemMessages.POEC0002);
        }

        const selectedTenant = tenantsQuery;

        try {
          return getConnection(selectedTenant.code);
        } catch (e) {
          const databaseConfig = selectedTenant.config;
          const databaseSettings = databaseConfig.database;
          const createdConnection: Connection = await createConnection({
            name: selectedTenant.code,
            type: 'mysql',
            host: databaseSettings.hostname,
            port: 3306,
            username: databaseSettings.username,
            password: databaseSettings.password,
            database: databaseSettings.database,
            entities: TenantEntities,
            synchronize: true,
          });

          if (createdConnection) {
            console.log('Connected to ' + databaseSettings.database);
            return getConnection(selectedTenant.code);
          } else {
            throw new BadRequestException(SystemMessages.POEC0003 + 'b');
          }
        }
      },
    },
  ],
  exports: [TENANT_CONNECTION],
})
export class TenantModule {
  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.headers['x-tenant-id']) {
          req.headers['x-tenant-id'] = process.env.DEFAULT_TENANT;
        }

        const selectedTenant: Tenant = await this.connection
          .getRepository(Tenant)
          .findOne({ where: { tenantId: req.headers['x-tenant-id'] } });

        if (!selectedTenant) {
          throw new BadRequestException(SystemMessages.POEC0002);
        }

        try {
          getConnection(selectedTenant.code);
          next();
        } catch (e) {
          const databaseConfig = selectedTenant.config;
          const databaseSettings = databaseConfig.database;
          const createdConnection: Connection = await createConnection({
            name: selectedTenant.code,
            type: 'mysql',
            host: databaseSettings.hostname,
            port: 3306,
            username: databaseSettings.username,
            password: databaseSettings.password,
            database: databaseSettings.database,
            entities: TenantEntities,
            synchronize: true,
          });

          if (createdConnection) {
            console.log('Connected to ' + databaseSettings.database);
            next();
          } else {
            throw new BadRequestException(SystemMessages.POEC0003 + ' 4');
          }
        }
      })
      .forRoutes('*');
  }
}
