import { defineStore } from 'pinia'

export const useCartStore = defineStore("CartStore", {
	state: () => {
    	return{
			cartItems: [],
			productos: [],
			productosAll: [],
			productosByCat: []
		}
  	},

	getters: {
		getCartItems(){
			return this.cartItems;
		},

		cartItemsSize(){
			return this.cartItems.length;
		},

		getProductos(){
			return this.productos;
		}
	},
	
	actions: {
		addToCart(item){
			this.cartItems.push(item);
			this.cartItems[this.cartItems.length-1].quantity = 1;
			this.cartItems[this.cartItems.length-1].talle_seleccionado = item.talles.split(',')[0];
		},

		incrementQty(item){
			let index = this.cartItems.findIndex(product => product.id === item.id);
			if(index !== -1)	
				this.cartItems[index].quantity += 1;
		},

		decrementQty(item){
			let index = this.cartItems.findIndex(product => product.id === item.id);
			if(index !== -1){
				if(this.cartItems[index].quantity > 1){
					this.cartItems[index].quantity -= 1;
				}
			}
		},

		selectTalle(item, talle){
			let index = this.cartItems.findIndex(product => product.id === item.id);
			if(index !== -1){
				this.cartItems[index].talle_seleccionado = talle;
			}
		},

		removeFromCart(item){
			this.cartItems = this.cartItems.filter(product => product.id !== item.id);
		},

		vaciarCart(){
			this.cartItems = [];
		}
	}
})