module.exports = {
  count: async ctx => {
    const entries = await strapi.query("importconfig", "import-content").count(ctx.request.query)
    ctx.send(entries)
  },
  findOne: async ctx => {
    const entries = await strapi.query("importconfig", "import-content").findOne({id: ctx.params.importId})
    ctx.send(entries)
  },
  find: async ctx => {
    const entries = await strapi.query("importconfig", "import-content").find(ctx.request.query)
    ctx.send(entries)
  },
  delete: async ctx => {
    return strapi.query("importconfig", "import-content").delete({id: ctx.params.importId})
  },
  update: async ctx => {
    return strapi.query("importconfig", "import-content").update({id: ctx.params.importId}, ctx.request.body)
  }
};
