import React from 'react';
import { useApp } from '../context/AppContext';

export default function CriancaMetasPage() {
  const { metas, toggleMetaFeita, formatarMinutos, tempoDisponivelMinutos, setModalSolicitarOpen, showToast } = useApp();

  const feitas = metas.filter(m => m.feito).length;
  const minutosExtras = feitas * 15;

  const handleSolicitar = () => {
    if (feitas === 0) {
      showToast("Guilherme, cumpra pelo menos uma meta antes de solicitar tempo extra!", "danger");
      return;
    }
    setModalSolicitarOpen(true);
  };

  return (
    <section className="page active">
      <header className="page-header">
        <div>
          <h2>🌟 Minhas Metas & Recompensas</h2>
          <p className="text-muted">Marque as tarefas que você cumpriu para liberar mais tempo de internet!</p>
        </div>
      </header>

      <div className="rewards-layout">
        <div className="card rewards-card">
          <div className="rewards-header">
            <div className="child-avatar large">👦</div>
            <div>
              <h3>Olá, Guilherme! 👋</h3>
              <p className="text-muted">Suas metas são definidas pelos seus pais. Cumpra-as para ganhar tempo extra!</p>
            </div>
          </div>

          <div className="metas-header-row">
            <h4>Metas de hoje para cumprir:</h4>
            <small className="text-muted">Toque no quadrado para marcar ✓</small>
          </div>

          <ul className="metas-list">
            {metas.map((m) => (
              <li key={m.id}>
                <div className="meta-item-left">
                  <div 
                    className={`meta-check ${m.feito ? 'done' : ''}`}
                    onClick={() => toggleMetaFeita(m.id)}
                    title="Toque para marcar como feito"
                  >
                    {m.feito ? '✓' : ''}
                  </div>
                  <span 
                    className="meta-title"
                    style={{
                      textDecoration: m.feito ? 'line-through' : 'none',
                      color: m.feito ? '#94A3B8' : 'inherit'
                    }}
                  >
                    {m.texto}
                  </span>
                </div>
                <span className={`badge-pill ${m.feito ? 'success' : 'warning'}`}>
                  {m.feito ? 'Concluída ✓' : '+15 min'}
                </span>
              </li>
            ))}
          </ul>

          <div className="tempo-extra-box">
            <p className="label">Tempo extra conquistado</p>
            <p className="valor">+ {minutosExtras} minutos</p>
            <p className="hint">
              {feitas > 0 
                ? `🎉 Parabéns, Guilherme! Você já cumpriu ${feitas} de ${metas.length} metas hoje!` 
                : 'Marque suas metas acima para liberar tempo de tela extra.'}
            </p>
            <p className="sub-hint">
              Tempo livre restante hoje: <strong>{formatarMinutos(tempoDisponivelMinutos)}</strong>
            </p>
          </div>

          <button className="btn btn-primary btn-block" onClick={handleSolicitar}>
            🚀 Solicitar liberação de tempo extra aos pais
          </button>
          <p className="text-center text-muted small">
            Seu pai Ricardo receberá a solicitação no app dele na mesma hora.
          </p>
        </div>

        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1rem' }}>Como funciona suas recompensas</h3>
          <ol className="howto-list">
            <li><strong>Tarefas em dia:</strong> Seus pais cadastram tarefas diárias (leitura, escola, arrumar o quarto).</li>
            <li><strong>Marque no app:</strong> Assim que fizer, clique no quadrado verde para confirmar.</li>
            <li><strong>Ganhe bônus:</strong> Cada tarefa concluída adiciona minutos de tempo livre.</li>
            <li><strong>Peça liberação:</strong> Clique no botão azul para pedir autorização ao seu pai.</li>
          </ol>
          <div className="highlight-box">
            <strong>💡 Dica do SafeNet:</strong> Quanto mais responsável você for com suas tarefas de casa e da escola, mais tempo livre você conquista para jogos e vídeos!
          </div>
        </div>
      </div>
    </section>
  );
}
