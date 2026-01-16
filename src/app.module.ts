import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TodoModule } from './todo/todo.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HelloWorldModule } from './hello-world/hello-world.module';
// Eliminamos el import de 'apollo-server-core' para evitar conflictos

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, 
      introspection: true, 
      cors: false, 
      
      path: '/graphql',
    }),
    HelloWorldModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}