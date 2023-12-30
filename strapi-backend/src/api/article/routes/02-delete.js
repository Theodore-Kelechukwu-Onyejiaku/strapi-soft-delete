module.exports = {
    routes: [
        {
            method: "PUT",
            path: "/articles/:id/soft-delete",
            handler: "article.softDelete",
        },
        {
            method: "DELETE",
            path: "/articles/:id/permanent-delete",
            handler: "article.permanentDelete"
        }
    ]
}