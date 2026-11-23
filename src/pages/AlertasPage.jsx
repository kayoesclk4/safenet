import React from 'react';
import { useApp } from '../context/AppContext';

export default function AlertasPage() {
  const { alertas, aprovarSolicitacao, recusarSolicitacao, marcarTodosAlertasLidos } = useApp();

  return (
    <section className="page active">
      <header className="page-header">
        <div>
          <h2>Alertas e Solicitações de Tempo</h2>
          <p className="text-muted">Eventos de segurança, bloqueios e pedidos de tempo enviados pelo Guilherme</p>
        </div>
        <button className="btn btn-outline" onClick={marcarTodosAlertasLidos}>
          Marcar todos como lidos
        </button>
      </header>

      <div className="alerts-list">
        {alertas.map((a) => (
          <div key={a.id} className={`alert-item ${a.tipo}`}>
            <span className="alert-icon">{a.icone}</span>
            <div className="alert-content">
              <h4>{a.titulo}</h4>
              <p>{a.descricao}</p>
              {a.solicitacao && a.solicitacao.pendente && (
                <div className="alert-actions">
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => aprovarSolicitacao(a.id)}
                  >
                    ✓ Aprovar (+{a.solicitacao.tempo} min)
                  </button>
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => recusarSolicitacao(a.id)}
                  >
                    ✕ Recusar
                  </button>
                </div>
              )}
            </div>
            <span className="alert-time">{a.tempo}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
