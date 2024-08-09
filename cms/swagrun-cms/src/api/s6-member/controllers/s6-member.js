'use strict';

/**
 *  s6-member controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::s6-member.s6-member');
