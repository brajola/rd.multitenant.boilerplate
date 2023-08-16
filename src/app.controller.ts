import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@Controller()
@ApiTags('health')
export class AppController { }
