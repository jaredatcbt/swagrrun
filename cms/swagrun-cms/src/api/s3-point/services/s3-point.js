'use strict';

/**
 * s3-point service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::s3-point.s3-point');
