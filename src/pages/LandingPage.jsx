import React, { useState } from "react";
import "./LandingPage.css";
import { Mail, Linkedin, Instagram, Menu, X } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import "@lottiefiles/lottie-player";

export default function LandingPage() {
  const team = [
    { name: "Juan Ignacio Castore", role: "CEO", img: "/juani.jpg", linkedin: "https://www.linkedin.com/in/juan-ignacio-castore/" },
    { name: "Camila Cauzzo", role: "COO & CTO", img: "/cami.jpg", linkedin: "https://www.linkedin.com/in/camila-cauzzo-a44936203/" },
    { name: "Joaquín Schanz", role: "CPO", img: "/joaco.jpg", linkedin: "https://www.linkedin.com/in/joaquin-schanz/" },
    { name: "Damasia Bonadeo", role: "Marketing & Brand Designer", img: "/dama.jpg", linkedin: "https://www.linkedin.com/in/damasia-bonadeo-6a6629238/" },
    { name: "Magdalena Rotondaro", role: "Full-Stack Engineer", img: "/magui.jpg", linkedin: "https://www.linkedin.com/in/magdalena-rotondaro-3574622b2/" },
    { name: "Felicitas Ofarrell", role: "AI Specialist", img: "/feli.jpg", linkedin: "https://www.linkedin.com/in/felicitas-ofarrell/" },
  ];

  const { ref: problemRef, inView: problemVisible } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landing-container">
      {/* NAVBAR */}
      <header className="navbar">
        <img src="/Logos-Kora-color.png" alt="KORA logo" className="logo-img" />

        {/* Botón hamburguesa */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links de navegación */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#problem" onClick={() => setMenuOpen(false)}>Problem</a>
          <a href="#solution" onClick={() => setMenuOpen(false)}>Solution</a>
          <a href="#service-model" onClick={() => setMenuOpen(false)}>Service Model</a>
          <a href="#brands" onClick={() => setMenuOpen(false)}>Trusted By</a>
          <a href="#team" onClick={() => setMenuOpen(false)}>Team</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <motion.div
          className="hero-content"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h2>
            Where your company’s knowledge{" "}
            <span className="italic-thin">is never lost.</span>
          </h2>

          <p>
            We transform your team’s know-how into an intelligent, automated 
            onboarding experience — so every new hire becomes productive from day one.
          </p>
          <button className="btn-primary" onClick={() => setModalOpen(true)}>
            Get in touch
          </button>
        </motion.div>

        {/* Animación Lottie */}
        <div className="hero-animation">
          <lottie-player
            src="/Technology.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>

        {/* Modal de contacto */}
        {modalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <motion.div
              className="contact-modal"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Contact Us</h3>

              {!formSent ? (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);

                    const formData = {
                      name: e.target.name.value,
                      email: e.target.email.value,
                      message: e.target.message.value,
                    };

                    try {
                      await fetch(
                        "https://script.google.com/macros/s/AKfycbyyRSFakFNnXSEFMqfCeWJsnDaUwwzetq82tcjX8O4PvkRzPjQ76xCJyxZY8-QVoLMz_Q/exec",
                        {
                          method: "POST",
                          body: JSON.stringify(formData),
                          mode: "no-cors",
                        }
                      );
                      setFormSent(true);
                      e.target.reset();
                    } catch {
                      alert("⚠️ There was a problem sending your message.");
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  <input name="name" type="text" placeholder="Your name" required />
                  <input name="email" type="email" placeholder="Your email" required />
                  <textarea
                    name="message"
                    placeholder="Your message"
                    rows="4"
                    defaultValue="Hello, I’m interested in learning more about KORA and how it could help my team!"
                    required
                  ></textarea>

                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? <span className="spinner"></span> : "Send Message"}
                  </button>
                </form>
              ) : (
                <motion.div
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h4>✅ Message sent successfully!</h4>
                  <p>We’ll contact you shortly.</p>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setFormSent(false);
                      setModalOpen(false);
                    }}
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </section>

      {/* PROBLEM */}
      <motion.section
        id="problem"
        className="section problem-section"
        ref={problemRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h3>The Problem</h3>
        <div className="problem-grid">
          {[45, 60, 5].map((val, i) => (
            <motion.div
              key={i}
              className="problem-card"
              variants={fadeUp}
              transition={{ delay: i * 0.15 }}
            >
              <span className="stat">
                {problemVisible ? <CountUp end={val} duration={1.5} /> : 0}%
              </span>
              <p>
                {i === 0 && "of company knowledge isn’t documented — it leaves when employees do."}
                {i === 1 && "of employees find onboarding confusing, incomplete, or disorganized."}
                {i === 2 && "of revenue is spent on training — not counting lost productivity."}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* SOLUTION */}
      <motion.section
        id="solution"
        className="section solution-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {/* MITAD IZQUIERDA */}
        <div className="solution-left">
          <h3>Our Solution</h3>
          <h4>
            KORA automates knowledge retention and onboarding with a human touch.
          </h4>
          <p className="quote">
            “Technology that understands people.”<br />
            <br />
            Fast, human onboarding that adapts to your company’s culture and grows with your team.
          </p>
        </div>

        {/* MITAD DERECHA */}
        <div className="solution-right">
          {[
            { name: "Observe", text: "Captures real workflows securely and automatically." },
            { name: "Analyze", text: "AI identifies key knowledge, processes and best practices." },
            { name: "Document", text: "Builds a living, searchable knowledge base." },
            { name: "Coach", text: "Provides real-time pop-ups and contextual guidance." },
          ].map((card) => (
            <div className="solution-card" key={card.name}>
              <img
                src={`/${card.name.toLowerCase()}_blue.png`}
                alt={card.name}
                className="solution-icon blue-icon"
                loading="lazy"
              />
              <img
                src={`/${card.name.toLowerCase()}_white.png`}
                alt={`${card.name} white`}
                className="solution-icon white-icon"
                loading="lazy"
              />
              <h5>{card.name}</h5>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SERVICE MODEL */}
      <motion.section
        id="service-model"
        className="section service-section centered"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h3>Our Service Model</h3>
        <p className="service-description">
          KORA operates as a <b>monthly subscription</b> that adapts to your company’s size and
          information flow. Whether you’re a startup or a large enterprise, you only pay for what
          you use — ensuring a scalable, transparent, and flexible experience.
        </p>

        <div className="service-cards">
          {[
            { title: "Small Teams", desc: "Simple setup, fast onboarding.", icon: "/small.png", tier: "small", price: "$5" },
            { title: "Growing Teams", desc: "Guided knowledge capture & insights.", icon: "/medium.png", tier: "medium", price: "$10" },
            { title: "Large Organizations", desc: "Advanced automation & analytics.", icon: "/large.png", tier: "large", price: "$15" },
          ].map((item) => (
            <div className={`service-card ${item.tier}`} key={item.title}>
              <img src={item.icon} alt={item.title} className="service-icon" loading="lazy" />
              <div className="price-tag">
                <span className="amount">{item.price.split(" ")[0]}</span>
                <span className="period">
                  / employee monthly for <b>{item.title.toLowerCase()}</b>
                </span>
              </div>
              <p>{item.desc}</p>
                <button 
                  className="btn-outline" 
                  onClick={() => setModalOpen(true)}
                >
                  Buy Now
                </button>
            </div>
          ))}
        </div>
      </motion.section>

      {/* BRANDS / PARTNERS SECTION */}
      <motion.section
        id="brands"
        className="section brands-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h3>Trusted By</h3>
        <div className="brands-wrapper">
          <div className="brands-slider">
            {/* Logos base */}
            {["nubceo.png", "olympia.png"].map((logo, i) => (
              <img
                key={i}
                src={`/${logo}`}
                alt={`Brand ${i + 1}`}
                className="brand-logo"
                loading="lazy"
              />
            ))}

            {/* 🔁 Duplicaciones automáticas para llenar el loop */}
            {Array(3)
              .fill(null)
              .flatMap(() =>
                ["nubceo.png", "olympia.png"].map((logo, i) => (
                  <img
                    key={`dup-${i}-${Math.random()}`}
                    src={`/${logo}`}
                    alt={`Brand duplicate ${i + 1}`}
                    className="brand-logo"
                    loading="lazy" 
                  />
                ))
              )}
          </div>

          {/* gradientes en los bordes */}
          <div className="fade-left"></div>
          <div className="fade-right"></div>
        </div>
      </motion.section>

      {/* TEAM (nuevo diseño) */}
      <motion.section
        id="team"
        className="section team-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="team-container">
          {/* Left side: title and description */}
          <div className="team-text">
            <h3>Our Team</h3>
            <p>
              We are a multidisciplinary team deeply committed to solving how
              organizations capture and share knowledge.  
              Our mission is to turn experience into progress — empowering every
              employee to learn, grow, and contribute from day one.
            </p>
          </div>

          {/* Right side: photos */}
          <div className="team-photos">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                className="team-photo-card"
                variants={fadeUp}
                transition={{ delay: idx * 0.1 }}
              >
                <img src={member.img} alt={member.name} className="team-photo" loading="lazy" />
                <div className="overlay">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="linkedin-icon-btn"
                  >
                    <Linkedin size={28} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        className="contact-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h3>Let’s talk</h3>
        <p>
          Want to learn more about how KORA can help your team capture knowledge
          and improve onboarding?
        </p>
        <motion.button
          className="btn-primary"
          onClick={() => setModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.button>
        <div className="social-icons">
          <motion.a
            href="https://www.linkedin.com/company/kora-onboarding/?viewAsMember=true"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
          >
            <Linkedin size={28} />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/koraonboarding/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
          >
            <Instagram size={28} />
          </motion.a>
          <motion.a href="https://mail.google.com/mail/?view=cm&to=koraonboarding@gmail.com" whileHover={{ scale: 1.1 }}>
            <Mail size={28} />
          </motion.a>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} KORA — Integrate. Share. Scale.
      </footer>
    </div>
  );
}