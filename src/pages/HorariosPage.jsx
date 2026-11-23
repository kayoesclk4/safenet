import React from 'react';
import { useApp } from '../context/AppContext';

export default function HorariosPage() {
  const { perfis, togglePerfilAtivo, setPerfilEmEdicao, setModalPerfilOpen } = useApp();

  const handleNovo = () => {
    setPerfilEmEdicao(null);
    setModalPerfilOpen(true);
  };

  const handleEditar = (p) => {
    setPerfilEmEdicao(p);
    setModalPerfilOpen(true);
  };

  return (
    <section className="page active">
      <header className="page-header">
        <div>
          <h2>Horários e Perfis de Acesso</h2>
          <p className="text-muted">Defina horários permitidos e regras de filtragem por período do dia</p>
        </div>
        <button className="btn btn-primary" onClick={handleNovo}>
          + Novo perfil
        </button>
      </header>

      <div className="profiles-list">
        {perfis.map((p) => (
          <div key={p.id} className={`profile-card ${p.tipo}`}>
            <div className="profile-icon">{p.icone}</div>
            <div className="profile-info">
              <h3>{p.nome}</h3>
              <p><strong>{p.horario}</strong> — {p.descricao}</p>
            </div>
            <div className="profile-actions">
              <div 
                className={`toggle ${p.ativo ? 'on' : ''}`}
                onClick={() => togglePerfilAtivo(p.id)}
                title={p.ativo ? 'Desativar perfil' : 'Ativar perfil'}
              />
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => handleEditar(p)}
              >
                ✏️ Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
