import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

if (import.meta.env.PROD) {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(4321);
  }

  bootstrap();
}

export const viteNodeApp = NestFactory.create(AppModule);
