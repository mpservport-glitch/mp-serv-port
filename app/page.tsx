"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [currentImg, setCurrentImg] = useState(0);

  const images = ["jefferson.webp", "valdemir.webp"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const whatsappLink = "https://wa.me/5581999620635?text=Olá! Gostaria de um orçamento para serviços de portaria e limpeza.";

  // MÁSCARA DE WHATSAPP
  const handleWhatsAppMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }
    e.target.value = value.slice(0, 15);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    setMenuOpen(false); // Fecha o menu mobile ao clicar
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("Enviando...");

    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get('nome'),
      whatsapp: formData.get('whatsapp'),
      servico: formData.get('servico'),
      mensagem: formData.get('mensagem'),
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus("Enviado com sucesso! Verifique seu e-mail.");
        setTimeout(() => { setShowForm(false); setFormStatus(""); }, 3000);
      } else {
        setFormStatus("Erro ao enviar. Tente pelo WhatsApp.");
      }
    } catch (err) {
      setFormStatus("Erro de conexão.");
    }
  };

  return (
    <div style={{ backgroundColor: '#050505', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0, padding: 0, overflowX: 'hidden' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        @keyframes whatsappPulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .whatsapp-float {
          position: fixed; bottom: 25px; right: 25px; background-color: #25d366;
          width: 50px; height: 50px; border-radius: 50%; display: flex;
          align-items: center; justify-content: center; z-index: 4000;
          animation: whatsappPulse 2s infinite; text-decoration: none;
        }
        .input-focus:focus { outline: none; border-color: #3b82f6 !important; box-shadow: 0 0 8px rgba(59, 130, 246, 0.3); }
        .service-card { transition: all 0.3s ease; background: #0d0d0d; padding: 40px; border-radius: 25px; border: 1px solid #1a1a1a; text-align: center; }
        .service-card:hover { border-color: #3b82f6 !important; transform: translateY(-5px); }
        .fade-image { transition: opacity 0.8s ease-in-out; }
        .mobile-nav-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.95); backdrop-filter: blur(10px);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 30px; z-index: 6000; transition: all 0.3s ease;
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 42px !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .grid-layout { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; text-align: center; gap: 40px; }
          .img-container { height: 350px !important; }
        }
      `}} />

      <a href={whatsappLink} target="_blank" className="whatsapp-float">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: '28px' }} />
      </a>

      {/* MENU MOBILE OVERLAY */}
      {menuOpen && (
        <div className="mobile-nav-overlay">
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', color: 'white', fontSize: '40px', cursor: 'pointer' }}>×</button>
          <a href="#sobre" onClick={(e) => handleScroll(e, 'sobre')} style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>QUEM SOMOS</a>
          <a href="#servicos" onClick={(e) => handleScroll(e, 'servicos')} style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>SERVIÇOS</a>
          <button onClick={() => { setShowForm(true); setMenuOpen(false); }} style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}>ORÇAMENTO</button>
        </div>
      )}

      {/* Navegação Principal */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 6%', alignItems: 'center', borderBottom: '1px solid #111', backgroundColor: 'rgba(5, 5, 5, 0.85)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 1500 }}>
        <div style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-1px' }}>MP <span style={{ color: '#3b82f6' }}>SERV PORT</span></div>
        <div className="desktop-nav" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#sobre" onClick={(e) => handleScroll(e, 'sobre')} style={{ color: '#888', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>QUEM SOMOS</a>
          <a href="#servicos" onClick={(e) => handleScroll(e, 'servicos')} style={{ color: '#888', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>SERVIÇOS</a>
          <button onClick={() => setShowForm(true)} style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '10px 22px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>ORÇAMENTO</button>
        </div>
        <div className="mobile-menu-btn" onClick={() => setMenuOpen(true)} style={{ display: 'none', flexDirection: 'column', gap: '5px', cursor: 'pointer', padding: '10px' }}>
          <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></div>
          <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></div>
          <div style={{ width: '25px', height: '2px', backgroundColor: 'white' }}></div>
        </div>
      </nav>

      {/* Hero */}
      <header style={{ textAlign: 'center', padding: '100px 6%', background: 'radial-gradient(circle at center, #1e3a8a12 0%, transparent 80%)' }}>
        <h1 className="hero-title" style={{ fontSize: '65px', fontWeight: '900', marginBottom: '20px', letterSpacing: '-2px', lineHeight: '1.1' }}>Excelência em <br/><span style={{ color: '#3b82f6' }}>Facilities & Portaria.</span></h1>
        <p style={{ color: '#666', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px' }}>Segurança ostensiva e conservação técnica para condomínios e empresas em Pernambuco.</p>
        <button onClick={() => setShowForm(true)} style={{ backgroundColor: '#3b82f6', color: 'white', padding: '20px 45px', borderRadius: '10px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '16px' }}>SOLICITAR ORÇAMENTO</button>
      </header>

      {/* Quem Somos */}
      <section id="sobre" style={{ padding: '100px 6%', backgroundColor: '#080808' }}>
        <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '34px', fontWeight: '900', marginBottom: '25px' }}>Quem <span style={{ color: '#3b82f6' }}>Somos</span></h2>
            <p style={{ color: '#888', lineHeight: '1.8', marginBottom: '20px', fontSize: '16px' }}>
              A <strong>MP SERV PORT</strong> é referência em gestão de serviços terceirizados. Focamos no recrutamento rigoroso e no treinamento contínuo para garantir que cada posto de trabalho reflita nossa cultura de prontidão.
            </p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
              <div style={{ background: '#0d0d0d', padding: '20px', borderRadius: '12px', border: '1px solid #1a1a1a', flex: 1, textAlign: 'center' }}>
                <div style={{ color: '#3b82f6', fontSize: '22px', fontWeight: 'bold' }}>24h</div>
                <div style={{ fontSize: '11px', color: '#444', fontWeight: 'bold', marginTop: '5px' }}>SUPERVISÃO</div>
              </div>
              <div style={{ background: '#0d0d0d', padding: '20px', borderRadius: '12px', border: '1px solid #1a1a1a', flex: 1, textAlign: 'center' }}>
                <div style={{ color: '#3b82f6', fontSize: '22px', fontWeight: 'bold' }}>100%</div>
                <div style={{ fontSize: '11px', color: '#444', fontWeight: 'bold', marginTop: '5px' }}>TREINADOS</div>
              </div>
            </div>
          </div>
          <div className="img-container" style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '25px', overflow: 'hidden', border: '1px solid #222', backgroundColor: '#111' }}>
            <img 
              key={currentImg}
              src={images[currentImg]} 
              className="fade-image"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" style={{ padding: '100px 6%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '32px', fontWeight: '900' }}>Nossas <span style={{ color: '#3b82f6' }}>Soluções</span></h2>
        <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { t: 'Portaria', d: 'Controle de acesso rigoroso com foco em segurança e recepção.' },
            { t: 'Vigia Rondante', d: 'Rondas estratégicas para prevenção de incidentes.' },
            { t: 'Limpeza (ASG)', d: 'Conservação e higienização técnica de áreas comuns.' }
          ].map((s, i) => (
            <div key={i} className="service-card">
              <h3 style={{ color: '#3b82f6', marginBottom: '18px', fontSize: '20px' }}>{s.t}</h3>
              <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6', marginBottom: '30px' }}>{s.d}</p>
              <button onClick={() => setShowForm(true)} style={{ background: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6', padding: '10px 25px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>SOLICITAR</button>
            </div>
          ))}
        </div>
      </section>

      {/* Formulário com Máscara e API */}
      {showForm && (
        <div onClick={() => setShowForm(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(15px)', zIndex: 7000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#0d0d0d', width: '100%', maxWidth: '450px', padding: '40px', borderRadius: '25px', border: '1px solid #222', animation: 'zoomIn 0.3s ease-out' }}>
            <button onClick={() => setShowForm(false)} style={{ float: 'right', background: 'none', border: 'none', color: '#444', fontSize: '30px', cursor: 'pointer' }}>×</button>
            <h2 style={{ color: '#3b82f6', marginBottom: '10px', fontWeight: '900' }}>Orçamento</h2>
            <p style={{ color: '#555', fontSize: '13px', marginBottom: '25px' }}>Retornaremos em instantes via WhatsApp.</p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input name="nome" type="text" required className="input-focus" style={{ padding: '15px', backgroundColor: '#050505', border: '1px solid #222', borderRadius: '10px', color: 'white' }} placeholder="Nome ou Empresa" />
              <input 
                name="whatsapp" 
                type="tel" 
                required 
                onChange={handleWhatsAppMask}
                className="input-focus" 
                style={{ padding: '15px', backgroundColor: '#050505', border: '1px solid #222', borderRadius: '10px', color: 'white' }} 
                placeholder="WhatsApp (DDD) 9xxxx-xxxx" 
              />
              <select name="servico" required className="input-focus" style={{ padding: '15px', backgroundColor: '#050505', border: '1px solid #222', borderRadius: '10px', color: '#777' }}>
                <option value="">Serviço de interesse...</option>
                <option value="Portaria">Portaria</option>
                <option value="Vigia">Vigia</option>
                <option value="Limpeza">Limpeza / ASG</option>
              </select>
              <textarea name="mensagem" rows={3} className="input-focus" style={{ padding: '15px', backgroundColor: '#050505', border: '1px solid #222', borderRadius: '10px', color: 'white', resize: 'none' }} placeholder="O que você precisa?"></textarea>
              <button type="submit" style={{ padding: '18px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>ENVIAR SOLICITAÇÃO</button>
              {formStatus && <p style={{ color: '#3b82f6', textAlign: 'center', fontWeight: 'bold', marginTop: '15px' }}>{formStatus}</p>}
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ padding: '80px 6% 40px', borderTop: '1px solid #111', backgroundColor: '#030303', marginTop: '80px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2.5fr 1.5fr', gap: '60px', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '900', color: 'white', marginBottom: '15px' }}>MP <span style={{ color: '#3b82f6' }}>SERV PORT</span></h2>
            <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.8' }}>Excelência operacional em Recife e região metropolitana.</p>
            <p style={{ color: '#222', fontSize: '12px', marginTop: '20px', fontWeight: 'bold' }}>CNPJ: 62.068.165/0001-52</p>
          </div>
          <div>
            <h3 style={{ fontSize: '14px', color: '#3b82f6', marginBottom: '20px', fontWeight: 'bold' }}>CONTATO</h3>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '10px' }}>📧 mpservport@gmail.com</p>
            <p style={{ color: '#888', fontSize: '14px' }}>📱 (81) 99962-0635</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
