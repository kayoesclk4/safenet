import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function RelatorioPage() {
  const { diasSemana, showToast } = useApp();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['Jogos', 'Vídeos', 'Educativo', 'Navegação / Outros'],
          datasets: [{
            label: '% do tempo semanal',
            data: [38, 27, 22, 13],
            backgroundColor: ['#2563EB', '#F59E0B', '#10B981', '#94A3B8'],
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 50,
              ticks: {
                callback: (v) => v + '%',
                font: { family: "'Plus Jakarta Sans', sans-serif" }
              },
              grid: { color: '#F1F5F9' }
            },
            x: {
              grid: { display: false },
              ticks: { font: { family: "'Plus Jakarta Sans', sans-serif" } }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const handleExportPDF = () => {
    const container = document.getElementById('relatorio-export-container');
    showToast('Preparando relatório em PDF...', 'info');

    if (window.html2pdf) {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'SafeNet_Kids_Relatorio_Semanal.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      window.html2pdf().set(opt).from(container).save().then(() => {
        showToast('Relatório PDF gerado e baixado com sucesso!', 'success');
      }).catch((err) => {
        console.warn('Falha no html2pdf, acionando impressão nativa:', err);
        window.print();
      });
    } else {
      window.print();
    }
  };

  return (
    <section className="page active">
      <div id="relatorio-export-container">
        <header className="page-header">
          <div>
            <div className="pdf-only-header">
              <h2>🛡️ SafeNet Kids</h2>
              <p>Relatório Semanal de Proteção Digital • Colégio Dr. Eduardo Virmond Suplicy</p>
            </div>
            <h2>Relatório Semanal</h2>
            <p className="text-muted">Período: 11 a 17 de Novembro de 2026 • Filho monitorado: <strong>Guilherme (10 anos)</strong></p>
          </div>
          <button className="btn btn-primary no-print" onClick={handleExportPDF}>
            📄 Exportar PDF
          </button>
        </header>

        <div className="cards-grid four">
          <div className="card">
            <p className="card-label">Tempo total semanal</p>
            <p className="card-value">14h 20min</p>
            <p className="card-sub text-success">↓ 12% vs. semana anterior</p>
          </div>
          <div className="card">
            <p className="card-label">Média diária</p>
            <p className="card-value">2h 03min</p>
            <p className="card-sub">Meta diária: 3h 00min</p>
          </div>
          <div className="card">
            <p className="card-label">Alertas gerados</p>
            <p className="card-value danger">5</p>
            <p className="card-sub">3 bloqueios • 2 horários</p>
          </div>
          <div className="card">
            <p className="card-label">Metas cumpridas</p>
            <p className="card-value success">9 / 12</p>
            <p className="card-sub">75% de aproveitamento</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '1rem' }}>Distribuição percentual da semana</h3>
            <div className="chart-container">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '1rem' }}>Consumo diário de tempo de tela</h3>
            <ul className="days-list">
              {diasSemana.map((d) => (
                <li key={d.dia}>
                  <div style={{ flex: 1, marginRight: '1.5rem' }}>
                    <strong>{d.dia}</strong>
                    <div className="day-bar" style={{ width: `${d.pct}%` }} />
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{d.tempo}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pdf-footer">
          <hr />
          <p>Relatório gerado automaticamente por <strong>SafeNet Kids</strong> • Projeto Técnico em Desenvolvimento de Sistemas</p>
        </div>
      </div>
    </section>
  );
}
