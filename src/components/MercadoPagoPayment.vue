<!-- src/components/CardPaymentBrick.vue -->
<template>
    <div id="cardPaymentBrick_container" ref="brickContainer"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { loadMercadoPago } from '@mercadopago/sdk-js';
  import axios from 'axios';
  
  const props = defineProps({
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });
  
  const brickContainer = ref(null);
  
  const createPreference = async () => {
    try {
      const response = await axios.post('/api/create-preference', {
        title: props.description,
        quantity: 1,
        price: props.amount,
      });
      return response.data.id;
    } catch (error) {
      console.error('Error creating preference:', error);
      throw error;
    }
  };
  
  onMounted(async () => {
    try {
      await loadMercadoPago();
      const mp = new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
        locale: 'es-AR'
      });
  
      const preferenceId = await createPreference();
      
      const bricksBuilder = mp.bricks();
      
      bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', {
        initialization: {
          amount: props.amount,
          preferenceId: preferenceId,
        },
        callbacks: {
          onReady: () => {
            console.log('Brick ready');
          },
          onSubmit: async ({ formData }) => {
            try {
              await axios.post('/api/process-payment', formData);
              return Promise.resolve();
            } catch (error) {
              console.error('Payment processing error:', error);
              return Promise.reject();
            }
          },
          onError: (error) => {
            console.error('Brick error:', error);
          },
        }
      });
    } catch (error) {
      console.error('MercadoPago initialization error:', error);
    }
  });
  </script>