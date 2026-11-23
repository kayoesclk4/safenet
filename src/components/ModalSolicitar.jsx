import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ModalSolicitar() {
  const { modalSolicitarOpen, setModalSolicitarOpen, solicitarTempoExtra } = useApp();
  const [tempo, setTempo] = useState('15');
  const [motivo, setMotivo] = useState('');

  if (!modalSolicitarOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    solicitarTempoExtra(tempo, motivo);
    setMotivo('');
  };

  return (
    <div className="modal active" onClick={(e) => { if (e.target.classList.contains('modal')) setModalSolicitarOpen(false); }}>
      <div className="modal-dialog">
        <div className="modal-header">
          <h3>🚀 Solicitar Tempo Extra</h3>
          <button className="modal-close" onClick={() => setModalSolicitarOpen(false)}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="text-muted small-mb">
            Você cumpriu suas metas! Escolha quanto tempo deseja pedir para liberar agora:
          </p>
          <div className="time-options">
            <label className="time-radio">
              <input 
                type="radio" 
                name="tempo_solicitado" 
                value="15" 
                checked={tempo === '15'} 
                onChange={(e) => setTempo(e.target.value)} 
              />
              <span>+ 15 min</span>
            </label>
            <label className="time-radio">
              <input 
                type="radio" 
                name="tempo_solicitado" 
                value="30" 
                checked={tempo === '30'} 
                onChange={(e) => setTempo(e.target.value)} 
              />
              <span>+ 30 min</span>
            </label>
            <label className="time-radio">
              <input 
                type="radio" 
                name="tempo_solicitado" 
                value="45" 
                checked={tempo === '45'} 
                onChange={(e) => setTempo(e.target.value)} 
              />
              <span>+ 45 min</span>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="solicitacao-motivo">Para que você vai usar? (opcional)</label>
            <input 
              type="text" 
              id="solicitacao-motivo" 
              placeholder="Ex: Terminar trabalho em grupo, assistir vídeo educativo..." 
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setModalSolicitarOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Enviar aos Pais
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
