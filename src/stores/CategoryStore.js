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
				.then((data) => (this.categorias = data.data));
		},

		addCategoria(categoria){
			this.categorias[categoria.id] = categoria.nombre;
		}
	}
})