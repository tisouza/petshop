import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer/create-customer.contract";
import { CreateCustomerDto } from "../dtos/customer/create-customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user.model";
import { CustomerService } from "../services/customer.service";
import { Customer } from "../models/customer.model";
import { QueryDto } from "../dtos/query.dto";
import { UpdateCustomerContract } from "../contracts/customer/update-customer.contract";
import { UpdateCustomerDto } from "../dtos/customer/update-customer.dto";
import { CreateCreditCartContract } from "../contracts/customer/create-credit-card.contract";
import { CreditCard } from "../models/creditcard.model";
import { QueryContract } from "../contracts/query.contract";


//localhost:3333/customers
@Controller('v1/customers')
export class CustomerController{

    constructor(private readonly accountService:AccountService,
        private readonly customerService:CustomerService) {

    }

    @Get()
    async getAll(){
        const customers = await this.customerService.findAll();
        return new Result(null, true, customers, null);
    }

    @Get(':document')
    async get(@Param('document')document){
        const customer = await this.customerService.find(document);
        return new Result(null, true, customer, null);
    }

    @Get(':document')
    getById(){
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

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async update(@Param('document') document:string, @Body() model:UpdateCustomerDto){
        try{
            const customer = await this.customerService.update(document, model);
            return new Result(null, true, customer, null);
        }
        catch(error){
            throw new HttpException(new Result("Não foi possível atualizar o cliente", false, null, error), HttpStatus.BAD_REQUEST);
            
        }
    }

    @Delete(':document')
    delete(@Param('document') document){
        return new Result("Cliente removido com sucesso!", true, document, null);
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model:QueryDto){        
        const customers = await this.customerService.query(model);
        return new Result(null, true, customers, null);
    }

    @Post(':document/credit-cards')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCartContract()))
    async createCreditCard(@Param('document')document:string, @Body() model:CreditCard){        
        try{
           await this.customerService.saveOrUpdateCreditCard(document, model);
            return new Result("Cliente criado com sucesso!", true, model, null);
        }
        catch(error){           
            throw new HttpException(new Result("Erro ao criar cartão", false, null, error), HttpStatus.BAD_REQUEST);
        }
    }  
    
}

