import { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

  import {
    FaWhatsapp,
    FaInstagram,
    FaUserCircle,
    FaMusic,
    FaStar,
    FaCalendarAlt

  } from "react-icons/fa";

  import {
    Modal,
    Button,
    Form,
    Tabs,
    Tab,
  } from "react-bootstrap";

const API_URL = "https://dj-page-backend.onrender.com";

  export default function App() {

    const audioRef = useRef(null);

    /* LOGIN */
    const [showModal, setShowModal] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [currentUser, setCurrentUser] = useState("Usuario");

    const [showUserMenu, setShowUserMenu] = useState(false);

  /* DATOS REGISTRO */
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* DATOS LOGIN */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

    /* RESEÑAS */
const [reviews, setReviews] =
  useState([]);

/* PRODUCTOS */
const [products, setProducts] =
  useState([]);

/* BLOG */
const [blogPosts, setBlogPosts] =
  useState([]);

const [blogTitle, setBlogTitle] =
  useState("");

const [blogDescription,
setBlogDescription] =
  useState("");

const [blogImage, setBlogImage] =
  useState("");

const [blogVideo, setBlogVideo] =
  useState("");


/* NUEVA RESEÑA */
const [newReview, setNewReview] =
  useState("");

  /*Calendario */

  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [date, setDate] = useState(new Date());

/* MODAL COTIZACIÓN */

const [showQuoteModal, setShowQuoteModal] = useState(false);


  const [quoteData, setQuoteData] = useState({
    fecha: "",
    tipoEvento: "",
    lugar: "",
    horas: "",
    personas: "",
    direccion: "",
    servicio: "",
  });
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const playMusic = () => {
      audioRef.current.play();
    };

    useEffect(() => {

      const savedUser = JSON.parse(
        localStorage.getItem("loggedUser")
      );

      if (savedUser) {

        setIsLoggedIn(true);

        setCurrentUser(savedUser.name);

      }

    }, []);

    

    useEffect(() => {

      fetch(`${API_URL}/api/reviews`)
        .then((res) => res.json())
        .then((data) => {

          setReviews(data);

        });

    }, []);

    useEffect(() => {

      fetch(`${API_URL}/api/products`)
        .then((res) => res.json())
        .then((data) => {

          setProducts(data);

        });

    }, []);

    


    /* AGREGAR RESEÑA */
    const addReview = async () => {

      if (!isLoggedIn) {
        setShowModal(true);
        return;
      }

      if (!newReview) return;

      try {

        const response = await fetch(
          `${API_URL}/api/reviews`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              user: currentUser,
              text: newReview,
            }),
          }
        );

        const data = await response.json();

        setReviews([data, ...reviews]);

        setNewReview("");

      } catch (error) {

        console.log(error);

      }

    };

    const sendQuoteToWhatsApp = () => {

    let extra = 0;

    const personas = parseInt(quoteData.personas);

    if (personas >= 100 && personas < 200) {
      extra = 3000;
    } else if (personas >= 200 && personas < 300) {
      extra = 5500;
    } else if (personas >= 300) {
      extra = 7500;
    }

    const mensaje = `
  🎧 COTIZACIÓN DJ

  📅 Fecha: ${quoteData.fecha}

  🎉 Tipo de evento: ${quoteData.tipoEvento}

  🏠 Lugar: ${quoteData.lugar}

  ⏰ Horas: ${quoteData.horas}

  👥 Personas: ${quoteData.personas}

  📍 Dirección: ${quoteData.direccion}

  🔥 Servicio: ${quoteData.servicio}

  💰 Cargo adicional: $${extra} MXN
    `;

    const url = `https://wa.me/5543804539?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  };

    return (
      <div
        className="main-bg text-white overflow-hidden"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >

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
                href="#servicios"
                className="nav-link-custom"
              >
                Servicios
              </a>

            <a
  href="/blog"
  className="nav-link-custom"
>
  Blog
</a>

            <a
    href="/catalogo"
    className="nav-link-custom"
  >
    Catálogo
  </a>

  <a
    href="/carrito"
    className="nav-link-custom"
  >
    Carrito
  </a>

              {/* LOGIN BUTTON */}
            <div className="position-relative">

  <button
    className="btn-login"
    onClick={() => {

      if (!isLoggedIn) {
        handleShow();
      } else {
        setShowUserMenu(!showUserMenu);
      }

    }}
  >
    <FaUserCircle className="me-2" />

    {isLoggedIn ? currentUser : "Iniciar Sesión"}

  </button>

  {/* MENU USUARIO */}
  {/* MENU USUARIO */}
{isLoggedIn && showUserMenu && (

  <div className="user-menu">

    {/* ADMIN */}
    {JSON.parse(localStorage.getItem("loggedUser"))?.role === "admin" && (

      <button
        className="logout-btn mb-2"
        onClick={() => {

          window.location.href = "/admin";

        }}
      >
        Administración
      </button>

    )}

    {/* LOGOUT */}
    <button
      className="logout-btn"
      onClick={() => {

        setIsLoggedIn(false);

        setCurrentUser("Usuario");

        setShowUserMenu(false);

        localStorage.removeItem("loggedUser");

        localStorage.removeItem("token");

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

        {/* HERO */}
        <section
          className="hero-section d-flex align-items-center justify-content-center text-center position-relative"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,.72), rgba(0,0,0,.88)),
              url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1600&auto=format&fit=crop')
            `,
          }}
        >

          {/* EFECTOS NEON */}
          <div className="neon-circle neon-one"></div>
          <div className="neon-circle neon-two"></div>
          <div className="neon-circle neon-three"></div>

          {/* AUDIO */}
          <audio ref={audioRef} loop>
            <source src="/djmusic.mp3" type="audio/mpeg" />
          </audio>

          {/* MUSIC BUTTON */}
          <button onClick={playMusic} className="music-btn">
            <FaMusic className="me-2" />
            Activar Música
          </button>

          {/* CONTENT */}
          <div className="container hero-content position-relative z-2">

            <img
              src="/images/logo.png"
              alt="DJ"
              className="img-fluid hero-logo"
            />

            <p className="hero-text mt-4">
              Producción, música y DJ para eventos inolvidables
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-4 mt-5">

              <a
                href="https://wa.me/5543804539"
                className="hero-btn whatsapp-btn"
              >
                <FaWhatsapp className="me-2" />
                Whatsapp
              </a>

              <a
                href="https://instagram.com"
                className="hero-btn instagram-btn"
              >
                <FaInstagram className="me-2" />
                Instagram
              </a>

            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="py-5">

          <div className="container py-5">

            <h2 className="section-title">
              Servicios y Productos
            </h2>

            <div className="row g-4 mt-5">

      {/* CARD 1 */}
      <div className="col-md-6">

        <div className="service-card">

          <h3 className="fw-bold mb-3">
            Servicio DJ
          </h3>

          <h1 className="price-text">
            $5,500 MXN
          </h1>

          <ul className="list-unstyled mt-4 text-secondary">
            <li>✔ Bocina</li>
            <li>✔ Cabina</li>
            <li>✔ Luces</li>
            <li>✔ 5 Horas</li>
            <li>✔ Hora extra $1,200</li>
          </ul>

          <button
            className="cotizar-btn"
            onClick={() => {

              setQuoteData({
                ...quoteData,
                servicio: "Servicio DJ",
              });

              setShowQuoteModal(true);

            }}
          >
            Cotizar
          </button>

        </div>
      </div>

      {/* CARD 2 */}
      <div className="col-md-6">

        <div className="service-card">

          <h3 className="fw-bold mb-3">
            Premium Experience
          </h3>

          <h1 className="price-text">
            $7,500 MXN
          </h1>

          <ul className="list-unstyled mt-4 text-secondary">
            <li>✔ Pirotecnia</li>
            <li>✔ CO2</li>
            <li>✔ Humo</li>
            <li>✔ Lasers</li>
            <li>✔ Cabezas robóticas</li>
          </ul>

          <button
            className="cotizar-btn"
            onClick={() => {

              setQuoteData({
                ...quoteData,
                servicio: "Premium Experience",
              });

              setShowQuoteModal(true);

            }}
          >
            Cotizar
          </button>

        </div>
      </div>

    </div>
          </div>
        </section>

        

        {/* RESEÑAS */}
        <section id="reseñas" className="py-5">

          <div className="container py-5">

            <h2 className="section-title">
              Reseñas
            </h2>

            {/* FORMULARIO */}
            <div className="review-form mb-5">

              <textarea
                rows="1"
                placeholder={
                  isLoggedIn
                    ? "Escribe tu reseña..."
                    : "Inicia sesión para escribir una reseña"
                }
                className="custom-input"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />

              <button
                className="submit-btn mt-3"
                onClick={addReview}
              >
                Publicar Reseña
              </button>

            </div>

  {/* GOOGLE REVIEWS */}

  <div
    className="text-center mb-5"
  >

    <h4 className="mb-3 fw-bold">
      Reseñas en Google
    </h4>

    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">

      <div className="text-warning">

        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />

      </div>

      <span className="text-secondary">
        5.0 · Basado en Google Business
      </span>

    </div>

    <a
      href="https://g.page/r/TU_LINK_DE_GOOGLE/review"
      target="_blank"
      className="hero-btn whatsapp-btn"
    >
      Dejar reseña en Google
    </a>

  </div>


            {/* LISTA */}
            
          <div className="review-list">

    {reviews.map((review, index) => (

      <div
        className="review-box"
        key={index}
      >

        {/* HEADER */}
        <div className="d-flex align-items-center gap-3 mb-3">

          <div className="review-avatar-small">
            {review.user.charAt(0)}
          </div>

          <h6 className="mb-0 fw-bold">
            {review.user}
          </h6>

        </div>

        {/* TEXTO */}
        <p className="review-text-small mb-0">
          {review.text}
        </p>

      </div>

    ))}

  </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer-section">

          <h2 className="fw-bold text-uppercase">
            DJ NIGHT EXPERIENCE
          </h2>

          <p className="text-secondary mt-3">
            Producción · Música · DJ
          </p>

        </footer>

        {/* BOTÓN CALENDARIO */}
{/* BOTÓN CALENDARIO */}
<button
  className="calendar-float border-0"
  onClick={() => setShowCalendarModal(true)}
>
  <FaCalendarAlt />
</button>

{/* WHATSAPP FLOAT */}
<a
  href="https://wa.me/5543804539"
  className="whatsapp-float"
>
  <FaWhatsapp />
</a>

        {/* MODAL LOGIN / REGISTER */}

{/* MODAL CALENDARIO */}
<Modal
  show={showCalendarModal}
  onHide={() => setShowCalendarModal(false)}
  centered
>
  <Modal.Body className="neon-modal text-white p-4 rounded-4">

    <h2 className="text-center fw-bold mb-4">
      Calendario
    </h2>

    <div className="calendar-container">

      <Calendar
        onChange={setDate}
        value={date}
      />

    </div>

  </Modal.Body>
</Modal>
        <Modal
          show={showModal}
          onHide={handleClose}
          centered
        >

          <Modal.Body className="neon-modal text-white p-4 rounded-4">

            <Tabs
              defaultActiveKey="login"
              className="mb-4"
              justify
            >

              {/* LOGIN */}
              <Tab eventKey="login" title="Iniciar Sesión">

                <Form className="d-flex flex-column gap-3 mt-3">

                <Form.Control
    type="email"
    placeholder="Correo electrónico"
    value={loginEmail}
    onChange={(e) =>
      setLoginEmail(e.target.value)
    }
  />

  <Form.Control
    type="password"
    placeholder="Contraseña"
    value={loginPassword}
    onChange={(e) =>
      setLoginPassword(e.target.value)
    }
  />

  <Button
    type="button"
    className="neon-login-btn rounded-pill fw-bold py-3"
    onClick={async () => {

      try {

        const response = await fetch(
          `${API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: loginEmail,
              password: loginPassword,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }

        setIsLoggedIn(true);

        setCurrentUser(data.user.name);

        localStorage.setItem(
          "loggedUser",
          JSON.stringify({
            _id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
          })
        );

        localStorage.setItem("token", data.token);

        handleClose();

      } catch (error) {

        console.log(error);

        alert("Error del servidor");

      }

    }}
  >
    Entrar
  </Button>
                </Form>

              </Tab>

              {/* REGISTER */}
              <Tab eventKey="register" title="Registrarse">
                <Form className="d-flex flex-column gap-3 mt-3">

                 <Form.Control
  type="text"
  placeholder="Nombre completo"
  value={registerName}
  onChange={(e) =>
    setRegisterName(e.target.value)
  }
/>

                  <Form.Control
  type="email"
  placeholder="Correo electrónico/Número"
  value={registerEmail}
  onChange={(e) =>
    setRegisterEmail(e.target.value)
  }
/>

                  <Form.Control
  type="password"
  placeholder="Contraseña"
  value={registerPassword}
  onChange={(e) =>
    setRegisterPassword(e.target.value)
  }
/>

                  <Form.Control
  type="password"
  placeholder="Confirmar contraseña"
  value={confirmPassword}
  onChange={(e) =>
    setConfirmPassword(e.target.value)
  }
/>
                  <Button
  type="button"
  className="neon-register-btn rounded-pill fw-bold py-3"
  onClick={async () => {

    if (registerPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: registerName,
            email: registerEmail,
            password: registerPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setIsLoggedIn(true);

      setCurrentUser(data.user.name);

      localStorage.setItem(
        "loggedUser",
        JSON.stringify({
          _id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        })
      );

      localStorage.setItem("token", data.token);

      handleClose();

      alert("Cuenta creada correctamente");

    } catch (error) {

      console.log(error);

      alert("Error del servidor");

    }

  }}
>
  Crear Cuenta
</Button>

                </Form>

              </Tab>

            </Tabs>

          </Modal.Body>

        </Modal>

        {/* ESTILOS */}
        <style>{`



.user-menu{
  position:absolute;
  top:75px;
  right:0;

  background:rgba(15,15,25,.96);

  border:1px solid rgba(255,0,204,.35);

  border-radius:18px;

  padding:10px;

  min-width:200px;

  backdrop-filter:blur(16px);

  box-shadow:
    0 0 20px rgba(255,0,204,.35),
    0 0 35px rgba(0,255,255,.12);

  z-index:9999;
}

.logout-btn{
  width:100%;

  border:none;

  background:transparent;

  color:white;

  padding:12px 18px;

  border-radius:12px;

  font-weight:600;

  transition:.3s;
}

.logout-btn:hover{
  background:#ff0066;

  box-shadow:
    0 0 15px rgba(255,0,102,.45);
}

  .review-list{
    display:flex;
    flex-direction:column;
    gap:20px;
  }

  .review-box{
    background:rgba(17,17,17,.85);
    border:1px solid rgba(255,255,255,.08);
    border-radius:22px;
    padding:22px;

    backdrop-filter:blur(14px);

    transition:.3s;

    box-shadow:
      0 0 20px rgba(255,0,204,.08);
  }

  .review-box:hover{
    transform:translateY(-3px);

    border-color:#ff00cc;

    box-shadow:
      0 0 25px rgba(255,0,204,.25);
  }

  .review-avatar-small{
    width:50px;
    height:50px;
    border-radius:50%;

    background:linear-gradient(45deg,#ff00cc,#00ffff);

    display:flex;
    align-items:center;
    justify-content:center;

    font-weight:800;
    color:white;
    font-size:1.1rem;

    box-shadow:
      0 0 15px rgba(255,0,204,.4);
  }

  .review-text-small{
    color:#ddd;
    line-height:1.7;
    font-size:1rem;
  }

          body{
            background:black;
          }

          .main-bg{
            min-height:100vh;
            background:
              radial-gradient(circle at top left, rgba(255,0,204,.18), transparent 25%),
              radial-gradient(circle at top right, rgba(0,255,255,.14), transparent 25%),
              radial-gradient(circle at bottom, rgba(255,0,102,.16), transparent 25%),
              #050510;
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

            text-shadow:
              0 0 10px #ff00cc,
              0 0 20px #00ffff;
          }

          .btn-login{
            border:1px solid #ff00cc;
            background:rgba(255,0,204,.12);
            color:white;
            padding:12px 24px;
            border-radius:50px;
            transition:.3s;

            box-shadow:
              0 0 10px rgba(255,0,204,.35),
              0 0 20px rgba(0,255,255,.15);
          }

          .btn-login:hover{
            background:#ff00cc;

            box-shadow:
              0 0 20px #ff00cc,
              0 0 40px #00ffff;
          }

          .hero-section{
            min-height:100vh;
            position:relative;
            overflow:hidden;
            background-size:cover;
            background-position:center;
          }

          .hero-content{
            max-width:700px;
          }

          .hero-logo{
            width:350px;
            max-width:85%;

            filter:
              drop-shadow(0 0 20px #ff00cc)
              drop-shadow(0 0 45px #00ffff);
          }

          .hero-text{
            font-size:1.5rem;
            color:#ddd;
          }

          .hero-btn{
            padding:15px 30px;
            border-radius:50px;
            text-decoration:none;
            font-weight:700;
            transition:.3s;
            border:1px solid rgba(255,255,255,.15);
          }

          .hero-btn:hover{
            transform:translateY(-5px) scale(1.03);
          }

          .whatsapp-btn{
            background:rgba(24,180,91,.15);
            color:white;

            box-shadow:
              0 0 15px rgba(24,180,91,.5);
          }

          .instagram-btn{
            background:rgba(255,255,255,.08);
            color:white;

            box-shadow:
              0 0 15px rgba(255,255,255,.15);
          }

          .service-card,
          .review-card,
          .review-form{
            background:rgba(17,17,17,.82);
            border:1px solid #222;
            border-radius:18px;
            padding:18px;
            backdrop-filter:blur(14px);
            max-width:750px;
            margin:auto;
  }

          .service-card:hover,
          .review-card:hover{
            transform:translateY(-5px);

            border-color:#ff00cc;

            box-shadow:
              0 0 30px rgba(255,0,204,.25);
          }

          .cotizar-btn{
            display:inline-block;
            margin-top:25px;
            padding:12px 28px;
            border-radius:50px;
            background:#18b45b;
            color:white;
            text-decoration:none;
            font-weight:700;
            transition:.3s;

            box-shadow:
              0 0 15px rgba(24,180,91,.5);
          }

          .cotizar-btn:hover{
            background:#1ed66d;
            transform:translateY(-3px);
          }

          .section-title{
            text-align:center;
            font-size:3rem;
            font-weight:900;
            color:#ff00cc;

            text-shadow:
              0 0 20px rgba(255,0,204,.5);
          }

          .price-text{
            color:#00ff88;
            font-weight:900;
          }

        .custom-input{
            width:100%;
            background:#1b1b1b;
            border:1px solid #333;
            color:white;
            border-radius:12px;
            padding:12px;
            min-height:90px;
            outline:none;
            resize:none;
  }

          .custom-input:focus{
            border-color:#ff00cc;

            box-shadow:
              0 0 10px rgba(255,0,204,.35);
          }

          .submit-btn{
            border:none;
            background:#ff00cc;
            color:white;
            padding:14px 24px;
            border-radius:14px;
            font-weight:700;
            transition:.3s;
          }

          .submit-btn:hover{
            background:#d600ad;
            transform:scale(1.02);
          }

          .review-avatar{
            width:55px;
            height:55px;
            border-radius:50%;
            background:#ff00cc;

            display:flex;
            align-items:center;
            justify-content:center;

            font-weight:800;
          }

          .footer-section{
            text-align:center;
            padding:60px 20px;
            border-top:1px solid #222;
            background:rgba(0,0,0,.75);
            backdrop-filter:blur(10px);
          }

          .whatsapp-float{
            position:fixed;
            bottom:25px;
            right:25px;

            width:70px;
            height:70px;

            border-radius:50%;
            background:#18b45b;

            color:white;

            display:flex;
            align-items:center;
            justify-content:center;

            font-size:2rem;

            text-decoration:none;

            z-index:999;

            box-shadow:
              0 0 20px rgba(24,180,91,.45);
          }

          .calendar-float{
  position:fixed;
  bottom:110px;
  right:25px;

  width:70px;
  height:70px;

  border-radius:50%;

  background:#ff00cc;

  color:white;

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:1.8rem;

  text-decoration:none;

  z-index:999;

  box-shadow:
    0 0 20px rgba(255,0,204,.45);

  transition:.3s;
}

.calendar-float:hover{
  transform:scale(1.08);

  box-shadow:
    0 0 30px rgba(255,0,204,.7);
}

          .music-btn{
            position:fixed;
            left:25px;
            bottom:25px;

            z-index:999;

            border:none;

            background:#ff00cc;

            color:white;

            padding:14px 24px;

            border-radius:50px;

            box-shadow:
              0 0 20px rgba(255,0,204,.4);
          }

          .neon-circle{
            position:absolute;
            border-radius:50%;
            filter:blur(90px);
            opacity:.45;
          }

          .neon-one{
            width:300px;
            height:300px;
            background:#ff00cc;
            top:10%;
            left:5%;
            animation:float1 8s ease-in-out infinite alternate;
          }

          .neon-two{
            width:350px;
            height:350px;
            background:#00ffff;
            right:5%;
            top:20%;
            animation:float2 10s ease-in-out infinite alternate;
          }

          .neon-three{
            width:250px;
            height:250px;
            background:#ff0066;
            bottom:10%;
            left:40%;
            animation:float3 12s ease-in-out infinite alternate;
          }

          /* MODAL NEON */

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

          .nav-tabs{
            border:none !important;
          }

          .nav-tabs .nav-link{
            color:white !important;
            border:none !important;
            border-radius:14px !important;
            margin:0 5px;
            background:rgba(255,255,255,.05) !important;
            transition:.3s;
            font-weight:600;
          }

          .nav-tabs .nav-link.active{
            background:#ff00cc !important;

            color:white !important;

            box-shadow:
              0 0 15px rgba(255,0,204,.5),
              0 0 30px rgba(0,255,255,.2);
          }

          .modal .form-control{
            background:rgba(0,0,0,.45) !important;

            border:1px solid rgba(255,255,255,.12) !important;

            color:white !important;

            padding:14px;

            border-radius:14px;
          }

          .modal .form-control::placeholder{
            color:#bbb;
          }

          .modal .form-control:focus{
            border-color:#ff00cc !important;

            box-shadow:
              0 0 12px rgba(255,0,204,.5),
              0 0 20px rgba(0,255,255,.15) !important;

            background:rgba(0,0,0,.6) !important;
          }

          /* BOTONES NEON */

          .neon-login-btn{
            background:linear-gradient(45deg, #ff0066, #ff00cc) !important;
            border:none !important;
            color:white !important;

            box-shadow:
              0 0 15px rgba(255,0,102,.6),
              0 0 35px rgba(255,0,204,.45);

            transition:.3s;
          }

          .neon-login-btn:hover{
            transform:scale(1.03);

            box-shadow:
              0 0 25px rgba(255,0,102,.9),
              0 0 50px rgba(255,0,204,.7);
          }

          .neon-register-btn{
            background:linear-gradient(45deg, #00ffaa, #00ccff) !important;
            border:none !important;
            color:white !important;

            box-shadow:
              0 0 15px rgba(0,255,170,.6),
              0 0 35px rgba(0,204,255,.45);

            transition:.3s;
          }

          .neon-register-btn:hover{
            transform:scale(1.03);

            box-shadow:
              0 0 25px rgba(0,255,170,.9),
              0 0 50px rgba(0,204,255,.7);
          }

          .modal-content{
            background:transparent !important;
            border:none !important;
          }

          @keyframes float1{
            from{
              transform:translateY(0px);
            }
            to{
              transform:translateY(60px);
            }
          }

          @keyframes float2{
            from{
              transform:translateY(0px);
            }
            to{
              transform:translateY(-70px);
            }
          }

          @keyframes float3{
            from{
              transform:translateX(0px);
            }
            to{
              transform:translateX(80px);
            }
          }

          .calendar-container{
  display:flex;
  justify-content:center;
}

.react-calendar{
  width:100%;
  max-width:400px;

  background:rgba(15,15,25,.95);

  border:none;

  border-radius:20px;

  padding:20px;

  color:white;

  box-shadow:
    0 0 20px rgba(255,0,204,.35);
}

.react-calendar button{
  color:white;
  border-radius:12px;
  border:none;
  padding:10px;
}

.react-calendar__tile--active{
  background:#ff00cc !important;
}

.react-calendar__tile:hover{
  background:rgba(255,0,204,.25);
}

.react-calendar__navigation button:hover{
  background:rgba(255,255,255,.08);
}

        `}</style>
            <Modal
          show={showQuoteModal}
          onHide={() => setShowQuoteModal(false)}
          centered
        >

          <Modal.Body className="neon-modal text-white p-4 rounded-4">

            <h2 className="text-center mb-4 fw-bold">
              Cotización
            </h2>

            <Form className="d-flex flex-column gap-3">

              <Form.Control
                type="date"
                onChange={(e) =>
                  setQuoteData({
                    ...quoteData,
                    fecha: e.target.value,
                  })
                }
              />

              <Form.Control
                type="text"
                placeholder="Tipo de evento"
                onChange={(e) =>
                  setQuoteData({
                    ...quoteData,
                    tipoEvento: e.target.value,
                  })
                }
              />

              <Form.Select
                onChange={(e) =>
                  setQuoteData({
                    ...quoteData,
                    lugar: e.target.value,
                  })
                }
              >
                <option>Interior o Exterior</option>
                <option>Interior</option>
                <option>Exterior</option>
              </Form.Select>

              <Form.Control
                type="number"
                placeholder="Cantidad de horas"
                onChange={(e) =>
                  setQuoteData({
                    ...quoteData,
                    horas: e.target.value,
                  })
                }
              />

              <Form.Control
                type="number"
                placeholder="Número de personas"
                onChange={(e) =>
                  setQuoteData({
                    ...quoteData,
                    personas: e.target.value,
                  })
                }
              />

              <small className="text-secondary">
                10 - 100 personas = precio base
                <br />
                100 - 200 = +$3,000
                <br />
                200 - 300 = +$5,500
                <br />
                300+ = +$7,500
              </small>

              <Form.Control
                type="text"
                placeholder="Dirección del evento"
                onChange={(e) =>
                  setQuoteData({
                    ...quoteData,
                    direccion: e.target.value,
                  })
                }
              />

              <Button
                className="neon-login-btn rounded-pill fw-bold py-3 mt-2"
                onClick={sendQuoteToWhatsApp}
              >
                Enviar Cotización
              </Button>

            </Form>

          </Modal.Body>

        </Modal>

      </div>
    );
  }