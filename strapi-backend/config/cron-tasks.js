module.exports = {
    /**
     * CRON JOB
     * Runs for every 1 minute
     */

    myJob: {
        task: async ({ strapi }) => {
            // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
            await strapi.db.query('api::article.article').deleteMany({
                where: {
                    deleted: true
                }
            })
        },
        options: {
            rule: "0 */1 * * * *" // run for every 1 minute
        },
    },
};