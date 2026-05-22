import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  FaWhatsapp,
  FaInstagram,
  FaUserCircle,
} from "react-icons/fa";

const API_URL = "https://dj-page-backend.onrender.com/api/blog";

export default function Blog() {

  const [blogPosts, setBlogPosts] =
    useState([]);

  useEffect(() => {

    fetch(`${API_URL}/api/blog`)
      .then((res) => res.json())
      .then((data) => {

        setBlogPosts(data);

      });

  }, []);

  return (

    <div
      className="main-bg text-white"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >

      {/* NAVBAR */}
      <nav className="fixed-top navbar-custom">

        <div className="container-fluid px-5 py-3 d-flex align-items-center justify-content-between">

          {/* LOGO */}
          <img
            src="/images/logo.png"
            alt="logo"
            className="navbar-logo"
          />

          {/* MENU */}
          <div className="d-flex align-items-center gap-4">

            <a
              href="/"
              className="nav-link-custom"
            >
              Inicio
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

            <a
              href="/blog"
              className="nav-link-custom active-link"
            >
              Blog
            </a>

            <button className="btn-login">

              <FaUserCircle className="me-2" />

              Usuario

            </button>

          </div>

        </div>

      </nav>

      {/* HERO */}
      <section className="blog-hero">

        <div className="overlay"></div>

        <div className="container position-relative z-2 text-center">

          <h1 className="hero-title">
            BLOG NIGHT EXPERIENCE
          </h1>

          <p className="hero-subtitle">
            Videos, eventos y experiencias
          </p>

        </div>

      </section>

      {/* BLOG POSTS */}
      <section className="py-5">

        <div className="container py-5">

          <h2 className="section-title mb-5">
            Últimos Eventos
          </h2>

          <div className="row g-4">

            {blogPosts.map((post) => (

              <div
                className="col-lg-6"
                key={post._id}
              >

                <div className="video-card">

                  {/* IMAGEN */}
                  {post.image && (

                    <img
                      src={post.image}
                      alt={post.title}
                      className="blog-image"
                    />

                  )}

                  {/* VIDEO */}
                  {post.video && (

                    <video
                      controls
                      className="custom-video"
                    >

                      <source
                        src={post.video}
                        type="video/mp4"
                      />

                    </video>

                  )}

                  <h4 className="mt-4 fw-bold">
                    {post.title}
                  </h4>

                  <p className="text-secondary">
                    {post.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer-section">

        <h2 className="fw-bold">
          DJ NIGHT EXPERIENCE
        </h2>

        <p className="text-secondary mt-3">
          Producción · Música · DJ
        </p>

        <div className="d-flex justify-content-center gap-4 mt-4">

          <a
            href="https://wa.me/5215512345678"
            className="social-icon"
          >
            <FaWhatsapp />
          </a>

          <a
            href="https://instagram.com"
            className="social-icon"
          >
            <FaInstagram />
          </a>

        </div>

      </footer>

      {/* ESTILOS */}
      <style>{`

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
        }

        .active-link{
          color:#ff00cc;
        }

        .btn-login{
          border:1px solid #ff00cc;

          background:rgba(255,0,204,.12);

          color:white;

          padding:12px 24px;

          border-radius:50px;

          box-shadow:
            0 0 10px rgba(255,0,204,.35);
        }

        .blog-hero{
          height:60vh;

          display:flex;

          align-items:center;

          justify-content:center;

          position:relative;

          background-image:
            linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.85)),
            url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1600&auto=format&fit=crop');

          background-size:cover;

          background-position:center;

          overflow:hidden;
        }

        .hero-title{
          font-size:4rem;

          font-weight:900;

          color:#ff00cc;

          text-shadow:
            0 0 20px rgba(255,0,204,.5);
        }

        .hero-subtitle{
          font-size:1.3rem;

          color:#ddd;

          margin-top:20px;
        }

        .section-title{
          text-align:center;

          font-size:3rem;

          font-weight:900;

          color:#ff00cc;
        }

        .video-card{
          background:rgba(17,17,17,.82);

          border:1px solid #222;

          border-radius:25px;

          padding:20px;

          backdrop-filter:blur(14px);

          transition:.3s;

          box-shadow:
            0 0 20px rgba(255,0,204,.12);
        }

        .video-card:hover{
          transform:translateY(-5px);

          border-color:#ff00cc;

          box-shadow:
            0 0 30px rgba(255,0,204,.25);
        }

        .custom-video{
          width:100%;

          height:400px;

          object-fit:cover;

          border-radius:20px;

          background:black;
        }

        .blog-image{
          width:100%;

          height:400px;

          object-fit:cover;

          border-radius:20px;

          margin-bottom:20px;
        }

        .footer-section{
          text-align:center;

          padding:60px 20px;

          border-top:1px solid #222;

          background:rgba(0,0,0,.75);

          backdrop-filter:blur(10px);
        }

        .social-icon{
          width:55px;

          height:55px;

          border-radius:50%;

          display:flex;

          align-items:center;

          justify-content:center;

          text-decoration:none;

          color:white;

          font-size:1.3rem;

          background:rgba(255,255,255,.08);

          transition:.3s;
        }

        .social-icon:hover{
          background:#ff00cc;

          transform:translateY(-5px);

          box-shadow:
            0 0 20px rgba(255,0,204,.45);
        }

        @media(max-width:768px){

          .hero-title{
            font-size:2.5rem;
          }

          .hero-subtitle{
            font-size:1rem;
          }

          .custom-video,
          .blog-image{
            height:250px;
          }

          .navbar-logo{
            height:55px;
          }

        }

      `}</style>

    </div>

  );
}