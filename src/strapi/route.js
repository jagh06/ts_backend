const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto = require("crypto");

const getStrapiInfo = async (req, res, next) => {
  try {
    const prices = await stripe.prices.list();
    res.send({ prices });
  } catch (error) {
    console.log("error");
  }
};

const postCheckOutStrapi = async (req, res, next) => {
  try {
    const { id, token } = req.body;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: id,
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/client/success?temporary=${token}`,
      cancel_url: "http://localhost:3000/client/dashboard/customer-suscripcion",
    });

    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getStrapiInfo, postCheckOutStrapi };
