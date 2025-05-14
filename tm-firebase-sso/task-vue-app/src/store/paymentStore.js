import { defineStore } from "pinia";
import { ref } from "vue";
import { createPayment } from "@/service/payment/payment";

export const usePaymentStore = defineStore("payment", () => {
  const payments = ref([]);

  const newPayment = async (paymentData) => {
    const response = await createPayment(paymentData);
    payments.value.push(response);
  };

  return { payments, newPayment };
});