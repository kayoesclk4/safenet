import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Layout({ children }) {
  const { currentUser, logout, alertas } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const alertasPendentes = alertas.filter(a => !a.lido).length;

  return (
    <div className="screen-app">
      {/* Overlay móvel */}
      <div 
        className={`sidebar-backdrop ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div>
            <div className="logo-icon small">🛡️</div>
            <span>SafeNet Kids</span>
          </div>
          <button 
            className="btn-close-sidebar" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          {currentUser.role === 'parent' ? (
            <div className="nav-role-group">
              <div className="nav-section-label">PAINEL DOS PAIS</div>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">📊</span>
                <span className="nav-text">Dashboard</span>
              </NavLink>
              <NavLink 
                to="/horarios" 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">⏰</span>
                <span className="nav-text">Horários e Perfis</span>
              </NavLink>
              <NavLink 
                to="/gestao-metas" 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">🎯</span>
                <span className="nav-text">Metas do Filho</span>
              </NavLink>
              <NavLink 
                to="/alertas" 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">🔔</span>
                <span className="nav-text">Alertas</span>
                {alertasPendentes > 0 && (
                  <span className="badge">{alertasPendentes}</span>
                )}
              </NavLink>
              <NavLink 
                to="/relatorio" 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">📈</span>
                <span className="nav-text">Relatório Semanal</span>
              </NavLink>
            </div>
          ) : (
            <div className="nav-role-group">
              <div className="nav-section-label">ESPAÇO DA CRIANÇA</div>
              <NavLink 
                to="/crianca" 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">🌟</span>
                <span className="nav-text">Minhas Metas</span>
              </NavLink>
              <NavLink 
                to="/tempo-crianca" 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-icon">⏰</span>
                <span className="nav-text">Meu Tempo de Rede</span>
              </NavLink>
            </div>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">{currentUser.avatar}</div>
            <div className="user-details">
              <strong>{currentUser.name}</strong>
              <small>{currentUser.title}</small>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Sair da conta
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-content">
        <div className="mobile-topbar">
          <button 
            className="btn-menu" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            ☰
          </button>
          <div className="mobile-logo">
            <span>🛡️ SafeNet Kids</span>
          </div>
          <div className="avatar small">{currentUser.avatar}</div>
        </div>

        {children}
      </main>
    </div>
  );
}
