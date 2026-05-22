import { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import {
  FaWhatsapp,
  FaInstagram,
  FaUserCircle,
  FaMusic,
  FaStar,
} from "react-icons/fa";

import {
  Modal,
  Button,
  Form,
  Tabs,
  Tab,
} from "react-bootstrap";

export default function Home() {

  const audioRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("Usuario");

  const [reviews, setReviews] = useState([
    {
      name: "Mauricio",
      text: "Excelente ambiente y música brutal 🔥",
    },
    {
      name: "Andrea",
      text: "Las luces y el sonido estuvieron increíbles.",
    },
  ]);

  const [newReview, setNewReview] = useState("");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const playMusic = () => {
    audioRef.current.play();
  };

  const addReview = () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    if (!newReview) return;

    const review = {
      name: currentUser,
      text: newReview,
    };

    setReviews([review, ...reviews]);
    setNewReview("");
  };

  return (
    <div className="main-bg text-white overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif" }}>

      {/* NAVBAR */}
      <nav className="fixed-top navbar-custom">

        <div className="container-fluid px-5 py-3 d-flex align-items-center justify-content-between">

          {/* LOGO */}
          <div>
            <img src="/logo.png" alt="logo" className="navbar-logo" />
          </div>

          {/* MENU */}
          <div className="d-none d-lg-flex align-items-center gap-4">

            <a href="#servicios" className="nav-link-custom">
              Servicios
            </a>

            <a href="#reseñas" className="nav-link-custom">
              Reseñas
            </a>

            {/* 🔥 CATÁLOGO (AQUÍ ESTÁ LA MAGIA) */}
            <Link to="/catalogo" className="nav-link-custom">
              Catálogo
            </Link>

            <button className="btn-login" onClick={handleShow}>
              <FaUserCircle className="me-2" />
              {isLoggedIn ? currentUser : "Iniciar Sesión"}
            </button>

          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section d-flex align-items-center justify-content-center text-center position-relative"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,.72), rgba(0,0,0,.88)),
            url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1600&auto=format&fit=crop')
          `,
        }}>

        <div className="neon-circle neon-one"></div>
        <div className="neon-circle neon-two"></div>
        <div className="neon-circle neon-three"></div>

        <audio ref={audioRef} loop>
          <source src="/djmusic.mp3" type="audio/mpeg" />
        </audio>

        <button onClick={playMusic} className="music-btn">
          <FaMusic className="me-2" />
          Activar Música
        </button>

        <div className="container hero-content position-relative z-2">

          <img src="/logo.png" alt="DJ" className="img-fluid hero-logo" />

          <p className="hero-text mt-4">
            Producción, música y DJ para eventos inolvidables
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-4 mt-5">

            <a href="https://wa.me/5215512345678" className="hero-btn whatsapp-btn">
              <FaWhatsapp className="me-2" />
              Whatsapp
            </a>

            <a href="https://instagram.com" className="hero-btn instagram-btn">
              <FaInstagram className="me-2" />
              Instagram
            </a>

          </div>
        </div>
      </section>

      {/* TODO lo demás queda IGUAL (servicios, reseñas, footer, modal, estilos) */}

      {/* MODAL */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body className="neon-modal text-white p-4 rounded-4">

          <Tabs defaultActiveKey="login" className="mb-4" justify>

            <Tab eventKey="login" title="Iniciar Sesión">
              <Form className="d-flex flex-column gap-3 mt-3">

                <Form.Control type="email" placeholder="Correo electrónico" />
                <Form.Control type="password" placeholder="Contraseña" />

                <Button
                  className="neon-login-btn rounded-pill fw-bold py-3"
                  onClick={() => {
                    setIsLoggedIn(true);
                    setCurrentUser("Mauricio");
                    handleClose();
                  }}
                >
                  Entrar
                </Button>

              </Form>
            </Tab>

            <Tab eventKey="register" title="Registrarse">
              <Form className="d-flex flex-column gap-3 mt-3">

                <Form.Control type="text" placeholder="Nombre completo" />
                <Form.Control type="email" placeholder="Correo electrónico" />
                <Form.Control type="tel" placeholder="Teléfono" />
                <Form.Control type="password" placeholder="Contraseña" />

                <Button
                  className="neon-register-btn rounded-pill fw-bold py-3"
                  onClick={() => {
                    setIsLoggedIn(true);
                    setCurrentUser("Nuevo Usuario");
                    handleClose();
                  }}
                >
                  Crear Cuenta
                </Button>

              </Form>
            </Tab>

          </Tabs>

        </Modal.Body>
      </Modal>

    </div>
  );
}