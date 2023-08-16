export class ApiResponseDto {
    success: boolean;
    message?: string;
    total?: number;
    data?: Object;
    error?: string;
    page?: number;
    pages?: number;
    count?: number;
}
