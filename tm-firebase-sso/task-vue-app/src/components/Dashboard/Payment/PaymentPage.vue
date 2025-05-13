<template>
  <div class="container">
    <h4 class="payment-mode">Select payment method</h4>

    <b-container class="payment-container" fluid>
      <div
        v-for="(method, index) in paymentMethods"
        :key="index"
        :class="{ selected: selectedMethod === method.name }"
        @click="selectMethod(method.name)"
      >
        <img :src="method.icon" :alt="method.name" width="100" height="100" />
        <p>{{ method.label }}</p>
      </div>
    </b-container>

    <b-card v-if="selectedMethod">
         <b-card-body>
        <b-card-title class = "title">Personal Info</b-card-title>
        <b-card-text>
          <b-form>
            <b-form-group label="Name" class="label">
              <b-form-input v-model="name" placeholder="Enter name"/>
            </b-form-group>
          </b-form>

            <b-form-group label="Email" class="label">
                <b-form-input v-model="email" placeholder="Enter email"/>
                </b-form-group>

            <b-form-group label="Phone" class="label">
                <b-form-input v-model="phone" placeholder="Enter phone"/>
                </b-form-group>

        </b-card-text>
      </b-card-body>

      <b-card-body>
        <b-card-title class = "title">Payment Details - {{ selectedMethod }}</b-card-title>
        <b-card-text>
          <b-form v-if="selectedMethod === 'creditCard' || selectedMethod === 'debitCard'">
            <b-form-group label="Card Number" class="label">
              <b-form-input v-model="cardNumber" placeholder="Enter card number" />
            </b-form-group>

            <b-form-group label="Expiry Date" class="label">
              <b-form-input v-model="expiryDate" placeholder="MM/YY" />
            </b-form-group>

            <b-form-group label="CVV" class="label">
              <b-form-input v-model="cvv" placeholder="Enter CVV" />
            </b-form-group>

            <b-form-group label="Card Holder Name" class="label">
              <b-form-input v-model="cardHolderName" placeholder="Enter card holder name" />
            </b-form-group>

            <b-form-group label="Amount" class="label">
              <b-form-input v-model="amount" placeholder="Enter amount" />
            </b-form-group>
          </b-form>

          <div v-else-if="selectedMethod === 'gpay'">
            <p>Use Google Pay to scan and pay via your mobile device.</p>
          </div>

          <div v-else-if="selectedMethod === 'paypal'">
            <p>You will be redirected to PayPal to complete your transaction.</p>
          </div>

          <div v-else-if="selectedMethod === 'netbanking'">
            <b-form-group label="Select your Bank" class="label">
              <b-form-select :options="banks" v-model="selectedBank" />
            </b-form-group>
          </div>

          <b-button variant="primary" class="mt-3" @click="pay">Pay</b-button>
        </b-card-text>
      </b-card-body>
    </b-card>

    <b-alert v-model="showAlert" variant="success" dismissible>
      Payment successful!
    </b-alert>
    <b-alert v-model="showErrorAlert" variant="danger" dismissible>
      Payment failed!
    </b-alert>
    <b-alert v-model="showWarningAlert" variant="warning" dismissible>
      Please fill in all fields correctly.
    </b-alert>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import creditCardIcon from "../../../assets/credit-card.png";
import debitCardIcon from "../../../assets/debit-card.png";
import gpayIcon from "../../../assets/gpay.png";
import netbankingIcon from "../../../assets/netbanking.png";
import paypalIcon from "../../../assets/paypal.png";

const paymentMethods = [
  { name: "creditCard", label: "Credit Card", icon: creditCardIcon },
  { name: "debitCard", label: "Debit Card", icon: debitCardIcon },
  { name: "gpay", label: "Google Pay", icon: gpayIcon },
  { name: "netbanking", label: "Net Banking", icon: netbankingIcon },
  { name: "paypal", label: "Paypal", icon: paypalIcon },
];

const name = ref('');
const email = ref('');
const phone = ref('');
const cardNumber = ref('');
const expiryDate = ref('');
const cvv = ref('');
const cardHolderName = ref('');
const amount = ref('');
const selectedBank = ref('');
const selectedMethod = ref(null);

const banks = ['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak'];

const showAlert = ref(false);
const showErrorAlert = ref(false);
const showWarningAlert = ref(false);

const selectMethod = (methodName) => {
  selectedMethod.value = methodName;
};

const pay = () => {
  if (!name.value || !email.value || !phone.value) {
    showWarningAlert.value = true;
    return;
  }

  if ((selectedMethod.value === 'creditCard' || selectedMethod.value === 'debitCard') && 
     (!cardNumber.value || !expiryDate.value || !cvv.value || !cardHolderName.value || !amount.value)) {
    showWarningAlert.value = true;
    return;
  }

  if (selectedMethod.value === 'netbanking' && !selectedBank.value) {
    showWarningAlert.value = true;
    return;
  }

  showAlert.value = true;
  showErrorAlert.value = false;
  showWarningAlert.value = false;
};
</script>

<style scoped>
.label {
     font-weight: bold;
        color: #333;

}
.title {
    align-content: center;
    font-family: "Times New Roman", Times, serif;
    margin: auto;
    font-weight: bold;
    font-size: 2rem;
    color: #f11818;
    text-align: center;
    margin: 20px;
}
.payment-mode {
  text-align: center;
  margin-top: 20px;
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  font-size: 1.5rem;
  color: #f11818;
}

.container {
  max-width: 800px;
  margin: auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}

.payment-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
}

.payment-container div {
  cursor: pointer;
  border: 2px solid transparent;
  padding: 10px;
  border-radius: 8px;
  transition: 0.3s;
}

.payment-container div:hover {
  border-color: #007bff;
}

.payment-container .selected {
  border-color: #007bff;
  background-color: #f1f9ff;
}
</style>
