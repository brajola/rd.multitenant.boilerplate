import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "@modules/users/entity/users.entity";
import { UsersController } from "@modules/users/controllers/users.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
  controllers:[UsersController],
  exports: [UsersService],
})
export class UsersModule {}
