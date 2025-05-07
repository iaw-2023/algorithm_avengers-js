import { defineStore } from 'pinia'
import apiClient from '../plugins/axios';

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
        async loadProductos(){
            try{
                let response = await apiClient.get('productos');
                this.productos = response.data.data;
                this.productosAll = response.data.data;

                let response_cat = await apiClient.get('categorias');
                let categorias = response_cat.data.data;

                categorias.forEach(async (cat) => {
                    let response_prod = await apiClient.get('categorias/' + cat.id + '/productos');
                    this.productosByCat[cat.id] = response_prod.data;
                })
            }catch (error){
                console.error(error);
            }
        },

        // loadProductos(){
        //     /* fetch("http://127.0.0.1:8000/rest/productos") */
        //     fetch("https://algorithm-avengers-laravel.vercel.app/rest/productos")
		// 		.then((response) => response.json())
		// 		.then((data) => {
        //             this.productos = data.data;
        //             this.productosAll = data.data;
        //         })
        //         .catch((error) => console.log(error));

        //     /* fetch("http://127.0.0.1:8000/rest/categorias") */
        //     fetch("https://algorithm-avengers-laravel.vercel.app/rest/categorias")
		// 		.then((response_cat) => response_cat.json())
		// 		.then((data_cat) => {
		// 			let categorias = data_cat.data;
        //             categorias.forEach(cat => {
        //                 /* fetch("http://127.0.0.1:8000/rest/categorias/" + cat.id + "/productos") */
        //                 fetch("https://algorithm-avengers-laravel.vercel.app/rest/categorias/" + cat.id + "/productos")
        //                     .then((response_prod) => response_prod.json())
        //                     .then((data_prod) => {
        //                         this.productosByCat[cat.id] = data_prod;
        //                     })
        //             });
		// 		})
		// 		.catch((error) => console.log(error));
        // },

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