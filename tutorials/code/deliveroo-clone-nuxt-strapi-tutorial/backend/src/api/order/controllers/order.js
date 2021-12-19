'use strict';
const stripe = require('stripe')('##Clé secrète##');

/**
 *  order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) =>  ({
  // Charge the customer
  async chargeCustomer() {
    const {
      amount,
      token,
    } = ctx.request.body;

    try {
      await stripe.charges.create({
        // Transform cents to dollars.
        amount: amount * 100,
        currency: 'usd',
        description: `Order ${new Date()} by ${ctx.state.user.id}`,
        source: token,
      });
    } catch (err) {
      // Silent
    }
  }
}));
