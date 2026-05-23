import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Modal,
  Button,
} from "react-bootstrap";

export default function Catalogo() {

  const [showProductModal, setShowProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [currentImage, setCurrentImage] = useState(0);

  const productImages = [
   "/images/Cabina_DJ.jpeg",
  "/images/laserdj.jpg",
  ];

  useEffect(() => {

    fetch("https://dj-page-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);

      });

  }, []);

  useEffect(() => {

    const savedCart = JSON.parse(localStorage.getItem("cart"));

    if (savedCart) {

      setCart(savedCart);

    }

  }, []);

  const addToCart = (product) => {

    const existingCart = JSON.parse(
      localStorage.getItem("cart")
    ) || [];

    const existingProduct = existingCart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {

      updatedCart = existingCart.map((item) =>

        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

    } else {

      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);

    alert("Producto agregado al carrito");

  };

  const filteredProducts =
    products.filter((product) => {

      const matchesSearch =

        product.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =

        category === ""

          ? true

          : product.category ===
            category;

      const matchesPrice =

        maxPrice === ""

          ? true

          : product.price <=
            Number(maxPrice);

      return (

        matchesSearch &&
        matchesCategory &&
        matchesPrice

      );

    });

  return (

    <>

      {/* NAVBAR */}
      <nav className="fixed-top navbar-custom">

        <div className="container-fluid px-5 py-3 d-flex align-items-center justify-content-between">

          {/* LOGO */}
          <div>

            <img
              src="/images/logo.png"
              alt="logo"
              className="navbar-logo"
            />

          </div>

          {/* MENU */}
          <div className="d-none d-lg-flex align-items-center gap-4">

            <a
              href="/"
              className="nav-link-custom"
            >
              Inicio
            </a>

            <a
              href="/Blog"
              className="nav-link-custom"
            >
              Blog
            </a>

          <a
  href="/carrito"
  className="nav-link-custom"
>
  Carrito
</a>

            <a
              href="https://wa.me/5215512345678"
              className="nav-link-custom"
            >
              Contacto
            </a>

            <button className="btn-login">

              Cuenta

            </button>

          </div>

        </div>

      </nav>

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
            marginBottom: "60px",
            textShadow: "0 0 20px rgba(255,0,204,.5)",
          }}
        >
          Catálogo
        </h1>

        <div
          className="container mb-5"
        >

          <div className="row g-3">

            {/* BUSCADOR */}
            <div className="col-md-4">

              <input
                type="text"

                placeholder="Buscar producto..."

                className="form-control"

                value={search}

                onChange={(e) =>

                  setSearch(
                    e.target.value
                  )

                }

                style={{
                  background: "#111",
                  color: "white",
                  border:
                    "1px solid #ff00cc",
                  padding: "14px",
                  borderRadius: "14px",
                }}
              />

            </div>

            {/* CATEGORIA */}
            <div className="col-md-4">

              <select

                className="form-control"

                value={category}

                onChange={(e) =>

                  setCategory(
                    e.target.value
                  )

                }

                style={{
                  background: "#111",
                  color: "white",
                  border:
                    "1px solid #00ffff",
                  padding: "14px",
                  borderRadius: "14px",
                }}
              >

                <option value="">
                  Todas las categorías
                </option>

                <option value="Cabinas DJ">
                  Cabinas DJ
                </option>

                <option value="Iluminación">
                  Iluminación
                </option>

                <option value="Audio">
                  Audio
                </option>

              </select>

            </div>

            {/* PRECIO */}
            <div className="col-md-4">

              <input
                type="number"

                placeholder="Precio máximo"

                className="form-control"

                value={maxPrice}

                onChange={(e) =>

                  setMaxPrice(
                    e.target.value
                  )

                }

                style={{
                  background: "#111",
                  color: "white",
                  border:
                    "1px solid #00ff88",
                  padding: "14px",
                  borderRadius: "14px",
                }}
              />

            </div>

          </div>

        </div>
        <div className="row g-4 mt-4">

  {filteredProducts.map((product) => (

    <div
      className="col-md-4"
      key={product._id}
    >

      <div className="service-card h-100">

      <img src="/images/Cabina_DJ.jpeg" 
  alt={product.title}
  className="img-fluid rounded-4 mb-4"
  style={{
    height: "250px",
    width: "100%",
    objectFit: "cover",
  }}
/>

        {/* TITULO */}
        <h3 className="fw-bold mb-3">
          {product.title}
        </h3>

        {/* PRECIO */}
        <h1 className="price-text">
          ${product.price} MXN
        </h1>

        {/* DESCRIPCION */}
        <p className="text-secondary mt-3">
          {product.description}
        </p>

        {/* MEDIDAS */}
        <p className="text-secondary">
          <strong>Medidas:</strong>
          <br />
          {product.measures}
        </p>

        {/* ENTREGAS */}
        <div className="mt-3">

          <h6 className="fw-bold">
            Métodos de entrega:
          </h6>

          <ul className="text-secondary">

            {product.delivery &&
              product.delivery.map(
                (item, index) => (

                  <li key={index}>
                    {item}
                  </li>

                )
              )
            }

          </ul>

        </div>

        {/* BOTON */}
        <button
          className="cotizar-btn w-100 mt-4"
            onClick={() => addToCart(product)}

        >

          Agregar al carrito

        </button>

      </div>

    </div>

  ))}

</div>

        {/* BOTON VOLVER */}
        <div className="text-center mt-5">

          <a
            href="/"
            className="back-btn"
          >
            Volver al inicio
          </a>

        </div>

      </div>

      {/* MODAL PRODUCTO */}
      <Modal
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        size="xl"
        centered
      >

        <Modal.Body className="neon-modal text-white p-0 overflow-hidden">

          <div className="row g-0">

            {/* CARRUSEL */}
            <div className="col-lg-7 p-4">

              <img
                src={productImages[currentImage]}
                alt="Producto"
                className="img-fluid rounded-4 w-100"
                style={{
                  height: "500px",
                  objectFit: "cover",
                }}
              />

             {/* CONTROLES CARRUSEL */}
<div className="d-flex justify-content-between align-items-center mt-4">

  <button
    className="carousel-btn"
    onClick={() =>
      setCurrentImage(
        currentImage === 0
          ? productImages.length - 1
          : currentImage - 1
      )
    }
  >
    ←
  </button>

  <div className="d-flex gap-2">

    {productImages.map((_, index) => (

      <div
        key={index}
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background:
            currentImage === index
              ? "#ff00cc"
              : "#555",
        }}
      />

    ))}

  </div>

  <button
    className="carousel-btn"
    onClick={() =>
      setCurrentImage(
        currentImage === productImages.length - 1
          ? 0
          : currentImage + 1
      )
    }
  >
    →
  </button>

</div>
            </div>

            {/* INFO */}
            <div className="col-lg-5 p-5 d-flex flex-column justify-content-center">

              <h1 className="fw-bold mb-3">
                Cabina DJ 3D
              </h1>

              <h2 className="price-text mb-4">
                $3,000 MXN
              </h2>

              <p className="text-secondary">
                Cabina profesional para eventos,
                iluminación LED RGB integrada,
                acabado premium y estructura reforzada.
              </p>

              <ul className="mt-4 text-secondary">
                <li>✔ Medidas: 1.02m de alto x 1m de largo x 50 cm de ancho</li>
                <li>✔ Material resistente</li>
                <li>✔ Diseño moderno</li>
                <li>✔ Fácil instalación</li>
                <li>✔ Métodos de entrega:
Se entrega a domicilio (sin costo a 5km del estadio azteca) de CDMX 
$250 dentro de CDMX.</li>
              </ul>

             <Button
  className="neon-login-btn rounded-pill fw-bold py-3 mt-4"
  onClick={() => {

    const producto = {
  _id: "cabina-dj-3d",
  title: "Cabina DJ 3D",
  price: 3000,
  image: "/images/Cabina_DJ.jpeg",
  quantity: 1,
};

  }}
>
  Agregar al carrito
</Button> 
            </div>

          </div>

        </Modal.Body>

      </Modal>

      {/* ESTILOS */}
      <style>{`

        body{
          background:black;
        }

        .navbar-custom{
          background:rgba(8,8,20,.55);
          backdrop-filter:blur(16px);
          border-bottom:1px solid rgba(255,255,255,.08);

          box-shadow:
            0 0 15px rgba(255,0,204,.35),
            0 0 35px rgba(0,255,255,.15);

          z-index:999;
        }

        .navbar-logo{
          height:75px;

          filter:
            drop-shadow(0 0 10px #ff00cc)
            drop-shadow(0 0 20px #00ffff);
        }

        .nav-link-custom{
          color:white;
          text-decoration:none;
          font-weight:600;
          transition:.3s;
        }

        .nav-link-custom:hover{
          color:#ff00cc;
        }

        .btn-login{
          border:1px solid #ff00cc;
          background:rgba(255,0,204,.12);
          color:white;
          padding:12px 24px;
          border-radius:50px;
        }

        .catalog-card{
          background:rgba(17,17,17,.82);
          border:1px solid #222;
          border-radius:25px;
          padding:25px;
          text-align:center;
          transition:.3s;
          backdrop-filter:blur(14px);
        }

        .catalog-card:hover{
          transform:translateY(-5px);

          border-color:#ff00cc;

          box-shadow:
            0 0 30px rgba(255,0,204,.25);
        }

        .catalog-img{
          width:100%;
          height:250px;
          object-fit:cover;
          border-radius:20px;
        }

        .price-text{
          color:#00ff88;
          font-weight:900;
          margin-top:15px;
        }

        .back-btn{
          display:inline-block;
          padding:14px 28px;
          border-radius:50px;
          background:#ff00cc;
          color:white;
          text-decoration:none;
          font-weight:700;
        }

        .neon-modal{
          background:
            linear-gradient(
              145deg,
              rgba(20,20,35,.96),
              rgba(10,10,20,.96)
            );

          border:1px solid rgba(255,0,204,.35);

          box-shadow:
            0 0 20px rgba(255,0,204,.45),
            0 0 45px rgba(0,255,255,.18);

          backdrop-filter:blur(18px);
        }

        .modal-content{
          background:transparent !important;
          border:none !important;
        }

        .neon-login-btn{
          background:linear-gradient(45deg, #ff0066, #ff00cc) !important;
          border:none !important;
          color:white !important;
        }

        .carousel-btn{
  width:55px;
  height:55px;
  border:none;
  border-radius:50%;
  background:#ff00cc;
  color:white;
  font-size:1.5rem;
  font-weight:bold;
  transition:.3s;

  box-shadow:
    0 0 15px rgba(255,0,204,.45);
}

        .carousel-btn:hover{
  transform:scale(1.08);

  box-shadow:
    0 0 25px rgba(255,0,204,.75);
}

        .service-card{
          background:rgba(17,17,17,.82);

          border:1px solid #222;

          border-radius:25px;

          padding:25px;

          backdrop-filter:blur(14px);

          transition:.3s;

          box-shadow:
            0 0 20px rgba(255,0,204,.08);
        }

        .service-card:hover{

          transform:translateY(-5px);

          border-color:#ff00cc;

          box-shadow:
            0 0 30px rgba(255,0,204,.25);
        }

        .price-text{
          color:#00ff88;

          font-weight:900;
        }

        .cotizar-btn{
          border:none;

          background:
            linear-gradient(
              45deg,
              #ff0066,
              #ff00cc
            );

          color:white;

          padding:14px 28px;

          border-radius:50px;

          font-weight:700;

          transition:.3s;

          box-shadow:
            0 0 15px rgba(255,0,204,.4);
        }

        .cotizar-btn:hover{

          transform:translateY(-3px);

          box-shadow:
            0 0 25px rgba(255,0,204,.7);
        }

      `}</style>

    </>

  );
}