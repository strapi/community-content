/* _app.js */
import React from "react";
import App from "next/app";
import Head from "next/head";
import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";
import Layout from "../components/Layout";
import AppContext from "../context/AppContext";
import withData from "../lib/apollo";
class MyApp extends App {
  state = {
    user: null,
    cart: { items: [], total: 0 },
  };

  componentDidMount() {
    const token = Cookie.get("token");
    // restore cart from cookie, this could also be tracked in a db
    const cart = Cookie.get("cart");

    if (typeof cart === "string" && cart !== "undefined") {
      JSON.parse(cart).forEach((item) => {
        this.setState({
          cart: { items: JSON.parse(cart), total: item.price * item.quantity },
        });
      });
    }
    if (token) {
      // authenticate the token on the server and place set user object
      fetch("http://localhost:1337/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  }

  setUser = (user) => {
    this.setState({ user });
  };

  addItem = (item) => {
    let { items } = this.state.cart;
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);
    // if item is not new, add to cart, set quantity to 1
    if (!newItem) {
      //set quantity property to 1
      item.quantity = 1;
      console.log(this.state.cart.total, item.price);
      this.setState(
        {
          cart: {
            items: [...items, item],
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookie.set("cart", this.state.cart.items)
      );
    } else {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity + 1 })
                : item
            ),
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookie.set("cart", this.state.cart.items)
      );
    }
  };
  removeItem = (item) => {
    let { items } = this.state.cart;
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);
    if (newItem.quantity > 1) {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity - 1 })
                : item
            ),
            total: this.state.cart.total - item.price,
          },
        },
        () => Cookie.set("cart", this.state.cart.items)
      );
    } else {
      const items = [...this.state.cart.items];
      const index = items.findIndex((i) => i.id === newItem.id);

      items.splice(index, 1);
      this.setState(
        { cart: { items: items, total: this.state.cart.total - item.price } },
        () => Cookie.set("cart", this.state.cart.items)
      );
    }
  };
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
          cart: this.state.cart,
          addItem: this.addItem,
          removeItem: this.removeItem,
        }}
      >
        <Head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    );
  }
}

export default withData(MyApp);
