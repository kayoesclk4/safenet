# SafeNet Kids – Controle Parental Inteligente (Vite + React)

**Aplicativo de Controle e Monitoramento Inteligente de Redes**  
Projeto do Curso Técnico em Desenvolvimento de Sistemas  
Colégio Estadual Dr. Eduardo Virmond Suplicy – Francisco Beltrão/PR  
Novembro/2026

---

## Como rodar o projeto localmente

```bash
# 1. Instalar dependências (caso necessário)
npm install

# 2. Iniciar servidor de desenvolvimento Vite
npm run dev
```
Acesse em: `http://localhost:3000`

Para testar o build de produção localmente:
```bash
npm run build
npm run preview
```

---

## Como publicar na Vercel (Pronto para Deploy)

1. Suba os arquivos para o seu **GitHub** (`git push origin main`).
2. Acesse [vercel.com](https://vercel.com) e conecte com seu GitHub.
3. Clique em **"Add New Project"** e selecione o repositório **safenet**.
4. O framework detectará automaticamente como **Vite** (Build Command: `vite build`, Output Directory: `dist`).
5. Clique em **Deploy**. Em menos de 1 minuto o site estará publicado e online para apresentação!

---

## Perfis de Acesso para Apresentação

| Perfil | E-mail | Senha | Páginas acessadas |
|---|---|---|---|
| **👨‍💼 Pai (Ricardo)** | `ricardo@email.com` | `123456` | `/dashboard`, `/horarios`, `/gestao-metas`, `/alertas`, `/relatorio` (com exportação real em PDF). |
| **👦 Filho (Guilherme)** | `guilherme@email.com` | `1234` | `/crianca` (Minhas Metas & Recompensas), `/tempo-crianca` (Meu Tempo de Rede). |

> 💡 **Dica de apresentação rápida:** Na tela de login há botões de 1 clique para alternar instantaneamente entre Pai e Filho.

---

## Páginas e Estrutura (Vite + React)

- `/login` – Seleção rápida de perfil e login com credenciais
- `/dashboard` – Resumo em tempo real, tempo de tela, alertas, metas e gráfico por categoria
- `/horarios` – Criação, edição e ativação/desativação de perfis de horário
- `/gestao-metas` – Painel dos pais para cadastrar e gerenciar metas do filho
- `/alertas` – Central de alertas com aprovação/recusa de tempo extra com 1 clique
- `/relatorio` – Relatório semanal com gráfico de barras e download em PDF (html2pdf)
- `/crianca` – Espaço da criança com checklist de metas e solicitação de tempo extra
- `/tempo-crianca` – Visão da criança com medidor visual e limites de conexão

---

## Grupo
- Ricardo Mazon
- Kayo Souza
- Guilherme Altair
- João Luis
- Pedro Iber

**Professora:** Marieli Scheffer dos Santos
