<template>
  <div class="payment-container">
    <div class="payment-header">
      <h1>Payment</h1>
      <h2 class="amount">Amount to pay: <span>${{ amount }}</span></h2>
    </div>

    <div class="payment-methods">
      <div
        v-for="(method, index) in paymentMethods"
        :key="index"
        :class="['method-card', { selected: selectedMethod === method.name }]"
        @click="selectMethod(method.name)"
      >
        <img :src="method.icon" :alt="method.label" />
        <span>{{ method.label }}</span>
      </div>
    </div>

    <b-card v-if="selectedMethod" class="payment-form-card">
      <b-card-body>
        <!-- <b-card-title>Payment Details - {{ selectedMethodLabel }}</b-card-title>
        <b-form-group label="Bank Name" class="label">
          <b-form-input v-model="name" placeholder="Enter Bank Name" />
        </b-form-group> -->
        <!-- <b-form-group label="Email" class="label">
          <b-form-input v-model="email" placeholder="Enter email" />
        </b-form-group> -->
        <!-- <b-form-group label="Phone" class="label">
          <b-form-input v-model="phone" placeholder="Enter phone" />
        </b-form-group> -->
      </b-card-body>
      <b-card-body class = "payment-details-body">

        <b-card-title class = "payment-details-title">Payment Details - {{ selectedMethodLabel }}</b-card-title>
        <b-form-group label="Bank Name" class="label">
          <b-form-input v-model="name" placeholder="Enter Bank Name" />
        </b-form-group>
        <b-form v-if="selectedMethod === 'creditCard' || selectedMethod === 'debitCard'">
          <b-form-group label="Account Number" class="label">
            <b-form-input v-model="accountNumber" placeholder="Enter Account Number"
            maxlength="12"
            type="text"
            :state="accountNumberState" />

            <b-form-invalid-feedback v-if="accountNumber && !accountNumberState">
    Account number must be exactly 12 digits.
  </b-form-invalid-feedback>

          </b-form-group>
          <b-form-group label="Expiry Date" class="label">
            <b-form-input v-model="expiryDate" placeholder="MM/YY" />
          </b-form-group>
          <b-form-group label="CVV" class="label">
            <b-form-input v-model="cvv" placeholder="Enter 3-digit CVV"
    maxlength="3"
    type="text"
    :state="cvvState" />

    <b-form-invalid-feedback v-if="cvv && !cvvState">
    CVV must be exactly 3 digits.
  </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Card Holder Name" class="label">
            <b-form-input v-model="cardHolderName" placeholder="Enter card holder name" />
          </b-form-group>
        </b-form>
        <div v-else-if="selectedMethod === 'gpay'" class="info-box">
          <p>Use Google Pay to scan and pay via your mobile device.</p>
        </div>
        <div v-else-if="selectedMethod === 'paypal'" class="info-box">
          <p>You will be redirected to PayPal to complete your transaction.</p>
        </div>
        <b-form-group
          v-if="selectedMethod === 'netbanking'"
          label="Select your Bank"
          class="label"
        >
          <b-form-select :options="banks" v-model="selectedBank" />
        </b-form-group>
        <b-form-group label="Amount" class="label">
          <b-form-input v-model="amount" readonly />
        </b-form-group>
        <div class="pay-btn-row">
          <b-button variant="primary" class="pay-btn" @click="pay">Pay</b-button>
        </div>
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
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePaymentStore } from '@/store/paymentStore';
import creditCardIcon from "../../../assets/credit-card.png";
import debitCardIcon from "../../../assets/debit-card.png";
import gpayIcon from "../../../assets/gpay.png";
import netbankingIcon from "../../../assets/netbanking.png";
import paypalIcon from "../../../assets/paypal.png";

const route = useRoute();
const router = useRouter();
const paymentStore = usePaymentStore();

const paymentMethods = [
  { name: "creditCard", label: "Credit Card", icon: creditCardIcon },
  { name: "debitCard", label: "Debit Card", icon: debitCardIcon },
  { name: "gpay", label: "Google Pay", icon: gpayIcon },
  { name: "netbanking", label: "Net Banking", icon: netbankingIcon },
  { name: "paypal", label: "Paypal", icon: paypalIcon },
];

// const bankName = ref('');
const accountNumber = ref('');
const expiryDate = ref('');
const cvv = ref('');
const cardHolderName = ref('');
const selectedBank = ref('');
const selectedMethod = ref(null);

const accountNumberState = computed(() => /^\d{12}$/.test(accountNumber.value));
const cvvState = computed(() => /^\d{3}$/.test(cvv.value));
//const expiryDateState = computed(() => /^\d{2}\/\d{2}$/.test(expiryDate.value));
//const cardHolderNameState = computed(() => /^[a-zA-Z\s]+$/.test(cardHolderName.value));
const banks = ['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak'];

const showAlert = ref(false);
const showErrorAlert = ref(false);
const showWarningAlert = ref(false);

const amount = ref(route.query.price ? String(route.query.price) : '');

const selectMethod = (methodName) => {
  selectedMethod.value = methodName;
};

const selectedMethodLabel = computed(() => {
  const found = paymentMethods.find(m => m.name === selectedMethod.value);
  return found ? found.label : '';
});

function convertExpiryToISO(expiry) {
  // expiry is "MM/YY"
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return null;
  const [mm, yy] = expiry.split('/');
  // Assume 20YY for years 00-99
  const year = parseInt(yy, 10) + 2000;
  const month = parseInt(mm, 10);
  if (month < 1 || month > 12) return null;
  // Use last day of the month for expiry
  const lastDay = new Date(year, month, 0).getDate();
  return `${year}-${String(month).padStart(2, '0')}-${lastDay}`;
}

const pay = async () => {
  if (selectedMethod.value === 'CreditCard' || selectedMethod.value === 'DebitCard') {
    if (
      !accountNumberState.value ||
      !expiryDate.value ||
      !cvvState.value ||
      !cardHolderName.value ||
      !amount.value
    ) {




      showWarningAlert.value = true;
      return;
    }
  } else if (selectedMethod.value === 'NetBanking') {
    if (!selectedBank.value || !accountNumberState.value || !amount.value) {
      showWarningAlert.value = true;
      return;
    }
  } else if (!amount.value) {
    showWarningAlert.value = true;
    return;
  }

  try {
    await paymentStore.newPayment({
      PaymentMethod: selectedMethodLabel.value,
      BankName: selectedBank.value,
      AccountNumber: accountNumber.value,
      ExpiryDate: convertExpiryToISO(expiryDate.value),
      CVV: cvv.value,
      CardHolderName: cardHolderName.value,
      Amount: amount.value,
      PaymentDate: new Date().toISOString(),
      Status: "Pending"
    });
    router.push({ name: 'PaymentSuccess' });
  } catch (e) {
    router.push({ name: 'PaymentFailure' });
  }
};

</script>

<style scoped>
.payment-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}
.payment-header {
  text-align: center;
  margin-bottom: 24px;
  background: #108cf1;
  border-radius: 12px;
  padding: 40px;
  margin: 30px;
  color: #ffffff;
}
.payment-header h1 {
  margin-bottom: 8px;
  font-size: 2rem;
  color: #000000;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;

}

.payment-details-body {
  background: #f4f9f5;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  border-radius: 12px;
  padding: 20px;
  margin: 20px;
    
}

.payment-details-title {
  font-size: 2rem;
  color: #000000;
  font-weight: bold;  
  font-family: 'Poppins', sans-serif;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;

}

.amount {
  font-size: 2rem;
  color: #333;
}
.amount span {
  color: #f4f9f5;
  font-weight: bold;

  font-size: 3rem;
}
.payment-methods {
  display: flex;
  justify-content: space-between;
  margin : 80px;

  /* margin-bottom: 24px; */
  gap: 25px;
}
.method-card {
  flex: 1;
  background: #f8f9fa;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 16px 8px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.method-card.selected {
  border-color: #007bff;
  background: #e9f5ff;
}
.method-card img {
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
}
.method-card span {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}
.payment-form-card {
  margin-top: 20px;
}
.label {
  font-weight: 500;
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 10px;

}
.info-box {
  background: #f1f3f4;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
  color: #555;
  font-size: 1rem;
}
.pay-btn-row {
  display: flex;
  justify-content: center;
  margin-top: 18px;
}
.pay-btn {
  min-width: 120px;
  font-size: 1.1rem;
  padding: 10px 24px;
}
</style>
