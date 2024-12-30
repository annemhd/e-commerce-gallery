import { loadStripe } from "@stripe/stripe-js";

let stripePromise: any;

export const useStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51QIZxLEDYP8fXFGT9uEuXdyOAVq3jF0W4ft9DKOgNgjGK75Bn0erP8O03NcRlPrcniAdlLmfx6RGOUmRy6oFod7H00BwiT3WcY');
  }
  return stripePromise;
};