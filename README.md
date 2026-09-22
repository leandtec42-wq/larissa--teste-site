# Larissa Oliveira Cakes — Versão TESTE

Site + painel administrativo em HTML/CSS/JS puro (sem instalação, sem servidor). Ideal para você (e a Larissa) já verem e sentirem a experiência completa antes de partir para a versão TOPZERA (com banco de dados de verdade).

## Como abrir

Basta abrir o arquivo `index.html` no navegador (duplo clique) — ou, melhor ainda, subir a pasta inteira em qualquer hospedagem estática (Vercel, Netlify, GitHub Pages, Hostinger, etc).

Para testar o painel administrativo com o upload de imagens funcionando 100% (alguns navegadores bloqueiam certas funções ao abrir arquivos direto do disco), rode um servidor local simples:

```
cd teste
python3 -m http.server 8000
```

E acesse `http://localhost:8000`.

## Painel administrativo

Acesse pelo link **"Painel administrativo"** no rodapé do site, ou diretamente em `admin/index.html`.

- **Usuário:** `larissa`
- **Senha:** `doces2026`

Você pode trocar usuário e senha em **Meu Perfil → Acesso**, dentro do painel.

## Como essa versão funciona (importante)

Esta é a versão de demonstração. Para funcionar sem precisar de servidor, **todo o conteúdo (agenda, sabores, depoimentos, publicações, perfil) é salvo no `localStorage` do navegador** — ou seja, dentro do próprio computador/navegador onde você está usando.

Isso significa:

- O site público e o painel **precisam ser abertos no mesmo navegador** para o painel refletir no site (ex: os dois no Chrome do seu computador).
- Se você limpar os dados do navegador, o conteúdo volta ao padrão de exemplo.
- Não existe um "servidor" real guardando as informações, nem multiusuário, nem backup automático.
- O login do painel é apenas uma checagem simples no navegador — **não é seguro para uso real em produção**.

Para o site que a Larissa vai realmente usar no dia a dia (com banco de dados de verdade, login seguro e podendo ser acessado de qualquer aparelho), use a **versão TOPZERA**.

## O que já vem pronto

- Site público mobile-first com: apresentação da Larissa, próximo evento em destaque, agenda completa (eventos passados somem sozinhos), sabores com preço e botão de WhatsApp, depoimentos reais (os prints que você enviou), seção de encomendas com passo a passo, galeria do Instagram e rodapé com WhatsApp flutuante.
- Vídeo de fundo real no topo (extraído do vídeo que você enviou, com a legenda cortada) com foto de capa como respaldo em conexões lentas.
- Painel administrativo completo: agenda, sabores, depoimentos, publicações e perfil — tudo com formulários simples, sem termos técnicos.
- Todas as mensagens do WhatsApp (geral, por sabor, por evento) são configuráveis em **Meu Perfil**.

## Trocar fotos e vídeo

As imagens de sabores hoje são ilustrações (placeholders elegantes) — troque pelas fotos reais dos produtos assim que tiver, direto pelo painel (**Meus sabores → Editar → foto**). Fica salvo automaticamamente.

Para trocar o vídeo/foto de capa do topo por outro, é só substituir os arquivos em `assets/media/hero-video.mp4`, `hero-video.webm` e `hero-poster.jpg` (mesmo nome, mesmo lugar).

## Estrutura de pastas

```
teste/
  index.html              → site público
  assets/
    css/style.css
    js/data.js             → dados padrão + camada de localStorage
    js/main.js              → renderização e interações do site público
    media/                  → vídeo, fotos e placeholders
  admin/
    index.html              → painel administrativo (login + app)
    assets/admin.css
    assets/admin.js
```
