import {Model} from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';


@Injectable()
export class PetService{
    
    constructor(@InjectModel('Customer') private readonly model:Model<Customer>) {    

    }   
    
    async create(document:string, data:Pet):Promise<Pet>{
        const options = {upsert:true, new:true};
        return await this.model.findOneAndUpdate({document},{
            $push:{
                pets:data
            }
        }, options);
    }

    async update(document:string, id:string,  data:Pet):Promise<Pet>{
        return await this.model.findOneAndUpdate({document, 'pets._id': id},{
            $set:{
                'pets.$':data
            }

        });
    }

   

}