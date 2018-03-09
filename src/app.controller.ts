import { Get, Controller } from '@nestjs/common';
import { Connection } from 'typeorm';



@Controller()
export class AppController {


	constructor(
		private readonly connection: Connection
	){}

	@Get()
	async root(): Promise<Object> {
		const rawData = await this.connection.query(`select version()`);
		rawData[0].hello = "world postgres";
    return rawData; 
  }
}
