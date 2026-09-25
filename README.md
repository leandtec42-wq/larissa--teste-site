# Larissa Oliveira — site + painel administrativo

Site público e painel administrativo da Larissa Oliveira, construído em **Next.js 16** (App Router) com banco de dados real via **Prisma + SQLite**. Esta é a versão final, com banco de verdade, login seguro e feita para uso no dia a dia.

## Como rodar

```bash
npm install
cp .env.example .env.local     # ajuste SITE_URL e gere um SESSION_SECRET novo
npm run dev
```

Acesse `http://localhost:3000` para o site público e `http://localhost:3000/admin` para o painel.

Na primeira execução (`npm install` já dispara isso via `postinstall`/`prisma migrate`), o banco (`prisma/dev.db`) é criado e populado com dados reais da Larissa — fotos e vídeos de verdade, tirados dela em feiras e sessões de produto — então já dá pra abrir e usar sem nenhum passo manual de configuração.

Se o banco ainda não existir, rode:

```bash
npx prisma migrate dev
```

## Acesso ao painel administrativo

- **Usuário:** `larissa`
- **Senha:** `doces2026`

Troque isso assim que possível em **Meu Perfil → Acesso ao painel**, dentro do próprio painel.

## Arquitetura (padrão MVC)

```
Model       → prisma/schema.prisma + lib/models/*.js
              Todo acesso ao banco passa pelo Prisma Client (lib/prisma.js).
              Nenhuma outra parte do projeto fala com o banco diretamente.

View        → app/**/page.js, app/layout.js, components/site/**, components/admin/**
              Componentes de servidor (e alguns de cliente, só onde é
              realmente necessário — menu mobile, lightbox, vídeos,
              animação de entrada) responsáveis por montar a interface.

Controller  → app/admin/actions/**
              Server Actions organizadas por domínio (auth, perfil, agenda,
              sabores, depoimentos, publicações). Recebem os dados do
              formulário (a View), validam (lib/validate.js), chamam o
              Model e redirecionam — inclusive devolvendo mensagens de
              erro para a própria View via "?erro=..." na URL.
```

Rotas do site público: `/`. Rotas do painel: `/admin/login` (pública) e `/admin/**` (protegidas por sessão, redirecionam pro login se não houver cookie válido).

Bibliotecas auxiliares em `lib/`: `auth.js` e `session.js` (senha com hash scrypt + cookie de sessão assinado HMAC), `upload.js` (upload/validação de imagens), `validate.js` (validação de formulários), `whatsapp.js` (montagem dos links de WhatsApp) e `format.js` (formatação de datas/preços).

## Segurança

- Senha de admin com hash `scrypt` (nunca em texto puro) e comparação em tempo constante.
- Sessão do painel via cookie assinado (HMAC), `httpOnly`, `sameSite=lax` e `secure` em produção.
- Limite de tentativas de login: bloqueia por 30s após 5 tentativas erradas.
- Toda entrada de formulário é validada e sanitizada em `lib/validate.js` antes de tocar no banco.
- Upload de imagem valida tipo e tamanho (até 4MB) antes de salvar.
- `/admin` é bloqueado para indexação por buscadores (`noindex` + `robots.txt`).

## Como alterar o essencial

- **Número de WhatsApp e mensagens automáticas:** painel → **Meu Perfil**.
- **Fotos e vídeo de capa:** a foto de perfil é trocada em **Meu Perfil**. Para trocar o vídeo/foto de fundo do topo do site, substitua os arquivos em `public/media/hero.mp4` e `public/media/hero-poster.jpg` (mesmo nome).
- **Senha do painel:** **Meu Perfil → Acesso ao painel**.
- Tudo o mais (agenda, sabores, depoimentos, publicações) é gerenciado inteiramente pelo painel — nenhum conteúdo é fixo no código.

## Onde ficam os dados

- Banco de dados: `prisma/dev.db` (arquivo único SQLite, criado automaticamente — não versionado no git). Faça backup desse arquivo periodicamente em produção.
- Imagens enviadas pelo painel: `public/uploads/` (não versionado no git).
- Fotos e vídeos originais do projeto (reais, da Larissa): `public/media/`.

## Implantação (deploy)

Este projeto guarda o banco de dados **em um arquivo local** (`prisma/dev.db`) e as imagens enviadas **em disco** (`public/uploads/`). Isso funciona perfeitamente em qualquer hospedagem que mantenha um servidor Node.js rodando continuamente com disco persistente — por exemplo uma VPS comum, Railway, Render ou Fly.io.

**Atenção se for usar a Vercel:** o plano padrão da Vercel roda em funções serverless sem disco persistente — o banco SQLite e os uploads seriam apagados a cada novo deploy. Para usar a Vercel, troque o banco por um serviço externo compatível com Prisma (Turso/LibSQL, Postgres, etc.) e as imagens por um serviço de storage (S3, Cloudinary, Vercel Blob) — a troca fica isolada em `prisma/schema.prisma` e `lib/upload.js`.

Antes de colocar em produção:

1. Gere um `SESSION_SECRET` novo e aleatório: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` — nunca use o valor padrão.
2. Configure `SITE_URL` com o domínio final.
3. Troque a senha padrão do painel.
4. Rode `npm run build && npm run start` para confirmar que o build de produção passa antes do deploy.

## Estrutura de pastas

```
app/
  page.js                      → homepage (site público)
  layout.js                    → layout raiz, fontes e metadata
  sitemap.js, robots.js        → SEO
  admin/
    login/page.js
    actions/                   → Controllers (Server Actions), por domínio
    (protected)/                → páginas do painel que exigem login
      page.js                  → dashboard
      agenda/, sabores/, depoimentos/, publicacoes/, perfil/
components/
  site/                        → Views do site público
  admin/                       → Views do painel administrativo
lib/
  prisma.js                    → Model — cliente Prisma compartilhado
  models/                      → Model — funções de acesso a dados, por domínio
  auth.js, session.js          → autenticação e sessão do painel
  upload.js, validate.js       → upload/validação de imagens e formulários
  whatsapp.js, format.js       → helpers de WhatsApp e formatação
prisma/
  schema.prisma                → schema do banco
  seed.mjs                     → popula o banco na primeira execução
public/
  media/                       → fotos e vídeo reais da Larissa
  uploads/                     → imagens enviadas pelo painel
```
