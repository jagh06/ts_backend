const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getStrapiInfo = async (req, res, next) => {
  try {
    const prices = await stripe.prices.list();
    res.send({ prices });
  } catch (error) {
    console.log("error");
  }
};

const postCheckOutStrapi = async (req, res, next) => {
    const { id } = req.body;
    console.log("id: proporciondao.::::", id)
    res.send({ message: "compra verificada" })
};

module.exports = { getStrapiInfo, postCheckOutStrapi };
