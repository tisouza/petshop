import {Model} from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { Address } from '../models/address.model';
import { AddressType } from '../enums/address-type.enum';

@Injectable()
export class AddressService{
    
    constructor(@InjectModel('Customer') private readonly model:Model<Customer>) {    

    }
    

    async create(document:string, data:Address, addressType:AddressType):Promise<Customer>{
        const options = {upsert:true};
        if(addressType == AddressType.Billing){
            return await this.model.findOneAndUpdate({document},{
                $set:{
                    billingAddress:data
                }
            }, options);
        }
        else if(addressType == AddressType.Shipping){
            return await this.model.findOneAndUpdate({document},{
                $set:{
                    shippingAddress:data
                }
            }, options);
        }
        
    }

    

}