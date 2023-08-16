import { SystemMessages } from '@common/constants/system.messages';
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.get('x-tenant-id')) {
            next();
        } else {
            throw new HttpException({ message: SystemMessages.POEC0001 }, HttpStatus.FORBIDDEN);
        }
    }
}
