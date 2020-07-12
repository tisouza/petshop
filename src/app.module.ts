import { Module } from '@nestjs/common';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import {MongooseModule} from '@nestjs/mongoose';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://petshop:CrazyFarc1@cluster0-wpfys.azure.mongodb.net/petshop',{ useFindAndModify: false, useCreateIndex:true }),
    BackofficeModule,
    StoreModule],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
