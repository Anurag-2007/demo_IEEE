import { useEffect, useState, useRef } from "react";
import {
  CalendarDays,
  MapPin,
  Users,
  ArrowRight,
} from "lucide-react";
import "./App.css";

function App() {
  const [dark, setDark] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const header = document.getElementById("header");
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      obj.innerHTML = value + (end > 100 ? "+" : "");
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const stats = statsRef.current.querySelectorAll(".stat-card h2");
          stats.forEach((el) => {
            const target = parseInt(el.dataset.target, 10);
            animateValue(el, 0, target, 1800);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header id="header">
        <div className="nav">
          <div className="nav-left">
            <img src="/ieee-logo.png" alt="IEEE Logo" className="nav-logo" />
            <strong>IEEE IIIT Kalyani</strong>
          </div>

          <nav>
            <a href="google.com">Home</a>
            <a href="google.com">Events</a>
            <a href="google.com">Team</a>
            <a href="google.com">Join</a>
          </nav>
        </div>
      </header>

      {/* THEME TOGGLE - below navbar, no emoji */}
      <div className="theme-toggle-fixed">
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={dark}
            onChange={() => setDark(!dark)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo-wrapper">
            <img src="/ieee-logo.png" alt="IEEE Logo" className="hero-logo" />
          </div>

          <div className="badge">Welcome to IEEE IIIT Kalyani</div>

          <h1>
            Innovating Technology,
            <br />
            Inspiring Tomorrow
          </h1>

          <p>
            Join the IEEE Student Chapter at IIIT Kalyani and be part of a
            community dedicated to advancing technology and innovation.
          </p>

          <div className="buttons">
            <button className="btn btn-primary">Explore Events</button>
            <button className="btn btn-outline">Join IEEE</button>
          </div>
        </div>
      </section>

      {/* STATS - card/box style */}
      <section className="stats" ref={statsRef}>
        <div className="stats-grid">
          <div className="stat-card">
            <h2 data-target="500">0+</h2>
            <span>Active Members</span>
          </div>
          <div className="stat-card">
            <h2 data-target="50">0+</h2>
            <span>Events Annually</span>
          </div>
          <div className="stat-card">
            <h2 data-target="10">0+</h2>
            <span>Years Active</span>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="events">
        <div className="events-header">
          <h2>Upcoming Events</h2>
          <p>
            Discover our latest events and workshops designed to enhance your
            skills and network.
          </p>
        </div>

        <div className="event-grid">
          <div className="event-card">
            <h3>Web Development Workshop</h3>
            <p className="event-desc">
              Learn modern web development with React and Next.js
            </p>

            <div className="event-meta">
              <div className="meta-item">
                <CalendarDays className="icon" size={20} strokeWidth={1.8} />
                <span>3/15/2024</span>
              </div>
              <div className="meta-item">
                <MapPin className="icon" size={20} strokeWidth={1.8} />
                <span>IIIT Kalyani</span>
              </div>
              <div className="meta-item">
                <Users className="icon" size={20} strokeWidth={1.8} />
                <span>45 registered</span>
              </div>
            </div>

            <button className="view-details-btn">
              View Details <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>

          <div className="event-card">
            <h3>AI & Machine Learning Seminar</h3>
            <p className="event-desc">
              Exploring the future of AI and its applications
            </p>

            <div className="event-meta">
              <div className="meta-item">
                <CalendarDays className="icon" size={20} strokeWidth={1.8} />
                <span>3/20/2024</span>
              </div>
              <div className="meta-item">
                <MapPin className="icon" size={20} strokeWidth={1.8} />
                <span>Main Auditorium</span>
              </div>
              <div className="meta-item">
                <Users className="icon" size={20} strokeWidth={1.8} />
                <span>78 registered</span>
              </div>
            </div>

            <button className="view-details-btn">
              View Details <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>

          <div className="event-card">
            <h3>Networking Session</h3>
            <p className="event-desc">
              Connect with IEEE professionals and peers
            </p>

            <div className="event-meta">
              <div className="meta-item">
                <CalendarDays className="icon" size={20} strokeWidth={1.8} />
                <span>3/25/2024</span>
              </div>
              <div className="meta-item">
                <MapPin className="icon" size={20} strokeWidth={1.8} />
                <span>Student Center</span>
              </div>
              <div className="meta-item">
                <Users className="icon" size={20} strokeWidth={1.8} />
                <span>92 registered</span>
              </div>
            </div>

            <button className="view-details-btn">
              View Details <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="view-all-wrapper">
          <button className="view-all-btn">View All Events</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        © 2026 IEEE IIIT Kalyani Student Chapter. All rights reserved.
      </footer>
    </>
  );
}

export default App;