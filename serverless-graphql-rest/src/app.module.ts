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
      useFactory: () => ({
        //useFactory: (authService: AuthService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
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
      }),
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
