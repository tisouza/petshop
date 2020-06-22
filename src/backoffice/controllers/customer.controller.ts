import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus, Catch } from "@nestjs/common";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer/create-customer.contract";
import { CreateCustomerDto } from "../dtos/create-customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user.model";
import { CustomerService } from "../services/customer.service";
import { Customer } from "../models/customer.model";
import { Address } from "../models/address.model";
import { CreateAddressContract } from "../contracts/customer/create-address.contract";
import { CreatePetContract } from "../contracts/customer/create-pet.contract";
import { Pet } from "../models/pet.model";


//localhost:3333/customers
@Controller('v1/customers')
export class CustomerController{

    constructor(private readonly accountService:AccountService,
        private readonly customerService:CustomerService) {

    }

    @Get()
    get(){
        return new Result(null, true, [], null);
    }

    @Get(':document')
    getById(@Param('document') document:string){
        return new Result(null, true, {}, null);
    }


    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model:CreateCustomerDto){        
        try{
            const user = await this.accountService.create(
                new User(model.document, model.password, true));
            
            const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user);
            const res = await this.customerService.create(customer)    ;
            return new Result("Cliente criado com sucesso!", true, res, null);
        }
        catch(error){
            //rollback
            throw new HttpException(new Result("Erro ao criar cliente", false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
    @Post(":document/addresses/billing")
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model:Address){
        try{
             await this.customerService.addBillingAddress(document,model);
             return new Result("Endereço de entrega criado com sucesso.", true,model,null);

        }
        catch(error){
            throw new HttpException(new Result("Não foi possível adicionar o endereço.", false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(":document/addresses/shipping")
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model:Address){
        try{
             await this.customerService.addShippingAddress(document,model);
             return new Result("Endereço de entrega criado com sucesso.", true,model,null);
        }
        catch(error){
            throw new HttpException(new Result("Não foi possível adicionar o endereço de entrega.", false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document')
    put(@Param('document') document, @Body() body){
        return new Result("Cliente alterado com sucesso!", true, body, null);
    }

    @Delete(':document')
    delete(@Param('document') document){
        return new Result("Cliente removido com sucesso!", true, document, null);
    }

    @Post(":document/pets")
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async createPet(@Param('document') document, @Body() model:Pet){
        try{
             await this.customerService.createPet(document,model);
             return new Result("Pet criado com sucesso.", true,model,null);
        }
        catch(error){
            throw new HttpException(new Result("Não foi possível adicionar seu peta.", false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
    
}

