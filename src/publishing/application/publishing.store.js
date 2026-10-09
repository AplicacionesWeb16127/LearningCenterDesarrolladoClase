import {computed, ref} from "vue";
import {PublishingApi} from "../infrastructure/publishing-api.js";
import {CategoryAssembler} from "../infrastructure/category.assembler.js";
import {TutorialAssembler} from "../infrastructure/tutorial.assembler.js";
import {Category} from "../domain/model/category.entity.js";
import {Tutorial} from "../domain/model/tutorial.entity.js";
import {defineStore} from "pinia";

const publishingApi = new PublishingApi();

const usePublishingStore = defineStore('publishing',
    ()=>{
        const categories = ref([]);

        const tutorials = ref([]);

        const errors = ref([]);

        const categoriesLoaded = ref(false);
        const tutorialsLoaded = ref(false);

        function fetchCategories(){
            publishingApi.getCategories().then(response => {
                categories.value = CategoryAssembler.toEntitiesFromResponse(response);
                categoriesLoaded.value = true;
                console.log(categories.value);
                console.log(categoriesLoaded.value);
            }).catch(error => {
                errors.value.push(error);
            });
        }
        function fetchTutorials(){
            publishingApi.getTutorials().then(response => {
                tutorials.value = TutorialAssembler.toEntitiesFromResponse(response);
                tutorialsLoaded.value = true;
                console.log(tutorials.value);
                console.log(tutorialsLoaded.value);
            }).catch(error => {
                errors.value.push(error);
            })
        }
        function addCategory(category){
            publishingApi.createCategory(category).then(response => {
                const resource = response.data;
                const newCategory = CategoryAssembler.toEntityFromResource(resource);
                categories.value.push(newCategory);
            }).catch(error => {
                errors.value.push(error);
            });
        }
        function getByCategoryById(id){
            let idNum = parseInt(id);
            return categories.value.find(category => category["id"] === idNum);
        }
        function updateCategory(category){
            publishingApi.updateCategory(category).then(response => {
                const resource = response.data;
                const updatedCategory = CategoryAssembler.toEntityFromResource(resource);
                const index = categories.value.findIndex(cat => cat["id"] === updatedCategory.id);
                if (index !== -1) {
                    categories.value[index] = updatedCategory;
                }
            }).catch(error => {
                errors.value.push(error);
            });
        }
        function deleteCategory(category){
            publishingApi.deleteCategory(category.id).then(response => {
                const index = categories.value.findIndex(cat => cat["id"] === category.id);
                if (index !== -1) {
                    categories.value.splice(index, 1);
                }
            }).catch(error => {
                errors.value.push(error);
            }); 
        }
        return {categories,
            tutorials,
            errors,
            categoriesLoaded,
            tutorialsLoaded,
            fetchCategories,
            fetchTutorials,
            addCategory,
            getByCategoryById,
            updateCategory,
            deleteCategory};
    }
)
export default usePublishingStore;