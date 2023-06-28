import { defineStore } from 'pinia'

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
		loadCategorias(){
			fetch("http://127.0.0.1:8000/rest/categorias")
				.then((response) => response.json())
				.then((data) => {
					let lista = data.data;
					this.categorias = lista.slice().sort((a,b) => a.nombre.localeCompare(b.nombre));
				})
				.catch((error) => console.log(error));
		}
	}
})