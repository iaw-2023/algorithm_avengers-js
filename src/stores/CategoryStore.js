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
			fetch("https://algorithm-avengers-laravel.vercel.app/rest/categorias")
				.then((response) => response.json())
				.then((data) => {
					let lista = data.data;
					this.categorias = lista.slice().sort((a,b) => a.nombre.localeCompare(b.nombre));
				})
				.catch((error) => console.log(error));
		}
	}
})