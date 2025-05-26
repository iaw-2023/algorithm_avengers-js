import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'; // If using uuid

export const useCartStore = defineStore("CartStore", {
	state: () => {
    	return{
			cartItems: [],
		}
  	},

	getters: {
		getCartItems(){
			return this.cartItems;
		},

		cartItemsSize(){
			return this.cartItems.length;
		},

		getTotal(){
			return this.cartItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
		},
	},
	
	actions: {
		addToCart(item){
			const cartItem = {
				...item,
				cartItemId: uuidv4(),
			}
			this.cartItems.push(cartItem);
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

		removeFromCart(cartItemId){
			this.cartItems = this.cartItems.filter(product => product.cartItemId !== cartItemId);
		},

		vaciarCart(){
			this.cartItems = [];
		}
	}
})