'use strict';

/**
 * s3-point router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::s3-point.s3-point');
