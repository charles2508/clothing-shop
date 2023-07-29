require("dotenv").config();
const stripe = require("stripe")("sk_test_51NYPVKG6l6JulG5XWwu11FhfeeRRLNCPCF7VbD3Zzai0GuEDisokt1m9HBl8YsN6p1S8jo4VYIUALj0Q16jLGaUN00tfVegzdx");

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};