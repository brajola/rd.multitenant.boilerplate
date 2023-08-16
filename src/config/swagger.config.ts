import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

const APP_VERSION = process.env.npm_package_version;

export const swaggerConfig = async function conf(app: INestApplication, modules: any[]): Promise<void> {
    const config = new DocumentBuilder()
        .setTitle(process.env.SWAGGER_TITLE)
        .setDescription(process.env.SWAGGER_DESCRIPTION)
        .setVersion(APP_VERSION)
        .setContact('RD Sistemas', 'http://www.rdsistemas.com.br', 'contato@rdsistemas.com.br')
        .build();

    const options: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
        include: modules,
    };

    const document = SwaggerModule.createDocument(app, config, options);

    SwaggerModule.setup(process.env.SWAGGER_SERVER, app, document);
};
