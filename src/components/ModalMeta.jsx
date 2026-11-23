import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function ModalMeta() {
  const { modalMetaOpen, setModalMetaOpen, metaEmEdicao, salvarMeta, excluirMeta } = useApp();
  const [texto, setTexto] = useState('');

  useEffect(() => {
    if (metaEmEdicao) {
      setTexto(metaEmEdicao.texto || '');
    } else {
      setTexto('');
    }
  }, [metaEmEdicao, modalMetaOpen]);

  if (!modalMetaOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    salvarMeta({
      id: metaEmEdicao ? metaEmEdicao.id : null,
      texto: texto.trim()
    });
  };

  return (
    <div className="modal active" onClick={(e) => { if (e.target.classList.contains('modal')) setModalMetaOpen(false); }}>
      <div className="modal-dialog">
        <div className="modal-header">
          <h3>{metaEmEdicao ? '✏️ Editar Meta do Filho' : '🎯 Cadastrar Meta para o Filho'}</h3>
          <button className="modal-close" onClick={() => setModalMetaOpen(false)}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="meta-texto">Descrição da Tarefa / Meta</label>
            <input 
              type="text" 
              id="meta-texto" 
              placeholder="Ex: Leitura de 20 minutos, Arrumar a cama..." 
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="meta-tempo">Bônus Concedido ao Filho</label>
            <select id="meta-tempo" className="form-select" defaultValue="15">
              <option value="15">+ 15 minutos de tempo extra</option>
              <option value="30">+ 30 minutos de tempo extra</option>
            </select>
          </div>
          <div className="modal-actions">
            {metaEmEdicao && (
              <button 
                type="button" 
                className="btn btn-outline btn-danger-text"
                onClick={() => excluirMeta(metaEmEdicao.id)}
              >
                Excluir Meta
              </button>
            )}
            <div className="modal-actions-right">
              <button type="button" className="btn btn-outline" onClick={() => setModalMetaOpen(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {metaEmEdicao ? 'Salvar Alterações' : 'Cadastrar Meta'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
