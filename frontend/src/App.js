import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import KashmirSuperDeluxe from "@/pages/KashmirSuperDeluxe";

const Home = () => (
  <div className="App">
    <header className="App-header">
      <a
        className="App-link"
        href="https://emergent.sh"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          alt="logo"
          src="https://avatars.githubusercontent.com/in/1201222?s=120&u=2686cf91179bbafbc7a71bfbc43004cf9ae1acea&v=4"
        />
      </a>
      <p className="mt-5">Building something incredible ~!</p>
    </header>
  </div>
);

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kashmir-super-deluxe" element={<KashmirSuperDeluxe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
