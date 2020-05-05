const Database = require('../models/index');

class PlansService {

    constructor(){
        this.Plan = Database["Plan"]
    }

    async store(plans){
        let errors = {};

        plans.import = plans.import != undefined ? true : false;

        const isValid = this.validate(plans, errors);

    
       if(isValid){
        try {
            await this.Plan.create(plans);
            return true;
        } catch (error) {
            errors.system_msg = "Não foi possível salvar o plano!";
            return errors;
        }
       }else{
           return errors;
       } 
       
    }

    async getAll(){
        try {
            return await this.Plan.findAll();
        } catch (error) {
            return undefined;
        }
    }

    async getById(id){
        try {
            return await this.Plan.findByPk(id);
        } catch (error) {
            return undefined;
        }
    }

    async deactivate(id){
        try {
            let plan = await this.getById(id);
            plan.deactivated = true;
            await plan.save();
            return true;
        } catch (error) {
            return false;
        }
        
    }
    async activate(id){
        try {
            let plan = await this.getById(id);
            plan.deactivated = false;
            await plan.save();
            return true;
        } catch (error) {
            return false;
        }
        
    }

    async update(id, data){

        let errors = {};

        const isValid = this.validate(data, errors);

        if(isValid){
            try {
                let plan = await this.getById(id);
                plan.title = data.title;
                plan.list = data.list;
                plan.client = data.client;
                plan.value = data.value;
                await plan.save();
                return true;
            } catch (error) {
                errors.system_msg = "Não foi possível editar o plano!";
                return errors;
            }
        }else {
            return errors;
        }
       
    }

    validate(plan, errors){

        let erroCount = 0;

        if(plan.title == undefined){
            errors.title_msg = "O título é inválido";
            erroCount++;
        }else{
            if(plan.title.length < 3){
                errors.title_msg = "O título é inválido!";
                erroCount++;
            }
        }

        if(plan.list == undefined) {
            errors.list_msg = "A quantidade de listas é inválida!";
            erroCount++;
        }else {
            if(plan.list < 1){
                errors.list_msg = "A quantidade de listas é inválida!";
                erroCount++;
            }
        }
        
        if(erroCount == 0){
            return true;
        }else{
            return false;
        }
    }
}

module.exports = new PlansService();