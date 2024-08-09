'use strict';

/**
 * s3-heading service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::s3-heading.s3-heading');
