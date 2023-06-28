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

            fetch("http://127.0.0.1:8000/rest/categorias")
				.then((response_cat) => response_cat.json())
				.then((data_cat) => {
					let categorias = data_cat.data;
                    categorias.forEach(cat => {
                        fetch("http://127.0.0.1:8000/rest/categorias/" + cat.id + "/productos")
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
	}
})