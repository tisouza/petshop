import { Controller } from "@nestjs/common";

@Controller()
export class CustomerController{
    get():string{
        return "Obter os c lientes";
    }

    post():string{
        return 'Criar cliente';
    }

    put():string{
        return "Atualizar cliente";
    }

    delete():string{
        return "Remover cliente";
    }
}