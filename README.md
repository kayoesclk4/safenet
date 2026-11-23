# SafeNet Kids – Protótipo Funcional

**Aplicativo de Controle e Monitoramento Inteligente de Redes**  
Projeto do Curso Técnico em Desenvolvimento de Sistemas  
Colégio Estadual Dr. Eduardo Virmond Suplicy – Francisco Beltrão/PR  
Novembro/2026

---

## Como rodar o protótipo

### Opção 1 – Com Node.js / npm (Recomendado)
```bash
npm run dev
# ou
npm start
```
O servidor iniciará em `http://localhost:3000` e abrirá a página automaticamente no navegador.

### Opção 2 – Abrir direto no navegador
1. Abra a pasta `SafeNet`
2. Dê um duplo clique no arquivo `index.html`
3. O protótipo abrirá no seu navegador padrão

### Opção 3 – Com Python
```bash
python -m http.server 8080
# Depois acesse: http://localhost:8080
```

### Opção 4 – Publicar na Vercel (Link online para apresentar)
1. Suba os arquivos para o seu **GitHub**.
2. Acesse [vercel.com](https://vercel.com) e conecte sua conta.
3. Clique em **"Add New Project"** e importe o repositório.
4. O projeto já inclui o `vercel.json` configurado (basta clicar em **Deploy**). Em segundos o protótipo estará acessível pelo celular ou qualquer navegador.

---

## Perfis de Acesso para Teste

| Perfil | E-mail | Senha | O que acessa |
|---|---|---|---|
| **👨‍💼 Pai (Ricardo)** | `ricardo@email.com` | `123456` | Dashboard, Horários, Gestão de Metas do Filho, Alertas (com aprovação de tempo) e Relatório Semanal com PDF. |
| **👦 Filho (Guilherme)** | `guilherme@email.com` | `1234` | Minhas Metas (apenas marcar ✓), solicitação de tempo extra e Meu Tempo de Rede. |

---

## Funcionalidades demonstradas

| Tela | O que faz |
|---|---|
| **Login** | Seleção rápida em 1 clique entre Pai e Filho, criar conta e recuperação de senha |
| **Dashboard (Pais)** | Tempo de tela dinâmico com tempo disponível livre, percentual recalculado, gráfico e bloqueio emergencial |
| **Horários (Pais)** | Perfis de acesso: ativar/desativar, editar faixas de horário e criar novas regras |
| **Metas do Filho (Pais)** | Os pais cadastram, editam e excluem tarefas diárias para o filho |
| **Minhas Metas (Filho)** | O Guilherme apenas marca as tarefas cumpridas e solicita tempo extra aos pais |
| **Meu Tempo (Filho)** | O Guilherme acompanha quanto tempo já usou, seu limite e quanto tempo ainda tem livre |
| **Alertas (Pais)** | Notificações de bloqueio e aprovação de tempo extra solicitado pelo filho em 1 clique |
| **Relatório (Pais)** | Resumo semanal, gráfico comparativo e **exportação real em PDF** pronta para download |

---

## Tecnologias usadas no protótipo

- **HTML5** – estrutura
- **CSS3** – layout responsivo e identidade visual
- **JavaScript (Vanilla)** – interatividade e lógica
- **Chart.js** – gráficos (categorias e relatório)

---

## Arquitetura prevista para a versão completa

```
┌─────────────────┐     ┌──────────────────────┐
│  App Mobile     │────▶│  Backend (API)       │
│  (Flutter /     │     │  Node.js + Firebase  │
│   React Native) │     └──────────────────────┘
└────────┬────────┘              │
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌──────────────────────┐
│  Filtragem      │     │  Banco de dados      │
│  DNS / VPN Local│     │  (regras, logs,      │
│  no dispositivo │     │   metas, usuários)   │
└─────────────────┘     └──────────────────────┘
```

### Principais componentes reais (versão futura)
1. **Cliente mobile** – interface para pais e crianças
2. **Módulo de filtragem** – DNS filtering ou VPN local no dispositivo da criança
3. **Backend** – sincronização de regras, relatórios e notificações push
4. **Listas de bloqueio** – atualizadas periodicamente (conteúdo adulto, rastreadores, etc.)

---

## Grupo
- Ricardo Mazon
- Kayo Souza
- Guilherme Altair
- João Luis
- Pedro Iber

**Professora:** Marieli Scheffer dos Santos
