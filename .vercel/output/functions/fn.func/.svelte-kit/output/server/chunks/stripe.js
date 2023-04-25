import Stripe from "stripe";
import { a as STRIPE_SECRET_KEY } from "./private.js";
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });
export {
  stripe as s
};
