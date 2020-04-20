import { Module } from '@nestjs/common';
import { GraphQLModule as GqlModule } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    GqlModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          debug: configService.get('graphql.debug'),
          playground: configService.get('graphql.playground'),
          autoSchemaFile: 'schema.gql',
          buildSchemaOptions: {},
          context: ({ req }) => ({ req }),
          installSubscriptionHandlers: true,
        };
      },
    }),
  ],
  exports: [GqlModule],
})
export class GraphqlModule {}
