'use strict';

/**
 * s6-member service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::s6-member.s6-member');
