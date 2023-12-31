const moment = require("moment");
module.exports = {
    /**
     * CRON JOB
     * Runs for every day
     */

    myJob: {
        task: async ({ strapi }) => {
            const thirtyDaysAgo = moment().subtract(30, "days").format("YYYY-MM-DD");
            // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
            await strapi.db.query("api::article.article").deleteMany({
                where: {
                    deleted_at: {
                        $lt: thirtyDaysAgo,
                    },
                },
            });
        },
        options: {
            rule: "0 0 * * *", // run every day at midnight
        },
    },
};
