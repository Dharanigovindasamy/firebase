import axios from "axios";

export const createPayment = async (paymentData) => {
 try {
  const response = await axios.post("http://localhost:5000/api/payment/create", paymentData);
  return response.data;
 } catch (error) {
  console.error("Error creating payment:", error);
  throw error;
 }
};



