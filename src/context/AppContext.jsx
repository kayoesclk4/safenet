import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Usuário Atual: 'parent' ou 'child'
  const [currentUser, setCurrentUser] = useState({
    role: 'parent',
    name: 'Ricardo',
    email: 'ricardo@email.com',
    title: 'Pai / Responsável',
    avatar: 'R'
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Controle Dinâmico de Tempo de Tela
  const [tempoUsadoMinutos, setTempoUsadoMinutos] = useState(135); // 2h 15min
  const [limiteBaseMinutos] = useState(180); // 3h 00min
  const [tempoExtraAprovadoMinutos, setTempoExtraAprovadoMinutos] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  // Toast
  const [toast, setToast] = useState({ visible: false, message: '', type: '' });
  const showToast = (message, type = '') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3500);
  };

  // Modais
  const [modalPerfilOpen, setModalPerfilOpen] = useState(false);
  const [perfilEmEdicao, setPerfilEmEdicao] = useState(null);

  const [modalMetaOpen, setModalMetaOpen] = useState(false);
  const [metaEmEdicao, setMetaEmEdicao] = useState(null);

  const [modalSolicitarOpen, setModalSolicitarOpen] = useState(false);
  const [modalAuth, setModalAuth] = useState({ open: false, mode: 'signup' }); // 'signup' ou 'forgot'

  // Atividades
  const [atividades, setAtividades] = useState([
    { id: 1, icon: "🚫", texto: "Tentativa de acesso a site bloqueado", tempo: "14:32", tipo: "critico" },
    { id: 2, icon: "🎮", texto: "Jogou Roblox por 45 minutos", tempo: "13:10", tipo: "info" },
    { id: 3, icon: "✅", texto: "Meta de leitura concluída (+15 min)", tempo: "12:05", tipo: "sucesso" },
    { id: 4, icon: "📺", texto: "Assistiu YouTube Kids (28 min)", tempo: "11:20", tipo: "info" },
    { id: 5, icon: "⏰", texto: "Tentativa de acesso após 21h", tempo: "Ontem 21:15", tipo: "atencao" }
  ]);

  // Perfis de Horário
  const [perfis, setPerfis] = useState([
    {
      id: 1,
      nome: "Horário de Estudos",
      icone: "📚",
      horario: "14h – 17h",
      descricao: "Bloqueia redes sociais e jogos. Libera apenas sites educativos.",
      tipo: "estudos",
      ativo: true
    },
    {
      id: 2,
      nome: "Horário Livre",
      icone: "🎮",
      horario: "17h – 20h",
      descricao: "Acesso normal com monitoramento ativo e limites diários.",
      tipo: "livre",
      ativo: true
    },
    {
      id: 3,
      nome: "Horário de Dormir",
      icone: "🌙",
      horario: "Após 21h",
      descricao: "Bloqueio total de tráfego de rede e notificações desativadas.",
      tipo: "dormir",
      ativo: true
    }
  ]);

  // Metas do Filho
  const [metas, setMetas] = useState([
    { id: 1, texto: "Leitura de 20 minutos de um livro", feito: true },
    { id: 2, texto: "Fazer as tarefas escolares do dia", feito: true },
    { id: 3, texto: "Organizar o quarto e materiais escolares", feito: false }
  ]);

  // Alertas
  const [alertas, setAlertas] = useState([
    {
      id: 1,
      icone: "🚫",
      titulo: "Site bloqueado",
      descricao: "Tentativa de acesso a conteúdo adulto (domínio filtrado via DNS)",
      tempo: "Hoje, 14:32",
      tipo: "critico",
      lido: false
    },
    {
      id: 2,
      icone: "⏰",
      titulo: "Fora do horário",
      descricao: "Acesso tentado após 21h (Horário de Dormir ativo)",
      tempo: "Ontem, 21:15",
      tipo: "atencao",
      lido: false
    },
    {
      id: 3,
      icone: "🌟",
      titulo: "Pedido de Tempo Extra: +30 min",
      descricao: "Guilherme cumpriu 2 metas hoje e solicitou liberação de +30 minutos extras.",
      tempo: "Hoje, 15:10",
      tipo: "info",
      lido: false,
      solicitacao: {
        tempo: 30,
        pendente: true
      }
    },
    {
      id: 4,
      icone: "✅",
      titulo: "Meta cumprida",
      descricao: "Guilherme completou a meta de leitura e gerou bônus.",
      tempo: "Hoje, 12:05",
      tipo: "sucesso",
      lido: true
    },
    {
      id: 5,
      icone: "📱",
      titulo: "Dispositivo Pareado",
      descricao: "Galaxy A54 sincronizado com sucesso.",
      tempo: "Ontem, 09:10",
      tipo: "info",
      lido: true
    }
  ]);

  const diasSemana = [
    { dia: "Segunda-feira", tempo: "2h 10min", pct: 70 },
    { dia: "Terça-feira", tempo: "1h 45min", pct: 55 },
    { dia: "Quarta-feira", tempo: "2h 30min", pct: 80 },
    { dia: "Quinta-feira", tempo: "1h 55min", pct: 60 },
    { dia: "Sexta-feira", tempo: "2h 40min", pct: 85 },
    { dia: "Sábado", tempo: "2h 00min", pct: 65 },
    { dia: "Domingo", tempo: "1h 20min", pct: 45 }
  ];

  // Cálculos de Tempo
  const limiteTotalMinutos = limiteBaseMinutos + tempoExtraAprovadoMinutos;
  const tempoDisponivelMinutos = Math.max(0, limiteTotalMinutos - tempoUsadoMinutos);
  const porcentagemUso = Math.min(100, Math.round((tempoUsadoMinutos / limiteTotalMinutos) * 100));

  const formatarMinutos = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}min`;
    if (m === 0) return `${h}h 00min`;
    return `${h}h ${m < 10 ? '0' : ''}${m}min`;
  };

  // Funções de Autenticação
  const loginAs = (role) => {
    if (role === 'child') {
      setCurrentUser({
        role: 'child',
        name: 'Guilherme',
        email: 'guilherme@email.com',
        title: 'Filho (10 anos)',
        avatar: 'G'
      });
      setIsAuthenticated(true);
      showToast("Bem-vindo, Guilherme! 👦 Suas metas estão disponíveis.", "success");
    } else {
      setCurrentUser({
        role: 'parent',
        name: 'Ricardo',
        email: 'ricardo@email.com',
        title: 'Pai / Responsável',
        avatar: 'R'
      });
      setIsAuthenticated(true);
      showToast("Bem-vindo ao Painel dos Pais, Ricardo! 👨‍💼", "success");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast("Você saiu com segurança.", "");
  };

  // Funções de Bloqueio Emergencial
  const toggleBloqueio = () => {
    const novoStatus = !isBlocked;
    setIsBlocked(novoStatus);

    if (novoStatus) {
      setAtividades(prev => [
        { id: Date.now(), icon: "🚫", texto: "Bloqueio emergencial ativado pelos pais", tempo: "Agora", tipo: "critico" },
        ...prev
      ]);
      setAlertas(prev => [
        {
          id: Date.now(),
          icone: "🚫",
          titulo: "Dispositivo bloqueado",
          descricao: "Acesso total à rede do Galaxy A54 foi suspenso manualmente.",
          tempo: "Agora",
          tipo: "critico",
          lido: false
        },
        ...prev
      ]);
      showToast("Dispositivo do Guilherme bloqueado imediatamente!", "danger");
    } else {
      setAtividades(prev => [
        { id: Date.now(), icon: "🌐", texto: "Acesso à rede liberado pelos pais", tempo: "Agora", tipo: "sucesso" },
        ...prev
      ]);
      showToast("Acesso à rede restabelecido com sucesso!", "success");
    }
  };

  // Funções de Perfis
  const togglePerfilAtivo = (id) => {
    setPerfis(prev => prev.map(p => {
      if (p.id === id) {
        const novoAtivo = !p.ativo;
        showToast(
          novoAtivo ? `"${p.nome}" ativado com sucesso!` : `"${p.nome}" desativado.`,
          novoAtivo ? "success" : ""
        );
        return { ...p, ativo: novoAtivo };
      }
      return p;
    }));
  };

  const salvarPerfil = (dados) => {
    if (dados.id) {
      setPerfis(prev => prev.map(p => p.id === dados.id ? { ...p, ...dados } : p));
      showToast(`Perfil "${dados.nome}" atualizado com sucesso!`, "success");
    } else {
      setPerfis(prev => [...prev, { ...dados, id: Date.now(), ativo: true }]);
      showToast(`Novo perfil "${dados.nome}" cadastrado!`, "success");
    }
    setModalPerfilOpen(false);
    setPerfilEmEdicao(null);
  };

  const excluirPerfil = (id) => {
    const p = perfis.find(item => item.id === id);
    setPerfis(prev => prev.filter(item => item.id !== id));
    setModalPerfilOpen(false);
    setPerfilEmEdicao(null);
    showToast(`Perfil "${p?.nome || 'Perfil'}" excluído.`, "danger");
  };

  // Funções de Metas
  const toggleMetaFeita = (id) => {
    setMetas(prev => prev.map(m => {
      if (m.id === id) {
        const novoFeito = !m.feito;
        showToast(
          novoFeito ? `Parabéns, Guilherme! Você concluiu "${m.texto}" (+15 min conquistados)` : "Meta desmarcada.",
          novoFeito ? "success" : ""
        );
        return { ...m, feito: novoFeito };
      }
      return m;
    }));
  };

  const salvarMeta = (dados) => {
    if (dados.id) {
      setMetas(prev => prev.map(m => m.id === dados.id ? { ...m, texto: dados.texto } : m));
      showToast(`Meta "${dados.texto}" atualizada com sucesso!`, "success");
    } else {
      setMetas(prev => [...prev, { id: Date.now(), texto: dados.texto, feito: false }]);
      showToast(`Nova meta cadastrada para o Guilherme!`, "success");
    }
    setModalMetaOpen(false);
    setMetaEmEdicao(null);
  };

  const excluirMeta = (id) => {
    const m = metas.find(item => item.id === id);
    setMetas(prev => prev.filter(item => item.id !== id));
    setModalMetaOpen(false);
    setMetaEmEdicao(null);
    showToast(`Meta "${m?.texto || 'Meta'}" removida com sucesso.`, "danger");
  };

  // Funções de Alertas & Solicitações
  const solicitarTempoExtra = (tempo, motivo) => {
    const novoAlerta = {
      id: Date.now(),
      icone: "🌟",
      titulo: `Pedido de Tempo Extra: +${tempo} min`,
      descricao: motivo ? `Guilherme pediu +${tempo} min: "${motivo}"` : `Guilherme cumpriu metas e solicitou liberação de +${tempo} min extras.`,
      tempo: "Agora",
      tipo: "info",
      lido: false,
      solicitacao: {
        tempo: parseInt(tempo, 10),
        pendente: true
      }
    };
    setAlertas(prev => [novoAlerta, ...prev]);
    setModalSolicitarOpen(false);
    showToast("Solicitação enviada para seu pai Ricardo!", "success");
  };

  const aprovarSolicitacao = (id) => {
    const alerta = alertas.find(item => item.id === id);
    if (alerta && alerta.solicitacao) {
      setAlertas(prev => prev.map(a => {
        if (a.id === id) {
          return {
            ...a,
            tipo: 'sucesso',
            titulo: `Tempo Extra Liberado: +${a.solicitacao.tempo} min`,
            descricao: `Você aprovou o pedido. O limite diário do Guilherme foi ampliado com sucesso.`,
            solicitacao: { ...a.solicitacao, pendente: false }
          };
        }
        return a;
      }));

      const tempoLiberado = alerta.solicitacao.tempo;
      setTempoExtraAprovadoMinutos(prev => prev + tempoLiberado);

      setAtividades(prev => [
        { id: Date.now(), icon: "⏰", texto: `Liberado +${tempoLiberado} min extras para o Guilherme`, tempo: "Agora", tipo: "sucesso" },
        ...prev
      ]);

      showToast(`Aprovado! Limite do Guilherme aumentado com sucesso.`, "success");
    }
  };

  const recusarSolicitacao = (id) => {
    setAlertas(prev => prev.map(a => {
      if (a.id === id && a.solicitacao) {
        return {
          ...a,
          tipo: 'atencao',
          titulo: `Pedido Recusado (+${a.solicitacao.tempo} min)`,
          solicitacao: { ...a.solicitacao, pendente: false }
        };
      }
      return a;
    }));
    showToast("Pedido de tempo extra recusado.", "");
  };

  const marcarTodosAlertasLidos = () => {
    setAlertas(prev => prev.map(a => ({ ...a, lido: true })));
    showToast("Todos os alertas marcados como lidos.", "success");
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      isAuthenticated,
      loginAs,
      logout,
      isBlocked,
      toggleBloqueio,
      tempoUsadoMinutos,
      limiteTotalMinutos,
      tempoDisponivelMinutos,
      porcentagemUso,
      tempoExtraAprovadoMinutos,
      formatarMinutos,
      atividades,
      perfis,
      togglePerfilAtivo,
      salvarPerfil,
      excluirPerfil,
      metas,
      toggleMetaFeita,
      salvarMeta,
      excluirMeta,
      alertas,
      aprovarSolicitacao,
      recusarSolicitacao,
      marcarTodosAlertasLidos,
      solicitarTempoExtra,
      diasSemana,
      toast,
      showToast,
      modalPerfilOpen,
      setModalPerfilOpen,
      perfilEmEdicao,
      setPerfilEmEdicao,
      modalMetaOpen,
      setModalMetaOpen,
      metaEmEdicao,
      setMetaEmEdicao,
      modalSolicitarOpen,
      setModalSolicitarOpen,
      modalAuth,
      setModalAuth
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
