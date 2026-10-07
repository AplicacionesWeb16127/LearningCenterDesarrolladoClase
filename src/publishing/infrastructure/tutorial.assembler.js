import {Tutorial} from '../domain/model/tutorial.entity.js';

export class TutorialAssembler{

    static toEntityFromResource(resource){
        return new Tutorial({...resource});
    }

    static toEntitiesFromResponse(response){
        if(response.status !== 200)
        {
            console.log('Error en TutorialAssembler');
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['tutorials'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }

}