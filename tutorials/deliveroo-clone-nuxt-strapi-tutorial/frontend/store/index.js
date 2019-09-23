import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null
    let cart = []
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      user = (parsed.user && JSON.parse(parsed.user)) || null
      cart = (parsed.cart && JSON.parse(parsed.cart)) || []
    }

    commit('auth/setUser', user)
    commit('cart/setItems', cart)
  }
}
