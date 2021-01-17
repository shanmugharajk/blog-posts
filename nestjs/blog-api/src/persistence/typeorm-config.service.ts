import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private _configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this._configService.get('DB_HOST'),
      port: +this._configService.get<number>('DB_PORT'),
      username: this._configService.get('DB_USERNAME'),
      password: this._configService.get('DB_PASSWORD'),
      database: this._configService.get('DB'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: !!this._configService.get('DB_SYNCHRONIZE'),
      logging: !!this._configService.get('DB_LOGGING'),
      autoLoadEntities: !!this._configService.get('DB_AUTOLOADENTITIES'),
    };
  }
}
