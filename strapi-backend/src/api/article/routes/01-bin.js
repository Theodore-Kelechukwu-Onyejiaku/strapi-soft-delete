module.exports = {
    routes: [
        {
            method: "GET",
            path: "/articles/bin",
            handler: "article.getBin",
        },
        {
            method: "PUT",
            path: "/articles/bin/:id/recover",
            handler: "article.recover"
        },

        {
            method: "DELETE",
            path: "/articles/bin/empty",
            handler: "article.emptyTrash"
        }
    ]
}