/* components/cart/index.js */

import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card, CardBody, CardTitle, Badge } from "reactstrap";

import AppContext from "../../context/AppContext";

function Cart() {
  const appContext = useContext(AppContext);
  const router = useRouter();

  const { cart, isAuthenticated } = appContext;

  return (
    <div>
      <Card style={{ padding: "10px 5px" }} className="cart">
        <CardTitle style={{ margin: 10 }}>Your Order:</CardTitle>
        <hr />
        <CardBody style={{ padding: 10 }}>
          <div style={{ marginBottom: 6 }}>
            <small>Items:</small>
          </div>
          <div>
            {cart.items
              ? cart.items.map((item) => {
                  if (item.quantity > 0) {
                    return (
                      <div
                        className="items-one"
                        style={{ marginBottom: 15 }}
                        key={item.id}
                      >
                        <div>
                          <span id="item-price">&nbsp; ${item.price}</span>
                          <span id="item-name">&nbsp; {item.name}</span>
                        </div>
                        <div>
                          <Button
                            style={{
                              height: 25,
                              padding: 0,
                              width: 15,
                              marginRight: 5,
                              marginLeft: 10,
                            }}
                            onClick={() => appContext.addItem(item)}
                            color="link"
                          >
                            +
                          </Button>
                          <Button
                            style={{
                              height: 25,
                              padding: 0,
                              width: 15,
                              marginRight: 10,
                            }}
                            onClick={() => appContext.removeItem(item)}
                            color="link"
                          >
                            -
                          </Button>
                          <span style={{ marginLeft: 5 }} id="item-quantity">
                            {item.quantity}x
                          </span>
                        </div>
                      </div>
                    );
                  }
                })
              : null}
            {isAuthenticated ? (
              cart.items.length > 0 ? (
                <div>
                  <Badge style={{ width: 200, padding: 10 }} color="light">
                    <h5 style={{ fontWeight: 100, color: "gray" }}>Total:</h5>
                    <h3>${appContext.cart.total.toFixed(2)}</h3>
                  </Badge>
                  {router.pathname === "/restaurants" && (
                    <div
                      style={{
                        marginTop: 10,
                        marginRight: 10,
                      }}
                    >
                      <Link href="/checkout">
                        <Button style={{ width: "100%" }} color="primary">
                          <a>Order</a>
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {router.pathname === "/checkout" && (
                    <small
                      style={{ color: "blue" }}
                      onClick={() => window.history.back()}
                    >
                      back to restaurant
                    </small>
                  )}
                </>
              )
            ) : (
              <h5>Login to Order</h5>
            )}
          </div>
          {console.log(router.pathname)}
        </CardBody>
      </Card>
      <style jsx>{`
        #item-price {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
        #item-quantity {
          font-size: 0.95em;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }
        #item-name {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
      `}</style>
    </div>
  );
}
export default Cart;
