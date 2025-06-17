import { defineStore } from 'pinia'
import { apiClient } from '../plugins/axios';

export const useCategoryStore = defineStore("CategoryStore", {
	state: () => {
    	return{
			categorias: []
		}
  	},

	getters: {
		getCategorias(){
			return this.categorias;
		}
	},
	
	actions: {
		async loadCategorias(){
			try{
				let response = await apiClient.get('/categorias');
				let lista = response.data.data;
				this.categorias = lista.slice().sort((a,b) => a.nombre.localeCompare(b.nombre));
			}catch(error){
				console.error(error);
			}
		}
		/* loadCategorias(){
			/* fetch("http://127.0.0.1:8000/rest/categorias") */
			/* fetch("https://algorithm-avengers-laravel.vercel.app/rest/categorias")
				.then((response) => response.json())
				.then((data) => {
					let lista = data.data;
					this.categorias = lista.slice().sort((a,b) => a.nombre.localeCompare(b.nombre));
				})
				.catch((error) => console.log(error));
		} */
	}
})