import { Contract } from '../contract';
import { Flunt } from 'src/utils/flunt';
import { Injectable } from '@nestjs/common';
import { Pet } from 'src/modules/backoffice/models/pet.model';
  
@Injectable()
export class CreatePetContract implements Contract{
    errors:any[];
    validate(model:Pet):boolean{
        const flunt = new Flunt();
        flunt.hasMinLen(model.name, 2, "Nome inválido");        
        flunt.hasMinLen(model.gender, 3, "Gênero inválido");
        flunt.hasMinLen(model.brand, 3, "Raça inválida");        
        flunt.hasMinLen(model.kind, 3, "Tipo inválido");                

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}