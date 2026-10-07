import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint}    from "../../shared/infrastructure/base-endpoint.js";

const categoriesEndpointPath= import.meta.env.VITE_CATEGORIES_ENDPOINT_PATH;
const tutorialsEndpointPath = import.meta.env.VITE_TUTORIALS_ENDPOINT_PATH;

export class PublishingApi extends BaseApi {
    #categoriesEndpoint;
    #tutorialsEndpoint;

    constructor(){
        super();
        this.#categoriesEndpoint = new BaseEndpoint(this, categoriesEndpointPath);
        this.#tutorialsEndpoint = new BaseEndpoint(this, tutorialsEndpointPath);
    }
    getCategories(){
        return this.#categoriesEndpoint.getAll();
    }
    getTutorials(){
        return this.#tutorialsEndpoint.getAll();
    }
    getCategoriesById(id){
        return this.#categoriesEndpoint.getById(id);
    }
    getTutorialsById(id){
        return this.#tutorialsEndpoint.getById(id);
    }
    createCategory(resource){
        return this.#categoriesEndpoint.create(resource);
    }
    createTutorial(resource){
        return this.#tutorialsEndpoint.create(resource);
    }
    updateCategory(resource){
        return this.#categoriesEndpoint.update(resource.id, resource);
    }
    updateTutorial(resource){
        return this.#tutorialsEndpoint.update(resource.id, resource);
    }
    deleteCategory(id){
        return this.#categoriesEndpoint.delete(id);
    }
    deleteTutorial(id){
        return this.#tutorialsEndpoint.delete(id);
    }
}

