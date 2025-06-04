<!-- src/components/CardPaymentBrick.vue -->
<template>
    <h1 class="mb-4">Pagar con Mercado Pago</h1>
    <div id="cardPaymentBrick_container" ref="brickContainer"></div>


    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" @v-bind:hidden="!showSuccessModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">¡Éxito!</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ¡Felicidades! El pago se ha concretado con éxito. La compra estará llegando a tu casa en 5 días hábiles
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">Continuar comprando</button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import { loadMercadoPago } from '@mercadopago/sdk-js';
  import apiClient from '../plugins/axios';
  import { useCartStore } from '../stores/CartStore';
  import { useAuthStore } from '../stores/AuthStore';

  const cartStore = useCartStore();
  const authStore = useAuthStore();

  const emailUser = ref('');
  emailUser.value = authStore.getUserEmail;

  const showSuccessModal = ref(false);

/*   const props = defineProps({
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }); */
  
  const brickContainer = ref(null);
  
/*   const createPreference = async () => {
    let items = [];
    cartStore.getCartItems.forEach(item => {
      items.push({
        id: item.id,
        title: item.nombre,
        quantity: item.quantity,
        unit_price: parseFloat(item.precio),
      });
    });

    let payer = {
      email: emailUser.value,
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
  }; */

  async function comprar(){
    console.log(`Email cliente: ${emailUser.value}`);
    let detalle = [];
    cartStore.getCartItems.forEach(item => {
      detalle.push(
        {
        "producto_id": item.id,
        "talle": item.talle_seleccionado, 
        "cantidad": item.quantity
        }
      )
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          email_cliente: emailUser.value,
          detalle: detalle
      })
    };

    console.log(`Compra con opciones ${JSON.stringify(requestOptions)}`);

    await apiClient.post('/compras', requestOptions);

    cartStore.vaciarCart();
  }
  
  onMounted(async () => {
    try {
      await loadMercadoPago();
      const mp = new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
        locale: 'es-AR'
      });

      //const preferenceId = await createPreference();  
      const bricksBuilder = mp.bricks();

      //console.log(`preferenceId = ${preferenceId}`);
      //console.log(`precio total = ${cartStore.getTotal}`);
    
      await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', {
        initialization: {
          amount: cartStore.getTotal,
          //preferenceId: preferenceId,
          payer: {
            email: emailUser.value,
          },
        },
        callbacks: {
          onReady: () => {
            console.log('Brick ready');
          },
          onSubmit: async ({ formData }) => {
            try {
              console.log(`formData: ${JSON.stringify(formData)}`);
              await comprar();
              showSuccessModal.value = true;
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