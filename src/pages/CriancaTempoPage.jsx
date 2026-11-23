import React from 'react';
import { useApp } from '../context/AppContext';

export default function CriancaTempoPage() {
  const {
    isBlocked,
    tempoUsadoMinutos,
    limiteTotalMinutos,
    tempoDisponivelMinutos,
    porcentagemUso,
    formatarMinutos
  } = useApp();

  return (
    <section className="page active">
      <header className="page-header">
        <div>
          <h2>⏰ Meu Tempo de Rede</h2>
          <p className="text-muted">Acompanhe quanto tempo você já utilizou hoje no seu Galaxy A54</p>
        </div>
      </header>

      <div className="cards-grid">
        <div className="card">
          <p className="card-label">Status da Conexão</p>
          <p className={`card-value ${isBlocked ? 'danger' : 'success'}`}>
            {isBlocked ? 'Bloqueado' : 'Liberado'}
          </p>
          <p className="card-sub">Aparelho: Galaxy A54</p>
        </div>
        <div className="card">
          <p className="card-label">Tempo Utilizado Hoje</p>
          <p className="card-value primary">{formatarMinutos(tempoUsadoMinutos)}</p>
          <p className="card-sub">Uso monitorado</p>
        </div>
        <div className="card">
          <p className="card-label">Tempo Livre Restante</p>
          <p className="card-value success">{formatarMinutos(tempoDisponivelMinutos)}</p>
          <p className="card-sub">Limite diário: {formatarMinutos(limiteTotalMinutos)}</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 className="card-title">Barra de Consumo do Dia</h3>
        <div className="progress-bar-container large">
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${porcentagemUso}%`,
              background: porcentagemUso > 90 
                ? 'linear-gradient(90deg, #EF4444 0%, #DC2626 100%)' 
                : porcentagemUso > 75 
                ? 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)' 
                : 'linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)' 
            }}
          />
        </div>
        <p className="card-sub text-center" style={{ marginTop: '0.75rem' }}>
          Você já utilizou <strong>{porcentagemUso}%</strong> do seu tempo autorizado para hoje ({formatarMinutos(tempoUsadoMinutos)} de {formatarMinutos(limiteTotalMinutos)}). Restam <strong className="text-success">{formatarMinutos(tempoDisponivelMinutos)}</strong> livres.
        </p>
      </div>
    </section>
  );
}
