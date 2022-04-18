'use strict';

/**
 * rich service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::rich.rich');
