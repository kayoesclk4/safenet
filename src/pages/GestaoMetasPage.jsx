import React from 'react';
import { useApp } from '../context/AppContext';

export default function GestaoMetasPage() {
  const { metas, setMetaEmEdicao, setModalMetaOpen, excluirMeta } = useApp();

  const handleNovaMeta = () => {
    setMetaEmEdicao(null);
    setModalMetaOpen(true);
  };

  const handleEditarMeta = (m) => {
    setMetaEmEdicao(m);
    setModalMetaOpen(true);
  };

  const feitas = metas.filter(m => m.feito).length;

  return (
    <section className="page active">
      <header className="page-header">
        <div>
          <h2>🎯 Metas e Tarefas do Filho</h2>
          <p className="text-muted">Como pai, cadastre e gerencie as metas que o Guilherme deve cumprir para ganhar tempo de tela</p>
        </div>
        <button className="btn btn-primary" onClick={handleNovaMeta}>
          + Cadastrar nova meta
        </button>
      </header>

      <div className="card meta-info-banner">
        <div className="banner-icon">💡</div>
        <div>
          <strong>Gestão de Recompensas:</strong>
          <p>
            As tarefas cadastradas aqui aparecem automaticamente no aplicativo do Guilherme. Quando ele cumpre uma meta e a marca no app dele, ele ganha bônus e pode solicitar liberação para você na aba <strong>Alertas</strong>.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header-flex">
          <h3 className="card-title">Lista de Metas Cadastradas para o Guilherme</h3>
          <span className={`badge-pill ${feitas === metas.length ? 'success' : 'warning'}`}>
            {feitas} de {metas.length} concluídas
          </span>
        </div>
        <ul className="gestao-metas-list">
          {metas.map((m) => (
            <li key={m.id} className="gestao-meta-item">
              <div className="gestao-meta-left">
                <span style={{ fontSize: '1.4rem' }}>{m.feito ? '✅' : '⏳'}</span>
                <div>
                  <div 
                    className="gestao-meta-title"
                    style={{
                      textDecoration: m.feito ? 'line-through' : 'none',
                      color: m.feito ? '#64748B' : 'inherit'
                    }}
                  >
                    {m.texto}
                  </div>
                  <div className="gestao-meta-sub">
                    Status: <strong className={m.feito ? 'text-success' : ''}>
                      {m.feito ? 'Concluída pelo Guilherme ✓' : 'Ainda não concluída'}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="gestao-meta-actions">
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => handleEditarMeta(m)}
                  title="Editar texto desta meta"
                >
                  ✏️ Editar
                </button>
                <button 
                  className="btn btn-outline btn-danger-text btn-sm"
                  onClick={() => excluirMeta(m.id)}
                  title="Excluir meta"
                >
                  🗑️ Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
