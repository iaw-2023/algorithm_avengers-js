<template>
  <div class="container-fluid my-3 my-md-4">
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

  </div>
</template>
  
<script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  import { loadMercadoPago } from '@mercadopago/sdk-js';
  import { apiClient, apiMP } from '../plugins/axios';
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
  
  const brickContainer = ref(null);
  let bricksController = null;
  
  let randomString = 'random_string';

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

  function generateRandomString(length){
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
  
    await apiClient.post('/compras', {
      email_cliente: emailUser.value,
      detalle: detalle
    });

    cartStore.vaciarCart();
  }
  
  onMounted(async () => {
    try {
      randomString = generateRandomString();
      await loadMercadoPago();
      const mp = new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
        locale: 'es-AR'
      });

      const bricksBuilder = mp.bricks();
    
      bricksController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', {
        initialization: {
          amount: cartStore.getTotal,
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
              const response = await apiClient.post('/procesar-pago', cardData);

              if(response.data.status === "approved" || response.data.status === "authorized"){
                await comprar();
                showSuccessModal.value = true;
                return Promise.resolve();
              }else{
                console.error(`Error al procesar el pago: ${response.message}`);
                showErrorModal.value = true;
                return Promise.reject();  
              }
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