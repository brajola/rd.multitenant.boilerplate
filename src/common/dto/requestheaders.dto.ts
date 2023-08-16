import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RequestHeadersDto {
    @IsNotEmpty()
    @IsString()
    'api-key'?: string;

    @IsNotEmpty()
    @IsString()
    'X-Tenant-Id'?: string;

    @IsNotEmpty()
    @IsString()
    'X-Channel-Id'?: string;

    @IsOptional()
    @IsString()
    'X-Version'?: string;

    @IsOptional()
    @IsString()
    'Authorization'?: string;
}
