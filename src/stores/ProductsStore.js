import { defineStore } from 'pinia'

export const useProductsStore = defineStore("ProductsStore", {
	state: () => {
    	return{
			productos: [],
			productosAll: [],
			productosByCat: [],
		}
  	},

	getters: {
		getProductos(){
			return this.productos;
		}
	},
	
	actions: {
        loadProductos(){
            fetch("http://127.0.0.1:8000/rest/productos")
				.then((response) => response.json())
				.then((data) => {
                    this.productos = data.data;
                    this.productosAll = data.data;
                })
                .catch((error) => console.log(error));            
        },

		setProductos(newProductos){
			this.productos = newProductos;
		},

		setProductosByCat(id){
            this.productos = productosByCat[id];
        }
	}
})