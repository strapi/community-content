module.exports = {
  count: async ctx => {
    const entries = await strapi.query("importeditem", "import-content").count(ctx.request.query)
    ctx.send(entries)
  },
  findOne: async ctx => {
    const entries = await strapi.query("importeditem", "import-content").findOne({id: ctx.params.importId})
    ctx.send(entries)
  },
  find: async ctx => {
    const entries = await strapi.query("importeditem", "import-content").find(ctx.request.query)
    ctx.send(entries)
  },
  delete: async ctx => {
    return strapi.query("importeditem", "import-content").delete({id: ctx.params.importId})
  },
  update: async ctx => {
    return strapi.query("importeditem", "import-content").update({id: ctx.params.importId}, ctx.request.body)
  }
};