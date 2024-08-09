'use strict';

/**
 * s6-member router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::s6-member.s6-member');
