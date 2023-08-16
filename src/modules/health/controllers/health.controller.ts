import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthResponse } from '../dto/health.response.dto';

@Controller()
@ApiTags('Health')
export class HealthController {

    @ApiOperation({ summary: 'Get health status' })
    @ApiResponse({ status: 200, description: 'Health status' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get('health')
    async health(): Promise<HealthResponse> {
        return { message: 'OK' };
    }
}
