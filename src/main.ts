import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { NestEnvironment } from '@nestjs/common/enums/nest-environment.enum';

//https://github.com/adrien2p/nestjs-sequelize-jwt/blob/master/src/server.ts
dotenv.config();

async function bootstrap() {
	//TODO do we need custom logger? https://github.com/nestjs/nest/issues/247#issuecomment-366097150
	Logger.setMode((process.env.NODE_ENV === "prod") ? NestEnvironment.TEST : NestEnvironment.RUN);
	const logger = new Logger('HttpsServer');

	const app = await NestFactory.create(ApplicationModule);

	//https://docs.nestjs.com/faq/global-prefix
	app.setGlobalPrefix(process.env.APP_URL_PREFIX);

	await app.listen(process.env.APP_PORT || '3000');

	logger.log(`Nest Server ready and running on ${process.env.APP_HOST}:${process.env.APP_PORT || '3000'}/${process.env.APP_URL_PREFIX}`);
}
bootstrap();
