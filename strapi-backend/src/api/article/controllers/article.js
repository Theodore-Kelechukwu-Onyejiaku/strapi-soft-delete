// @ts-nocheck
'use strict';

/**
 * article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const moment = require("moment");

module.exports = createCoreController('api::article.article', ({ strapi }) => ({

    async softDelete(ctx) {
        const { id } = ctx.params;

        // get the article
        const article = await strapi.service('api::article.article').findOne(id);

        // if article doesn't exist
        if (!article) {
            return ctx.notFound("Article does not exist", { details: "This article was not found. Check article id please." })
        }

        // get current date
        const currentDate = moment(Date.now()).format("YYYY-MM-DD")

        // update article
        const entity = await strapi.service('api::article.article').update(id, {
            data: {
                deleted: true,
                deleted_at: currentDate
            }
        })

        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity)
    },

    async permanentDelete(ctx) {
        let { id } = ctx.params;

        // get article
        const article = await strapi.service('api::article.article').findOne(id)

        // if no article
        if (!article) {
            const sanitizedEntity = await this.sanitizeOutput(article, ctx);
            return this.transformResponse(sanitizedEntity);
        }

        //permanently delete article
        let entity = await strapi.service('api::article.article').delete(id)
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity)
    },

    async getBin(ctx) {
        const bin = await strapi.entityService.findMany('api::article.article', {
            filters: {
                deleted: true
            }
        })

        const sanitizedEntity = await this.sanitizeOutput(bin, ctx);
        return this.transformResponse(sanitizedEntity)
    },

    async recover(ctx) {
        const { id } = ctx.params;
        let article = await strapi.service('api::article.article').findOne(id);

        if (!article) {
            const sanitizedEntity = await this.sanitizeOutput(article, ctx);
            return this.transformResponse(sanitizedEntity);
        }

        // update article
        const entity = await strapi.service('api::article.article').update(id, {
            data: {
                deleted: false,
                deleted_at: null
            }
        })

        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity)
    },

    async emptyTrash(ctx) {
        const result = await strapi.db.query('api::article.article').deleteMany({
            where: {
                deleted: true
            }
        })

        const sanitizedEntity = await this.sanitizeOutput(result, ctx);

        return this.transformResponse(sanitizedEntity)
    },

    async find(ctx) {
        const articles = await strapi.entityService.findMany('api::article.article', {
            filters: {
                deleted: false
            }
        })
        const sanitizedEntity = await this.sanitizeOutput(articles, ctx);

        return this.transformResponse(sanitizedEntity)
    },

    async findOne(ctx) {
        const { id } = ctx.params;
        let article = await strapi.service('api::article.article').findOne(id);

        if (!article || article.deleted) {
            article = null;
        }

        const sanitizedEntity = await this.sanitizeOutput(article, ctx);
        return this.transformResponse(sanitizedEntity);
    }

}));
