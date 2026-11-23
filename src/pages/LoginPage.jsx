import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { loginAs, setModalAuth } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('ricardo@email.com');
  const [senha, setSenha] = useState('123456');
  const [selectedDemo, setSelectedDemo] = useState('parent');

  const handleSelectDemo = (role) => {
    setSelectedDemo(role);
    if (role === 'parent') {
      setEmail('ricardo@email.com');
      setSenha('123456');
      loginAs('parent');
      navigate('/dashboard');
    } else {
      setEmail('guilherme@email.com');
      setSenha('1234');
      loginAs('child');
      navigate('/crianca');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.toLowerCase().includes('guilherme')) {
      loginAs('child');
      navigate('/crianca');
    } else {
      loginAs('parent');
      navigate('/dashboard');
    }
  };

  return (
    <div className="screen-login">
      <div className="login-container">
        <div className="logo-area">
          <div className="logo-icon">🛡️</div>
          <h1>SafeNet Kids</h1>
          <p className="subtitle">Proteção digital inteligente para sua família</p>
        </div>

        {/* Atalhos de Apresentação */}
        <div className="demo-role-selector">
          <p className="demo-label">Escolha o perfil para entrar:</p>
          <div className="demo-buttons">
            <button 
              type="button" 
              className={`btn-demo-pill ${selectedDemo === 'parent' ? 'active' : ''}`}
              onClick={() => handleSelectDemo('parent')}
            >
              👨‍💼 <strong>Pai (Ricardo)</strong>
              <small>ricardo@email.com</small>
            </button>
            <button 
              type="button" 
              className={`btn-demo-pill ${selectedDemo === 'child' ? 'active' : ''}`}
              onClick={() => handleSelectDemo('child')}
            >
              👦 <strong>Filho (Guilherme)</strong>
              <small>guilherme@email.com</small>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="text" 
              id="email" 
              placeholder="seu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input 
              type="password" 
              id="senha" 
              placeholder="••••••••" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            <span>Entrar no Painel</span> ➜
          </button>
          <div className="login-links">
            <button 
              type="button" 
              onClick={() => setModalAuth({ open: true, mode: 'signup' })}
            >
              Criar conta
            </button>
            <span>•</span>
            <button 
              type="button" 
              onClick={() => setModalAuth({ open: true, mode: 'forgot' })}
            >
              Esqueci a senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
