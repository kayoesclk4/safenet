import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function ModalPerfil() {
  const { modalPerfilOpen, setModalPerfilOpen, perfilEmEdicao, salvarPerfil, excluirPerfil } = useApp();

  const [nome, setNome] = useState('');
  const [icone, setIcone] = useState('🎯');
  const [tipo, setTipo] = useState('livre');
  const [horario, setHorario] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (perfilEmEdicao) {
      setNome(perfilEmEdicao.nome || '');
      setIcone(perfilEmEdicao.icone || '⏰');
      setTipo(perfilEmEdicao.tipo || 'livre');
      setHorario(perfilEmEdicao.horario || '');
      setDescricao(perfilEmEdicao.descricao || '');
    } else {
      setNome('');
      setIcone('🎯');
      setTipo('livre');
      setHorario('');
      setDescricao('');
    }
  }, [perfilEmEdicao, modalPerfilOpen]);

  if (!modalPerfilOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    salvarPerfil({
      id: perfilEmEdicao ? perfilEmEdicao.id : null,
      nome,
      icone,
      tipo,
      horario,
      descricao
    });
  };

  return (
    <div className="modal active" onClick={(e) => { if (e.target.classList.contains('modal')) setModalPerfilOpen(false); }}>
      <div className="modal-dialog">
        <div className="modal-header">
          <h3>{perfilEmEdicao ? 'Editar Perfil de Horário' : 'Criar Novo Perfil de Horário'}</h3>
          <button className="modal-close" onClick={() => setModalPerfilOpen(false)}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="perfil-nome">Nome do Perfil</label>
            <input 
              type="text" 
              id="perfil-nome" 
              placeholder="Ex: Horário de Estudos" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required 
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="perfil-icone">Ícone / Emoji</label>
              <input 
                type="text" 
                id="perfil-icone" 
                placeholder="📚" 
                maxLength="4" 
                value={icone}
                onChange={(e) => setIcone(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="perfil-tipo">Categoria / Estilo</label>
              <select 
                id="perfil-tipo" 
                className="form-select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="estudos">Estudos (Verde)</option>
                <option value="livre">Livre (Azul)</option>
                <option value="dormir">Dormir (Roxo)</option>
                <option value="critico">Restrito (Vermelho)</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="perfil-horario">Faixa de Horário</label>
            <input 
              type="text" 
              id="perfil-horario" 
              placeholder="Ex: 14h – 17h ou Após 21h" 
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="perfil-descricao">Regras e Descrição</label>
            <textarea 
              id="perfil-descricao" 
              rows="2" 
              placeholder="Ex: Bloqueia jogos e redes sociais, libera sites de pesquisa." 
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required 
            />
          </div>
          <div className="modal-actions">
            {perfilEmEdicao && (
              <button 
                type="button" 
                className="btn btn-outline btn-danger-text" 
                onClick={() => excluirPerfil(perfilEmEdicao.id)}
              >
                Excluir
              </button>
            )}
            <div className="modal-actions-right">
              <button type="button" className="btn btn-outline" onClick={() => setModalPerfilOpen(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Salvar Perfil
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
