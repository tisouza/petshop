import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://petshop:CrazyFarc1@cluster0-wpfys.azure.mongodb.net/petshop'),
    BackofficeModule],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
