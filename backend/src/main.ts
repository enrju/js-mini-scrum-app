import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {appConfig} from "../config/app-config";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(appConfig.listenPort, () => {
    console.log(`Server is working ...`);
  });
}
bootstrap();
