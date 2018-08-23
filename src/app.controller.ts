import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Connection } from 'typeorm';





@Controller()
export class AppController {


	constructor(
		private readonly appService: AppService,
		private readonly connection: Connection
	){}

	@Get()
	async root(): Promise<Object> {
		const rawData = await this.connection.query(`select version()`);
		rawData[0].hello = this.appService.root() + " postgres";
    return rawData; 
  }
}
