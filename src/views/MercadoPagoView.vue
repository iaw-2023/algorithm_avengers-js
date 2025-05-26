<!-- src/components/CardPaymentBrick.vue -->
<template>
    <p>
      Items: {{ items }}
    </p>
    <div id="cardPaymentBrick_container" ref="brickContainer"></div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import { loadMercadoPago } from '@mercadopago/sdk-js';
  import apiClient from '../plugins/axios';
  import { useCartStore } from '../stores/CartStore';
  import { useAuthStore } from '../stores/AuthStore';

  const cartStore = useCartStore();
  const authStore = useAuthStore();

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
    let items = [];
    cartStore.getCartItems.forEach(item => {
      items.push({
        id: item.id,
        title: item.nombre,
        quantity: item.quantity,
        unit_price: item.precio,
      });
    });

    let payer = {
      email: authStore.getUserEmail,
    }
    
    console.log(`Items: ${JSON.stringify(items)}`);

    try {
      const response = await apiClient.post('/iniciar-pago', {items, payer});
      console.log(`Respuesta createPreference: ${JSON.stringify(response)}`);
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
          amount: cartStore.getTotal,
          preferenceId: preferenceId,
        },
        callbacks: {
          onReady: () => {
            console.log('Brick ready');
          },
          onSubmit: async ({ formData }) => {
            try {
              console.log("onSubmit :: llamando a /process-payment");
              await apiClient.post('/process-payment', formData);
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