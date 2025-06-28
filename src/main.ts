import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // CORS 설정 (프론트 주소 허용)
  app.enableCors({
    origin: [
      'http://localhost:3001', // 로컬 개발용
      'https://board-crud-fe.vercel.app', // Vercel 프론트엔드 도메인
      /\.vercel\.app$/, // 모든 Vercel 도메인 허용
    ],
    credentials: true,
  });

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Board API')
    .setDescription('게시판 API Swagger 문서')
    .setVersion('1.0')
    .addBearerAuth() // JWT 인증 헤더 추가
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
