// registers aliases, DON'T REMOVE THIS LINE!
import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import AppModule from './routes/app/app.module';

import AllExceptionsFilter from './filters/all-exceptions.filter';

function buildHttpsOptions() {
  const ssl: Boolean = process.env.SSL === 'true';
  let httpsOptions;
  try {
    if (ssl) {
      const keyPath = process.env.SSL_KEY_PATH || '';
      const certPath = process.env.SSL_CERT_PATH || '';
      httpsOptions = {
        key: fs.readFileSync(path.join(__dirname, keyPath)),
        cert: fs.readFileSync(path.join(__dirname, certPath)),
      };
    }
  } catch {
    return undefined;
  }
  return httpsOptions;
}

async function bootstrap() {
  const httpsOptions = undefined; // buildHttpsOptions();
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.SERVER_PORT || 3000;

  const options = new DocumentBuilder()
    .setTitle('Api v1')
    .setDescription('Soccer Manager Online Game API')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(port, async () => {
    // const address = `http${httpsOptions ? 's' : ''}://${process.env.SERVER_HOST}/api`;
    console.log(`The server is listening at: \n${process.env.SERVER_HOST}`);
  });
}

bootstrap();
