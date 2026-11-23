import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function DashboardPage() {
  const {
    isBlocked,
    toggleBloqueio,
    tempoUsadoMinutos,
    limiteTotalMinutos,
    tempoDisponivelMinutos,
    porcentagemUso,
    tempoExtraAprovadoMinutos,
    formatarMinutos,
    atividades,
    alertas,
    metas
  } = useApp();

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Jogos (40%)', 'Vídeos (30%)', 'Educativo (20%)', 'Outros (10%)'],
          datasets: [{
            data: [40, 30, 20, 10],
            backgroundColor: ['#2563EB', '#F59E0B', '#10B981', '#94A3B8'],
            borderWidth: 0,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 16,
                usePointStyle: true,
                font: { family: "'Plus Jakarta Sans', sans-serif", size: 12 }
              }
            }
          },
          cutout: '68%'
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const alertasPendentes = alertas.filter(a => !a.lido).length;
  const metasFeitas = metas.filter(m => m.feito).length;

  const getProgressBarBackground = () => {
    if (porcentagemUso > 90) return 'linear-gradient(90deg, #EF4444 0%, #DC2626 100%)';
    if (porcentagemUso > 75) return 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)';
    return 'linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)';
  };

  return (
    <section className="page active">
      <header className="page-header">
        <div>
          <h2>Olá, Ricardo 👋</h2>
          <p className="text-muted">Visão geral do consumo digital do Guilherme em tempo real</p>
        </div>
        <div className="header-actions">
          <button 
            className={`btn btn-outline ${isBlocked ? 'btn-danger-text' : ''}`}
            onClick={toggleBloqueio}
          >
            <span>{isBlocked ? '🟢' : '🚫'}</span>
            <span>{isBlocked ? 'Liberar acesso' : 'Bloquear agora'}</span>
          </button>
        </div>
      </header>

      {/* Cards de resumo */}
      <div className="cards-grid">
        <div className="card child-card">
          <div className="child-info">
            <div className="child-avatar">👦</div>
            <div>
              <h3>Guilherme</h3>
              <span className={`status ${isBlocked ? 'blocked' : 'online'}`}>
                <span className="status-dot"></span> 
                {isBlocked ? 'Dispositivo bloqueado' : 'Online agora'}
              </span>
            </div>
          </div>
          <p className="child-age">10 anos • Dispositivo: <strong>Galaxy A54</strong></p>
        </div>

        {/* Card de Tempo de Tela */}
        <div className="card card-progress">
          <p className="card-label">Tempo de tela hoje</p>
          <div className="card-value-row">
            <p className="card-value primary">{formatarMinutos(tempoUsadoMinutos)}</p>
            <span className="badge-disponivel">{formatarMinutos(tempoDisponivelMinutos)} livres</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${porcentagemUso}%`, background: getProgressBarBackground() }}
            />
          </div>
          <p className="card-sub">
            Limite diário: <strong>{formatarMinutos(limiteTotalMinutos)}</strong> ({porcentagemUso}%) • Disponível: <strong className="text-success">{formatarMinutos(tempoDisponivelMinutos)}</strong>
            {tempoExtraAprovadoMinutos > 0 && (
              <span className="badge-bonus">+{tempoExtraAprovadoMinutos}m bônus</span>
            )}
          </p>
        </div>

        <div className="card">
          <p className="card-label">Alertas pendentes</p>
          <p className="card-value danger">{alertasPendentes}</p>
          <p className="card-sub">1 site bloqueado • 1 fora do horário</p>
        </div>

        <div className="card">
          <p className="card-label">Metas do Guilherme</p>
          <p className="card-value success">{metasFeitas} / {metas.length}</p>
          <p className="card-sub">Guilherme cumpriu {metasFeitas} tarefas hoje</p>
        </div>
      </div>

      {/* Gráfico + Atividades */}
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header-flex">
            <h3 className="card-title">Uso por categoria</h3>
            <span className="card-badge">Hoje</span>
          </div>
          <div className="chart-container">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>

        <div className="card">
          <div className="card-header-flex">
            <h3 className="card-title">Atividades recentes</h3>
            <span className="card-badge info">Ao vivo</span>
          </div>
          <ul className="activity-list">
            {atividades.map((a) => (
              <li key={a.id}>
                <span className="activity-icon">{a.icon}</span>
                <span>{a.texto}</span>
                <span className="activity-time">{a.tempo}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
