import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module'; // 파일 경로는 정확히 확인
import { WritesModule } from './write/write.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserEntity } from './user/user.entity';
import { WriteEntity } from './write/write.entity';
// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', '1234'),
        database: configService.get('DB_DATABASE', 'boardCRUD'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: configService.get('TYPEORM_SYNCHRONIZE', true),
        logging: configService.get('TYPEORM_LOGGING', true),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity, WriteEntity]),
    UsersModule,
    WritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
