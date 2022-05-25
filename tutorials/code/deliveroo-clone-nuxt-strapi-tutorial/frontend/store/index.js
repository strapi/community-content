import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      const user = (parsed.user && JSON.parse(parsed.user)) || null
      const cart = (parsed.cart && JSON.parse(parsed.cart)) || []

      commit('auth/setUser', user)
      commit('cart/setItems', cart)
    }
  },
}
