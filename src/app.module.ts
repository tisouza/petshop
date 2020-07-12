import { Module } from '@nestjs/common';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import {MongooseModule} from '@nestjs/mongoose';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [
    MongooseModule.forRoot('sssssss',{ useFindAndModify: false, useCreateIndex:true }),
    BackofficeModule,
    StoreModule],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
