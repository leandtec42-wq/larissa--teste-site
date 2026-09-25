/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fixa a raiz do projeto: evita que o Turbopack suba diretórios acima
  // procurando um lockfile (há outros projetos soltos na pasta do cliente).
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
