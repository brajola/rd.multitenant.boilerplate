import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('typeorm.env');
  }

  get host(): string {
    return this.configService.get<string>('typeorm.host');
  }

  get port(): number {
    return parseInt(this.configService.get<string>('typeorm.port'));
  }

  get username(): string {
    return this.configService.get<string>('typeorm.username');
  }

  get password(): string {
    return this.configService.get<string>('typeorm.password');
  }

  get database(): string {
    return this.configService.get<string>('typeorm.database');
  }
}
