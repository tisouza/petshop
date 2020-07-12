import{ Flunt} from 'src/utils/flunt';
import { Contract} from 'src/modules/backoffice/contracts/contract';
import { CreditCard } from '../../models/creditcard.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCreditCartContract implements Contract{
    errors:any[];

    validate(model:CreditCard):boolean{
        const flunt = new Flunt();
        flunt.hasMinLen(model.holder, 5, "Nome do cartão de crédito inválido.");
        flunt.isFixedLen(model.number, 16, "Número de cartão inválido.");
        flunt.isFixedLen(model.expiration, 4, "Data expiração inválida");

        this.errors = flunt.errors;
        return flunt.isValid();

    }
}