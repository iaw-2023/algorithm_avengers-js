import { defineStore } from 'pinia'

export const useCartStore = defineStore("CartStore", {
	state: () => {
    	return{
			cartItems: []
		}
  	},

	getters: {
		getCartItems(){
			return this.cartItems;
		},

		cartItemsSize(){
			return this.cartItems.length;
		}
	},
	
	actions: {
		addToCart(item){
			this.cartItems.push(item);
		},

		incrementQty(item){
			let index = this.cartItems.findIndex(product => product.id === item.id);
			if(index !== -1)	
				this.cartItems[index].quantity += 1;
		},

		decrementQty(item){
			let index = this.cartItems.findIndex(product => product.id === item.id);
			if(index !== -1)	
				this.cartItems[index].quantity -= 1;
		},

		removeFromCart(item){
			this.cartItems = this.cartItems.filter(product => product.id !== item.id);
		}
	}
})