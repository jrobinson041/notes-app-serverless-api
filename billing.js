import stripePackage from "stripe";
import { parseEvent } from "./libs/event-lib";
import { calculateCost } from "./libs/billing-lib";
import { success, failure } from "./libs/response-lib";

export const main = async event => {
  const { storage, source } = parseEvent(event);
  const amount = calculateCost(storage);
  const description = "Scratch Notes charge";

  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    return success({ status: true });
  } catch (err) {
    return failure({ status: false, message: err.message });
  }
};
