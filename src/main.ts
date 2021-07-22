import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import session from 'express-session';
import SessionFileStore from 'session-file-store';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const FileStore = SessionFileStore(session);
  const { APP_PORT, APP_SECRET } = process.env;

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  app.use(
    session({
      store: new FileStore({
        path: 'sessions',
        ttl: 1800,
      }),
      secret: APP_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(csurf({ cookie: { httpOnly: true } }));

  await app.listen(APP_PORT);
}
bootstrap();
