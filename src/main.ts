import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupSwagger } from './core/swagger/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    preflightContinue: true,
  });

  setupSwagger(app);

  await app.listen(4000);
}
bootstrap();
