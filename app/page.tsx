"use client";
import React, { useState } from "react";
import { 
  Shield, 
  UserCheck, 
  Building2, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X 
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      title: "Portaria e Controle de Acesso",
      description: "Profissionais treinados para garantir a segurança e organização da entrada e saída de pessoas e veículos.",
      icon: <Shield className="w-8 h-8 text-blue-500" />
    },
    {
      title: "Facilities e Limpeza",
      description: "Equipe especializada em manutenção e higienização para manter seu ambiente impecável.",
      icon: <Building2 className="w-8 h-8 text-blue-500" />
    },
    {
      title: "Zeladoria e Manutenção",
      description: "Suporte preventivo e corretivo para garantir o pleno funcionamento do seu condomínio ou empresa.",
      icon: <UserCheck className="w-8 h-8 text-blue-500" />
    }
  ];

  return (
    <div style={{ backgroundColor: '#050505', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Navegação */}
      <nav style={{ borderBottom: '1px solid #1a1a1a', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>MP SERV PORT</h1>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#servicos" style={{ color: '#9ca3af', textDecoration: 'none' }}>Serviços</a>
          <a href="#contato" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>Contato</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center', background: 'linear-gradient(to bottom, #0a0a0a, #050505)' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Excelência em <span style={{ color: '#3b82f6' }}>Facilities</span> e Portaria</h2>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af', maxWidth: '800px', margin: '0 auto 2rem' }}>
          Soluções inteligentes e profissionais capacitados para o seu condomínio ou empresa. Segurança e eficiência em cada detalhe.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button style={{ backgroundColor: '#3b82f6', color: 'white', padding: '1rem 2rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Solicitar Orçamento
          </button>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" style={{ padding: '5rem 2rem' }}>
        <h3 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Nossos Serviços</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {services.map((s, i) => (
            <div key={i} style={{ backgroundColor: '#0a0a0a', padding: '2rem', borderRadius: '12px', border: '1px solid #1a1a1a' }}>
              <div style={{ marginBottom: '1rem' }}>{s.icon}</div>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{s.title}</h4>
              <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rodapé / Contato */}
      <footer id="contato" style={{ padding: '4rem 2rem', backgroundColor: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '2rem' }}>Fale Conosco</h3>
          <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>Disponível 24h para emergências e suporte.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone className="w-5 h-5 text-blue-500" /> (11) 99999-9999
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin className="w-5 h-5 text-blue-500" /> São Paulo, SP
            </span>
          </div>
          <p style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#4b5563' }}>
            © 2026 MP SERV PORT. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
