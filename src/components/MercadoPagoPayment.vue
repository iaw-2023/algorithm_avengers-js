<!-- src/components/MercadoPagoPayment.vue -->
<template>
    <div>
      <div id="cardPaymentBrick_container"></div>
      <!-- or for checkout brick -->
      <!-- <div id="checkoutBrick_container"></div> -->
    </div>
  </template>
  
  <script>
  import { loadMercadoPago } from '@mercadopago/sdk-js';
  import axios from 'axios';
  
  export default {
    props: {
      amount: Number,
      description: String,
    },
    async mounted() {
      // Initialize Mercado Pago
      await loadMercadoPago();
      const mp = new window.MercadoPago(process.env.VUE_APP_MERCADOPAGO_PUBLIC_KEY, {
        locale: 'es-AR'
      });
  
      // For Card Payment Brick
      const bricksBuilder = mp.bricks();
      
      try {
        // Get preference ID from backend using Axios
        const response = await this.createPreference();
        const preferenceId = response.data.id;
  
        // Render Card Payment Brick
        bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', {
          initialization: {
            amount: this.amount,
            preferenceId: preferenceId,
          },
          callbacks: {
            onReady: () => {
              // Handle ready event
            },
            onSubmit: async ({ selectedPaymentMethod, formData }) => {
              // Handle form submission with Axios
              try {
                await axios.post('/process-payment', formData);
                return Promise.resolve();
              } catch (error) {
                console.error('Payment processing error:', error);
                return Promise.reject();
              }
            },
            onError: (error) => {
              // Handle error
              console.error(error);
            },
          }
        });
  
      } catch (error) {
        console.error('Error inicializando Mercado Pago:', error);
      }
    },
    methods: {
      async createPreference() {
        try {
          const response = await axios.post('/api/create-preference', {
            title: this.description,
            quantity: 1,
            price: this.amount,
          });
          return response;
        } catch (error) {
          console.error('Error creating preference:', error);
          throw error;
        }
      }
    }
  };
  </script>