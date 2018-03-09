import { Module, MiddlewaresConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CorsMiddleware } from '@nest-middlewares/cors';

import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot() //for config, see .env
  ],
  controllers: [AppController],
  components: [],
})
export class ApplicationModule {
  configure(consumer: MiddlewaresConsumer) {
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
