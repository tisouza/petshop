import { Controller, Post, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { Result } from "../models/result.model";
import { Address } from "../models/address.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateAddressContract } from "../contracts/address/create-address.contract";
import { AddressType } from "../enums/address-type.enum";
import { AddressService } from "../services/address.service";


//localhost:3333/customers
@Controller('v1/addresses')
export class AddressController{

    constructor(private readonly addressService:AddressService
        ) {

    }
   
    @Post(":document/billing")
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model:Address){
        try{
             await this.addressService.create(document,model, AddressType.Billing);
             return new Result("Endereço de entrega criado com sucesso.", true,model,null);

        }
        catch(error){
            throw new HttpException(new Result("Não foi possível adicionar o endereço.", false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(":document/shipping")
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model:Address){
        try{
             await this.addressService.create(document,model, AddressType.Shipping);
             return new Result("Endereço de entrega criado com sucesso.", true,model,null);
        }
        catch(error){
            throw new HttpException(new Result("Não foi possível adicionar o endereço de entrega.", false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

   
    
}

