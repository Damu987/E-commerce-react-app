import React from "react";
import { Link } from "react-router-dom";
import image2 from "../assets/image2.webp"; 
import "./About.css";
import {
  FiUsers,
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiShield,
  FiZap,
} from "react-icons/fi";

function About() {
  const stats = [
    { icon: <FiShoppingBag />, number: "500+", label: "Products" },
    { icon: <FiUsers />, number: "10k+", label: "Happy Customers" },
    { icon: <FiStar />, number: "4.8", label: "Average Rating" },
    { icon: <FiTruck />, number: "24hr", label: "Fast Delivery" },
  ];

  const values = [
    {
      icon: <FiStar />,
      title: "Quality First",
      desc: "Premium curated products only.",
    },
    {
      icon: <FiShield />,
      title: "Trust & Security",
      desc: "Safe payments & reliable service.",
    },
    {
      icon: <FiZap />,
      title: "Fast Experience",
      desc: "Quick delivery & smooth UI.",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Verma",
      feedback: "Amazing quality and fast delivery!",
    },
    {
      name: "Sneha Patel",
      feedback: "Loved the UI and product quality.",
    },
    {
      name: "Arjun Mehta",
      feedback: "Great support and smooth experience.",
    },
  ];

  return (
    <main className="about-page">

      {/*  Brand Story  */}
      <section className="brand-story">
        <div className="story-left">
          <h1>About LUXE</h1>
          <p>
            LUXE is a premium eCommerce platform delivering curated lifestyle
            products with quality, speed, and trust.
          </p>
        </div>

        <div className="story-right">
          <img src={image2} alt="About LUXE" />
        </div>
      </section>

      {/*  Mission & Vision */}
      <section className="brand-story-deep">
          <h2>Our Journey</h2>
          <p>
            LUXE was born from a simple idea — shopping should not just be about
            buying products, but about experiencing quality, trust, and style.
          </p>
        
          <p>
            What started as a small vision has now grown into a platform trusted
            by thousands. Every product we showcase is carefully selected to
            reflect elegance, durability, and modern lifestyle.
          </p>
        
          <blockquote>
            “We don’t just sell products — we create experiences that stay.”
          </blockquote>
        </section>

      {/* Stats  */}
      <section className="stats-row">
        {stats.map((item, index) => (
          <div key={index} className="stat-card">
            {item.icon}
            <h2>{item.number}</h2>
            <p>{item.label}</p>
          </div>
        ))}
      </section>

      {/*  Values ─ */}
      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          {values.map((val, i) => (
            <div key={i} className="value-card">
              {val.icon}
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials*/}
      <section className="testimonial-section">
        <h2>What Customers Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p>"{t.feedback}"</p>
              <h4>- {t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA  */}
      <section className="cta-section">
        <h2>Start Shopping with LUXE</h2>
        <p>Discover premium products today.</p>
        <Link to="/shop" className="cta-btn">Shop Now</Link>
      </section>
      <section className="closing-section">
          <h2>More Than Just Shopping</h2>
        
          <p>
            At LUXE, we believe shopping is not just a transaction — it’s an
            experience, a feeling, and a connection.
          </p>
        
          <p>
            Thank you for being part of our journey.
          </p>
        </section>

    </main>
  );
}

export default About;