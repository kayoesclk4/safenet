import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ModalAuth() {
  const { modalAuth, setModalAuth, showToast } = useApp();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    filhoNome: '',
    filhoIdade: '',
    senha: ''
  });

  if (!modalAuth.open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalAuth({ open: false, mode: 'signup' });
    showToast("Operação concluída com sucesso! Faça login para acessar.", "success");
  };

  return (
    <div className="modal active" onClick={(e) => { if (e.target.classList.contains('modal')) setModalAuth({ open: false, mode: 'signup' }); }}>
      <div className="modal-dialog">
        <div className="modal-header">
          <h3>{modalAuth.mode === 'signup' ? 'Criar Conta Parental' : 'Recuperar Acesso'}</h3>
          <button className="modal-close" onClick={() => setModalAuth({ open: false, mode: 'signup' })}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          {modalAuth.mode === 'signup' ? (
            <div>
              <div className="form-group">
                <label>Nome do Responsável</label>
                <input 
                  type="text" 
                  placeholder="Ex: Ricardo Mazon" 
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required 
                />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required 
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Nome do Filho(a)</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Guilherme" 
                    value={formData.filhoNome}
                    onChange={(e) => setFormData({ ...formData, filhoNome: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Idade</label>
                  <input 
                    type="number" 
                    placeholder="10" 
                    min="4" 
                    max="17" 
                    value={formData.filhoIdade}
                    onChange={(e) => setFormData({ ...formData, filhoIdade: e.target.value })}
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Crie uma Senha</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  required 
                />
              </div>
            </div>
          ) : (
            <div>
              <p className="text-muted small-mb">Digite seu e-mail cadastrado para receber o link de redefinição de senha.</p>
              <div className="form-group">
                <label>Seu e-mail cadastrado</label>
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  defaultValue="ricardo@email.com" 
                  required 
                />
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setModalAuth({ open: false, mode: 'signup' })}>
              Voltar
            </button>
            <button type="submit" className="btn btn-primary">
              {modalAuth.mode === 'signup' ? 'Cadastrar Família' : 'Enviar Instruções'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
