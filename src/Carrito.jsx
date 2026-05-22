import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  FaUserCircle,
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
} from "react-icons/fa";

export default function Carrito() {

  const [cart, setCart] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState("Usuario");

  const [showUserMenu, setShowUserMenu] = useState(false);

  /* LOGIN */
  const handleShow = () => {

    if (!isLoggedIn) {

      alert("Aquí puedes abrir tu modal de login");

    } else {

      setShowUserMenu(!showUserMenu);

    }

  };

  /* CARGAR CARRITO */
  useEffect(() => {

    const savedCart = JSON.parse(
      localStorage.getItem("cart")
    ) || [];

    setCart(savedCart);

    const loggedUser = JSON.parse(
      localStorage.getItem("loggedUser")
    );

    if (loggedUser) {

      setIsLoggedIn(true);

      setCurrentUser(loggedUser.name);

    }

  }, []);

  /* GUARDAR CARRITO */
  const updateCart = (updatedCart) => {

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  /* ELIMINAR PRODUCTO */
  const removeProduct = (id) => {

    const updatedCart = cart.filter(
      (product) => product._id !== id
    );

    updateCart(updatedCart);

  };

  /* VACIAR CARRITO */
  const clearCart = () => {

    updateCart([]);

  };

  /* AUMENTAR */
  const increaseQuantity = (id) => {

    const updatedCart = cart.map((product) =>

      product._id === id
        ? {
            ...product,
            quantity: product.quantity + 1,
          }
        : product
    );

    updateCart(updatedCart);

  };

  /* DISMINUIR */
  const decreaseQuantity = (id) => {

    const updatedCart = cart.map((product) =>

      product._id === id
        ? {
            ...product,
            quantity:
              product.quantity > 1
                ? product.quantity - 1
                : 1,
          }
        : product
    );

    updateCart(updatedCart);

  };

  /* TOTAL */
  const total = cart.reduce(

    (acc, item) =>

      acc + (
        item.price * item.quantity
      ),

    0
  );

  /* CHECKOUT MERCADO PAGO */
  const checkoutMercadoPago = () => {

    alert(
      "Aquí irá la integración con Mercado Pago"
    );

  };

  return (

    <>

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 999,
          background: "rgba(8,8,20,.55)",
          backdropFilter: "blur(16px)",
          borderBottom:
            "1px solid rgba(255,255,255,.08)",

          boxShadow:
            "0 0 15px rgba(255,0,204,.35), 0 0 35px rgba(0,255,255,.15)",
        }}
      >

        <div
          className="container-fluid px-5 py-3 d-flex align-items-center justify-content-between"
        >

          {/* LOGO */}
          <img
            src="/images/logo.png"
            alt="logo"
            style={{
              height: "75px",

              filter:
                "drop-shadow(0 0 10px #ff00cc) drop-shadow(0 0 20px #00ffff)",
            }}
          />

          {/* LINKS */}
          <div className="d-flex align-items-center gap-4">

            <a
              href="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Inicio
            </a>

            <a
              href="/catalogo"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Catálogo
            </a>

            <a
              href="/carrito"
              style={{
                color: "#ff00cc",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              Carrito
            </a>

            {/* LOGIN */}
            <div style={{ position: "relative" }}>

              <button
                onClick={handleShow}
                style={{
                  border: "1px solid #ff00cc",
                  background:
                    "rgba(255,0,204,.12)",

                  color: "white",

                  padding: "12px 24px",

                  borderRadius: "50px",

                  boxShadow:
                    "0 0 10px rgba(255,0,204,.35), 0 0 20px rgba(0,255,255,.15)",
                }}
              >

                <FaUserCircle className="me-2" />

                {isLoggedIn
                  ? currentUser
                  : "Iniciar Sesión"}

              </button>

              {/* MENU */}
              {isLoggedIn && showUserMenu && (

                <div
                  style={{
                    position: "absolute",
                    top: "75px",
                    right: "0",

                    background:
                      "rgba(15,15,25,.96)",

                    border:
                      "1px solid rgba(255,0,204,.35)",

                    borderRadius: "18px",

                    padding: "10px",

                    minWidth: "200px",

                    backdropFilter: "blur(16px)",

                    zIndex: 9999,
                  }}
                >

                  <button
                    onClick={() => {

                      setIsLoggedIn(false);

                      setCurrentUser("Usuario");

                      setShowUserMenu(false);

                      localStorage.removeItem(
                        "loggedUser"
                      );

                    }}
                    style={{
                      width: "100%",
                      border: "none",
                      background: "transparent",
                      color: "white",
                      padding: "12px 18px",
                      borderRadius: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Cerrar Sesión
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </nav>

      {/* CONTENIDO */}
      <div
        style={{
          minHeight: "100vh",
          background: "#050510",
          color: "white",
          padding: "140px 40px",
          fontFamily: "Poppins, sans-serif",
        }}
      >

        <h1
          style={{
            color: "#ff00cc",
            fontWeight: "900",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >

          <FaShoppingCart className="me-3" />

          Carrito

        </h1>

        <div className="container">

          {cart.length === 0 ? (

            <h3 className="text-center">
              Tu carrito está vacío
            </h3>

          ) : (

            <>

              <div className="row">

                {cart.map((product) => (

                  <div
                    className="col-md-4 mb-4"
                    key={product._id}
                  >

                    <div
                      style={{
                        background:
                          "rgba(17,17,17,.82)",

                        border: "1px solid #222",

                        borderRadius: "25px",

                        padding: "20px",

                        backdropFilter: "blur(14px)",

                        boxShadow:
                          "0 0 25px rgba(255,0,204,.12)",
                      }}
                    >

                      <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid rounded mb-3"
                      />

                      <h2>
                        {product.title}
                      </h2>

                      <h1
                        style={{
                          color: "#00ff88",
                          fontWeight: "900",
                        }}
                      >
                        ${product.price} MXN
                      </h1>

                      {/* CANTIDAD */}
                      <div
                        className="d-flex align-items-center gap-3 mt-3"
                      >

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              product._id
                            )
                          }
                          className="btn btn-dark"
                        >
                          <FaMinus />
                        </button>

                        <h5 className="mb-0">
                          {product.quantity}
                        </h5>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              product._id
                            )
                          }
                          className="btn btn-dark"
                        >
                          <FaPlus />
                        </button>

                      </div>

                      {/* ELIMINAR */}
                      <button
                        onClick={() =>
                          removeProduct(
                            product._id
                          )
                        }
                        className="btn btn-danger w-100 mt-4"
                      >

                        <FaTrash className="me-2" />

                        Eliminar

                      </button>

                    </div>

                  </div>

                ))}

              </div>

              {/* TOTAL */}
              <div
                style={{
                  marginTop: "50px",

                  background:
                    "rgba(17,17,17,.82)",

                  border: "1px solid #222",

                  borderRadius: "25px",

                  padding: "30px",

                  display: "flex",

                  justifyContent: "space-between",

                  alignItems: "center",

                  flexWrap: "wrap",

                  gap: "20px",

                  backdropFilter: "blur(14px)",
                }}
              >

                <div>

                  <h2
                    style={{
                      color: "#ff00cc",
                      fontWeight: "900",
                    }}
                  >
                    Total:
                  </h2>

                  <h1
                    style={{
                      color: "#00ff88",
                      fontWeight: "900",
                    }}
                  >
                    ${total} MXN
                  </h1>

                </div>

                <div className="d-flex gap-3">

                  {/* VACIAR */}
                  <button
                    onClick={clearCart}
                    className="btn btn-danger px-4 py-3"
                  >
                    Vaciar carrito
                  </button>

                  {/* PAGAR */}
                  <button
                    onClick={async () => {

  try {

    const loggedUser = JSON.parse(
      localStorage.getItem("loggedUser")
    );

    const total = cart.reduce(

      (acc, item) =>

        acc +
        item.price * item.quantity,

      0
    );

    /* GUARDAR PEDIDO */

    await fetch(

      "http://localhost:3000/api/orders",

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

        },

        body: JSON.stringify({

          user: loggedUser.name,

          items: cart,

          total,

        }),

      }
    );

    /* CREAR PAGO MP */

    const paymentResponse =
      await fetch(

        "http://localhost:3000/api/payments/create-preference",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            items: cart.map(
              (item) => ({

                title: item.title,

                quantity:
                  item.quantity,

                price:
                  item.price,

              })
            ),

          }),

        }
      );

    const paymentData =
      await paymentResponse.json();

    /* REDIRECCIONAR */ //CAMBIO 

    window.location.href =
      paymentData.init_point;

  } catch (error) {

    console.log(error);

    alert(
      "Error al procesar pago"
    );

  }

}}
                  >
                    Pagar
                  </button>

                </div>

              </div>

              {/* HISTORIAL */}
              <div
                style={{
                  marginTop: "60px",
                }}
              >

                <h2
                  style={{
                    color: "#ff00cc",
                    fontWeight: "900",
                    marginBottom: "25px",
                  }}
                >
                  Historial de compras
                </h2>

                <div
                  style={{
                    background:
                      "rgba(17,17,17,.82)",

                    borderRadius: "20px",

                    padding: "25px",

                    border: "1px solid #222",
                  }}
                >

                  <p className="text-secondary mb-0">
                    Aquí aparecerán las compras
                    realizadas después de integrar
                    Mercado Pago.
                  </p>

                </div>

              </div>

            </>

          )}

        </div>

      </div>

    </>

  );

}