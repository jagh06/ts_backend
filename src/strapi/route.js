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

const getSuscriptionsList = async (req, res) => {
  try {
    const suscripciones = await stripe.subscriptions.list({ limit: 10 });
    const suscriptores = await Promise.all(
      suscripciones.data.map(async (suscripcion) => {
        const cliente = await stripe.customers.retrieve(suscripcion.customer);
        return {
          id: suscripcion.id,
          cliente: {
            id: cliente.id,
            email: cliente.email,
            // Otros campos del cliente que puedas necesitar
          },
          plan: suscripcion.items.data[0].plan.nickname,
        };
      })
    );
    res.status(200).json({ suscriptores });
  } catch (error) {
    console.log("ERROR_GET_SUSCRIPTIONS_LIST");
  }
};

const postCheckOutStrapi = async (req, res, next) => {
  try {
    const { id, token,  nickname } = req.body;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: id,
          quantity: 1,
        },
      ],
      success_url: `${process.env.PORT_CLIENT}/client/success?temporary=${token}&nickname=${nickname}`,
      cancel_url: `${process.env.PORT_CLIENT}/client/dashboard/customer-suscripcion`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
  }
};

//cancelled subscription

const cancelledSubscriptionTest = async (req, res) => {
  console.log(`here subscription`);
  try {
    const subscription = await stripe.subscriptions.update(
      "sub_1OHKXSBGWHlNL0yQCZBkWqjT",
      {
        cancel_at_period_end: true,
      }
    );
    console.log(subscription);

    res.status(200).json({ message: subscription });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getStrapiInfo,
  postCheckOutStrapi,
  getSuscriptionsList,
  cancelledSubscriptionTest,
};
