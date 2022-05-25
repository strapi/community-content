'use strict';

/**
 * dish service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dish.dish');
