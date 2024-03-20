import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BooksModule } from './books/books.module';
import { ToursModule } from './tours/tours.module';

//https://docs.nestjs.com/techniques/configuration#schema-validation
@Module({
  imports: [
    //configService for parsing env variables
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().port(),
      }),
    }),
    //Remove optional Websocket subscription, if not using this Apollo Server feature
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';

        return {
          //useFactory: (authService: AuthService) => ({
          //do not crreate schema file when running in Lambda, Lambda will not allow writing, unless it is tmp folder
          autoSchemaFile: isProduction
            ? undefined
            : join(process.cwd(), 'src/schema.gql'),
          typePaths: ['./**/*.gql'],
          /*subscriptions: {
            'graphql-ws': {
              onConnect: (context: any) => {
                try {
                  const incomingRequest = context.extra.request;
                  const user = authService.verifyWs(incomingRequest);
                  context.user = user;
                } catch (err) {
                  new Logger().error(err);
                  throw new UnauthorizedException();
                }
              },
            },
          },*/
        };
      },
      inject: [ConfigService],
      //imports: [AuthModule],
      //inject: [AuthService],
    }),

    //logging modules for better logging
    LoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';

        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                },
            level: isProduction ? 'info' : 'debug',
          },
        };
      },
      inject: [ConfigService],
    }),
    BooksModule,
    ToursModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
