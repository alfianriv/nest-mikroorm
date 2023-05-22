import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path from 'path';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgresql',
        entities: [`${path.basename('../dist/src/modules/**/*.entity.js')}`],
        entitiesTs: [`${path.basename('./src/modules/**/*.entity.ts')}`],
        dbName: configService.get<string>('DB_NAME'),
        host: configService.get<string>('DB_HOST'),
        user: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        port: configService.get<number>('DB_PORT'),
        migrations: {
          tableName: 'mikroorm_migrations',
          path: './migrations',
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
