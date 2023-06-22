import { defineStore } from 'pinia'

export const useCartStore = defineStore("CartStore", {
  state: () => ({ cart: [], cartTotal: 0 }),

  // actions

  // getters and setters
})