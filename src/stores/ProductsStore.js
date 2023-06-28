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
            fetch("https://algorithm-avengers-laravel.vercel.app/rest/productos")
				.then((response) => response.json())
				.then((data) => {
                    this.productos = data.data;
                    this.productosAll = data.data;
                })
                .catch((error) => console.log(error));

            fetch("https://algorithm-avengers-laravel.vercel.app/rest/categorias")
				.then((response_cat) => response_cat.json())
				.then((data_cat) => {
					let categorias = data_cat.data;
                    categorias.forEach(cat => {
                        fetch("https://algorithm-avengers-laravel.vercel.app/rest/categorias/" + cat.id + "/productos")
                            .then((response_prod) => response_prod.json())
                            .then((data_prod) => {
                                this.productosByCat[cat.id] = data_prod;
                            })
                    });
				})
				.catch((error) => console.log(error));
        },

		setProductos(newProductos){
			this.productos = newProductos;
		},

		setProductosByCat(id){
            this.productos = this.productosByCat[id];
        },

        setProductosAll(){
			this.productos = this.productosAll;
		},

        getProductosAllSize(){
            return this.productosAll.length;
        },

        getProductosByCatSize(id){
            let toReturn = 0;
            if(typeof this.productosByCat[id] !== 'undefined'){
                toReturn = this.productosByCat[id].length
            }
            return toReturn;
        }
	}
})