import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TenantModule } from '@modules/tenant/tenant.module';
import { Tenant } from '@modules/tenant/tenant.entity';
import { HealthModule } from '@modules/health/health.module';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { MysqlProviderModule } from '@providers/mysql/mysql.module';
import { CustomersModule } from '@modules/customers/customers.module';

@Module({
  imports: [
    MysqlProviderModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Tenant],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Tenant]),
    TenantModule,
    SwaggerModule,
    HealthModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude(
        { path: 'health', method: RequestMethod.GET },
        { path: 'swagger', method: RequestMethod.ALL },
        { path: 'logs', method: RequestMethod.GET },
        { path: 'auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }

  constructor(private readonly connection: Connection) {}
}
