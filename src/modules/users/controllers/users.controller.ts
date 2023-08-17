import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Users } from '@modules/users/entity/users.entity';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@modules/auth/decorators/public.decorator';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get Users' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiHeader({ name: 'x-tenant-id', description: 'Tenant Id' })
  @Get('/')
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get User By Email' })
  @Get('/:email')
  async findOne(@Param('email') email: string): Promise<Users> {
    return this.usersService.findByEmail(email);
  }

  @Public()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('/')
  async create(@Body() userData: Users): Promise<Record<any, any>> {
    return await this.usersService.create(userData);
  }
}
