import { Injectable } from '@nestjs/common';

import { Users } from '../entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {}

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async findByEmail(email: string): Promise<Users> {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async create(userData: Users): Promise<Record<any, any>> {
    const salt: string = await bcrypt.genSalt();
    const password: string = await bcrypt.hash(userData.password, salt);

    userData.salt = salt;
    userData.password = password;

    return await this.usersRepository.save(userData);
  }
}
