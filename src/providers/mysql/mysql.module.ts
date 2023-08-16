import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from 'config/database/mysql/config.module';
import { TypeOrmConfigService } from 'config/database/mysql/config.service';
import { Tenant } from "@modules/tenant/tenant.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      useFactory: (typeOrmConfigService: TypeOrmConfigService) => {
        return {
          type: 'mysql',
          host: typeOrmConfigService.host,
          port: typeOrmConfigService.port,
          username: typeOrmConfigService.username,
          password: typeOrmConfigService.password,
          database: typeOrmConfigService.database,
          synchronize: true,
          logging: true,
          entities: [Tenant],
        };
      },
      inject: [TypeOrmConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class MysqlProviderModule {}
