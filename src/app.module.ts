import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CorsMiddleware } from '@nest-middlewares/cors';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot() //for config, see .env
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
        // IMPORTANT! Call Middleware.configure BEFORE using it for routes
        // ref: https://github.com/wbhob/nest-middlewares
        HelmetMiddleware.configure({
          hsts:true
        });
        CorsMiddleware.configure({});

        //Note: These middlewares will only apply to the controllers listed below
        consumer.apply([HelmetMiddleware,CorsMiddleware]).forRoutes(
            AppController
        );
    }
}
