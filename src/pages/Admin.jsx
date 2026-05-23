  import { useEffect, useState } from "react";
import {
  FaChartLine,
  FaBoxOpen,
  FaShoppingCart,
  FaNewspaper,
  FaBell,
  FaSearch,
  FaUserCircle
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const API_URL = "https://dj-page-backend.onrender.com";

export default function Admin() {

  const user = JSON.parse(
    localStorage.getItem("loggedUser")
  );

  const token =
    localStorage.getItem("token");

  const [section, setSection] =
    useState("dashboard");

  const [products, setProducts] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  /* PRODUCTOS */
  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [measures,
    setMeasures] =
    useState("");

  const [image, setImage] =
    useState("");

  const [delivery,
    setDelivery] =
    useState("");

  const [category,
    setCategory] =
    useState("");

  /* BLOG */
  const [blogPosts,
    setBlogPosts] =
    useState([]);

  const [blogTitle,
    setBlogTitle] =
    useState("");

  const [blogDescription,
    setBlogDescription] =
    useState("");

  const [blogImage,
    setBlogImage] =
    useState("");

  const [blogVideo,
    setBlogVideo] =
    useState("");

  /* VALIDAR ADMIN */
  if (
    !user ||
    user.role !== "admin"
  ) {

    return (

      <div
        style={{
          minHeight: "100vh",
          background: "#050510",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
        }}
      >
        No autorizado
      </div>

    );

  }

  /* TRAER DATOS */
  const fetchData = () => {

    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);

      });

    fetch(`${API_URL}/api/orders`)
      .then((res) => res.json())
      .then((data) => {

        setOrders(data);

      });

    fetch(`${API_URL}/api/blog`)
      .then((res) => res.json())
      .then((data) => {

        setBlogPosts(data);

      });

  };

  useEffect(() => {

    fetchData();

  }, []);

  /* TOTAL */
  const totalVentas =
    orders.reduce(

      (acc, order) =>
        acc + order.total,

      0
    );

  /* AGREGAR PRODUCTO */
  const createProduct =
    async () => {

      try {

        const response =
          await fetch(
            `${API_URL}/api/products`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({
                title,
                price,
                description,
                measures,
                image,
                category,

                delivery:
                  delivery.split(","),
              }),
            }
          );

        const data =
          await response.json();

        console.log(data);

        alert("Producto agregado");

        fetchData();

        setTitle("");
        setPrice("");
        setDescription("");
        setMeasures("");
        setImage("");
        setDelivery("");
        setCategory("");

      } catch (error) {

        console.log(error);

      }

    };

  /* CREAR BLOG */
  const createBlogPost =
    async () => {

      try {

        await fetch(
          `${API_URL}/api/blog`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              title: blogTitle,

              description:
                blogDescription,

              image: blogImage,

              video: blogVideo,
            }),
          }
        );

        alert("Post agregado");

        fetchData();

        setBlogTitle("");
        setBlogDescription("");
        setBlogImage("");
        setBlogVideo("");

      } catch (error) {

        console.log(error);

      }

    };

  return (
  <div className="admin-layout">

{/* SIDEBAR */}
<aside className="sidebar">

  <h2 className="sidebar-logo">
    DJ ADMIN
  </h2>

  <button
    className={`sidebar-btn ${
      section === "dashboard"
        ? "active-sidebar"
        : ""
    }`}
    onClick={() =>
      setSection("dashboard")
    }
  >
 <FaChartLine />
  <span>Dashboard</span> 
   </button>

  <button
    className={`sidebar-btn ${
      section === "products"
        ? "active-sidebar"
        : ""
    }`}
    onClick={() =>
      setSection("products")
    }
  >
    Productos
  </button>

  <button
    className={`sidebar-btn ${
      section === "orders"
        ? "active-sidebar"
        : ""
    }`}
    onClick={() =>
      setSection("orders")
    }
  >
    Pedidos
  </button>

  <button
    className={`sidebar-btn ${
      section === "blog"
        ? "active-sidebar"
        : ""
    }`}
    onClick={() =>
      setSection("blog")
    }
  >
    Blog
  </button>

</aside>

{/* MAIN */}
<main className="admin-main"> 

  {/* TOPBAR */}
  <div className="topbar">

    <div className="topbar-left">

      <h2>
        Bienvenido Admin
      </h2>

    </div>

    <div className="topbar-right">

      <div className="search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Buscar..."
        />
      </div>

      <button className="notification-btn">
        <FaBell />
      </button>

      <div className="admin-profile">

        <FaUserCircle />

        <div>
          <h4>Admin</h4>
          <p>Administrador</p>
        </div>

      </div>

    </div>
    
  </div>


      {/* DASHBOARD */}
      {section === "dashboard" && (

        <div className="row">

          <div className="col-md-4 mb-4">

            <div className="stats-card">

              <h3>Ventas</h3>

              <h1>
                ${totalVentas}
              </h1>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="catalog-card">

              <h3>Pedidos</h3>

              <h1>
                {orders.length}
              </h1>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="catalog-card">

              <h3>Productos</h3>

              <h1>
                {products.length}
              </h1>

            </div>

          </div>

        </div>

      )}

      {/* PRODUCTOS */}
      {section === "products" && (

        <>

          <div
            style={{
              maxWidth: "700px",
              margin: "auto",

              background:
                "rgba(17,17,17,.82)",

              padding: "30px",

              borderRadius: "25px",

              border: "1px solid #222",

              marginBottom: "60px",
            }}
          >

            <input
              type="text"
              placeholder="Nombre producto"
              className="form-control mb-3"

              value={title}

              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Precio"
              className="form-control mb-3"

              value={price}

              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Descripción"
              className="form-control mb-3"

              value={description}

              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Medidas"
              className="form-control mb-3"

              value={measures}

              onChange={(e) =>
                setMeasures(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Imagen URL"
              className="form-control mb-3"

              value={image}

              onChange={(e) =>
                setImage(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Categoría"
              className="form-control mb-3"

              value={category}

              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Métodos entrega separados por coma"
              className="form-control mb-4"

              value={delivery}

              onChange={(e) =>
                setDelivery(
                  e.target.value
                )
              }
            />

            <button
              onClick={createProduct}

              className="btn btn-danger w-100"
            >
              Agregar Producto
            </button>

          </div>

          {/* LISTA */}
          <div className="row">

            {products.map((product) => (

              <div
                className="
                  col-12
                  col-sm-6
                  col-md-4
                  mb-4
                "

                key={product._id}
              >

                <div className="catalog-card">

                  <img
                    src={product.image}
                    alt={product.title}

                    className="
                      img-fluid
                      rounded
                      mb-3
                    "

                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />

                  <h3>
                    {product.title}
                  </h3>

                  <h2>
                    ${product.price}
                  </h2>

                  <button
                    className="
                      btn
                      btn-danger
                      mt-3
                    "

                    onClick={async () => {

                      await fetch(
                        `${API_URL}/api/products/${product._id}`,
                        {
                          method: "DELETE",

                          headers: {
                            Authorization:
                              `Bearer ${token}`,
                          },
                        }
                      );

                      fetchData();

                    }}
                  >
                    Eliminar
                  </button>

                </div>

              </div>

            ))}

          </div>

        </>

      )}

      {/* PEDIDOS */}
      {section === "orders" && (

        orders.map((order) => (

          <div
            key={order._id}

            style={{
              background:
                "rgba(20,20,35,.9)",

              padding: "25px",

              borderRadius: "20px",

              marginBottom: "30px",
            }}
          >

            <h3>
              {order.user}
            </h3>

            <p>
              Total:
              {" "}
              ${order.total}
            </p>

            <p>
              Estado:
              {" "}
              {order.status}
            </p>

            <div className="d-flex gap-2 mt-3 flex-wrap">

  {/* CONFIRMAR */}
  <button
    className="btn btn-success"
    onClick={async () => {

      await fetch(
        `${API_URL}/api/orders/${order._id}`,
        {

          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            status: "Confirmado",

          }),

        }
      );

      fetchData();

    }}
  >
    Confirmar
  </button>

  {/* ENVIAR */}
  <button
    className="btn btn-primary"
    onClick={async () => {

      await fetch(
        `${API_URL}/api/orders/${order._id}`,
        {

          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            status: "Enviado",

          }),

        }
      );

      fetchData();

    }}
  >
    Enviar
  </button>

  {/* CANCELAR */}
<button
  className="btn btn-danger"
  onClick={async () => {

    const confirmar =
      window.confirm(
        "¿Eliminar este pedido?"
      );

    if (!confirmar) return;

    await fetch(
      `${API_URL}/api/orders/${order._id}`,
      {
        method: "DELETE",
      }
    );

    fetchData();

  }}
>
  Cancelar
</button>

</div>

          </div>

        ))

      )}

      {/* BLOG */}
      {section === "blog" && (

        <div>

          <div
            style={{
              maxWidth: "700px",
              margin: "auto",
              marginBottom: "50px",
            }}
          >

            <input
              type="text"
              placeholder="Título"

              className="form-control mb-3"

              value={blogTitle}

              onChange={(e) =>
                setBlogTitle(
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Descripción"

              className="form-control mb-3"

              value={blogDescription}

              onChange={(e) =>
                setBlogDescription(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Imagen URL"

              className="form-control mb-3"

              value={blogImage}

              onChange={(e) =>
                setBlogImage(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Video URL"

              className="form-control mb-3"

              value={blogVideo}

              onChange={(e) =>
                setBlogVideo(
                  e.target.value
                )
              }
            />

            <button
              className="
                btn
                btn-success
                w-100
              "

              onClick={createBlogPost}
            >
              Publicar
            </button>

          </div>

          <div className="row">

            {blogPosts.map((post) => (

              <div
                className="col-md-6 mb-4"

                key={post._id}
              >

                <div className="catalog-card">

                  <img
                    src={post.image}
                    alt={post.title}

                    className="
                      img-fluid
                      rounded
                      mb-3
                    "
                  />

                  <h3>
                    {post.title}
                  </h3>

                  <p>
                    {post.description}
                  </p>

                  {post.video && (

                    <video
                      controls
                      width="100%"
                      className="rounded"
                    >

                      <source
                        src={post.video}
                          type="video/mp4"
                      />

                    </video>

                  )}

                </div>

              </div>

            ))}

          </div>
</div>

      )}
                                  </main>


    <style>{`

.admin-layout{
  display:flex;
  min-height:100vh;
  background:#050510;
  color:white;
}

/* SIDEBAR */

.sidebar{
  width:260px;
  background:rgba(10,10,25,.95);

  border-right:1px solid rgba(255,255,255,.08);

  padding:40px 20px;

  display:flex;
  flex-direction:column;
  gap:18px;

  position:fixed;

  left:0;
  top:0;
  bottom:0;

  backdrop-filter:blur(18px);

  box-shadow:
    0 0 25px rgba(255,0,204,.15);
}

.sidebar-logo{
  color:#ff00cc;

  font-weight:900;

  margin-bottom:40px;

  text-align:center;

  text-shadow:
    0 0 20px rgba(255,0,204,.5);
}

.sidebar-btn{
  border:none;

  background:transparent;

  color:white;

  padding:16px;

  border-radius:16px;

  text-align:left;

  font-weight:600;

  transition:.3s;
}

.sidebar-btn:hover{
  background:rgba(255,0,204,.15);

  transform:translateX(5px);

  box-shadow:
    0 0 15px rgba(255,0,204,.25);
}

.active-sidebar{
  background:linear-gradient(
    45deg,
    #ff0066,
    #ff00cc
  );

  box-shadow:
    0 0 20px rgba(255,0,204,.4);
}

/* MAIN */

.admin-main{
  flex:1;

  margin-left:260px;

  padding:50px;
}

.catalog-card{
  background:rgba(20,20,35,.82);

  border:1px solid rgba(255,255,255,.08);

  border-radius:24px;

  padding:30px;

  backdrop-filter:blur(14px);

  transition:.3s;
}

.catalog-card:hover{
  transform:translateY(-5px);

  border-color:#ff00cc;

  box-shadow:
    0 0 25px rgba(255,0,204,.25);
}

.sidebar-btn{
  display:flex;
  align-items:center;
  gap:14px;
}

/* TOPBAR */

.topbar{
  display:flex;
  justify-content:space-between;
  align-items:center;

  margin-bottom:40px;
}

.topbar-right{
  display:flex;
  align-items:center;
  gap:20px;
}

.search-box{
  display:flex;
  align-items:center;
  gap:10px;

  background:rgba(255,255,255,.05);

  padding:12px 18px;

  border-radius:14px;

  border:1px solid rgba(255,255,255,.08);
}

.search-box input{
  background:transparent;
  border:none;
  outline:none;
  color:white;
}

.notification-btn{
  width:50px;
  height:50px;

  border-radius:50%;
  border:none;

  background:rgba(255,255,255,.05);

  color:white;

  font-size:1.1rem;
}

.admin-profile{
  display:flex;
  align-items:center;
  gap:12px;

  background:rgba(255,255,255,.05);

  padding:10px 16px;

  border-radius:18px;
}

.admin-profile svg{
  font-size:2rem;
  color:#ff00cc;
}

.admin-profile h4{
  margin:0;
  font-size:1rem;
}

.admin-profile p{
  margin:0;
  font-size:.8rem;
  opacity:.7;
}

.stats-card{
  background:
    linear-gradient(
      145deg,
      rgba(35,35,55,.95),
      rgba(15,15,25,.95)
    );

  border-radius:28px;

  padding:35px;

  border:1px solid rgba(255,255,255,.08);

  position:relative;

  overflow:hidden;

  transition:.4s;
}

.stats-card::before{
  content:"";

  position:absolute;

  width:180px;
  height:180px;

  background:
    radial-gradient(
      #ff00cc55,
      transparent
    );

  top:-60px;
  right:-60px;
}

.stats-card:hover{
  transform:translateY(-8px);

  box-shadow:
    0 0 35px rgba(255,0,204,.25);
}

`}</style>
    </div>

  );

}