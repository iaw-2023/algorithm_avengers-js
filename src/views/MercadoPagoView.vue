<template>
  <h1 class="mb-4">Pagar con Mercado Pago</h1>
  <div id="cardPaymentBrick_container" ref="brickContainer"></div>

  <!-- Success modal -->
  <div class="modal fade" ref="successModalRef" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">¡Éxito!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="goToHome"></button>
        </div>
        <div class="modal-body">
          ¡Felicidades! El pago se ha concretado con éxito. La compra estará llegando a tu casa en 5 días hábiles
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="goToHome">Volver a inicio</button>
          <button type="button" class="btn btn-primary" @click="goToProducts">Continuar comprando</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Error modal -->
  <div class="modal fade" ref="errorModalRef" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Error</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="errorOkay"></button>
        </div>
        <div class="modal-body">
          Ha ocurrido un error al procesar el pago. Por favor, inténtelo nuevamente más tarde
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="errorOkay">Entendido</button>
        </div>
      </div>
    </div>
  </div>


</template>
  
<script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  import { loadMercadoPago } from '@mercadopago/sdk-js';
  import apiClient from '../plugins/axios';
  import { useCartStore } from '../stores/CartStore';
  import { useAuthStore } from '../stores/AuthStore';
  import { Modal } from 'bootstrap';
  import { useRouter } from 'vue-router';

  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const router = useRouter();

  const emailUser = ref('');
  emailUser.value = authStore.getUserEmail;

  const showSuccessModal = ref(false);
  const successModalRef = ref(null);
  let successModal = null;

  const showErrorModal = ref(null);
  const errorModalRef = ref(null);
  let errorModal = false;

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
  let bricksController = null;
  
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

  function goToProducts(){
    showSuccessModal.value = false;
    brickContainer.value = null;
    router.replace({name: 'productos'});
  }

  function goToHome(){
    showSuccessModal.value = false;
    brickContainer.value = null;
    router.replace({name: 'home'});
  }

  function errorOkay(){
    showErrorModal.value = false;
  }

  async function comprar(){
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

    /* const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
          email_cliente: emailUser.value,
          detalle: detalle
      }
    }; */
  
    await apiClient.post('/compras', {
      email_cliente: emailUser.value,
      detalle: detalle
    });

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
    
      bricksController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', {
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
          onSubmit: async ( cardData ) => {
            try {
              await comprar();
              showSuccessModal.value = true;
              return Promise.resolve();
            } catch (error) {
              showErrorModal.value = true;
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

    successModal = new Modal(successModalRef.value);
    successModalRef.value.addEventListener('hidden.bs.modal', () => {
      showSuccessModal.value = false;
    })

    errorModal = new Modal(errorModalRef.value);
    errorModalRef.value.addEventListener('hidden.bs.modal', () => {
      showErrorModal.value = false;
    })

  });

  onUnmounted(() => {
    bricksController.unmount();
    console.log("MercadoPagoView desmontada");
  });

  watch(showSuccessModal, (newValue, oldValue) => {
    if(newValue){
      successModal.show();
    }else{
      successModal.hide();
    }
  });

  watch(showErrorModal, (newValue, oldValue) => {
    if(newValue){
      errorModal.show();
    }else{
      errorModal.hide();
    }
  })
</script>