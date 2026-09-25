-- CreateTable
CREATE TABLE "Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "tentativas" INTEGER NOT NULL DEFAULT 0,
    "bloqueadoAte" DATETIME
);

-- CreateTable
CREATE TABLE "Perfil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "frase" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotoPerfil" TEXT NOT NULL,
    "fotoSecundaria" TEXT,
    "fotoCapa" TEXT NOT NULL,
    "videoCapa" TEXT NOT NULL,
    "videoCapaPoster" TEXT,
    "videoVitrine" TEXT,
    "tplEncomenda" TEXT NOT NULL,
    "tplProduto" TEXT NOT NULL,
    "tplEvento" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "horario" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "endereco" TEXT,
    "mapsLink" TEXT,
    "descricao" TEXT,
    "imagem" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Sabor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" REAL NOT NULL,
    "foto" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "ordem" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Depoimento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "autor" TEXT,
    "descricao" TEXT NOT NULL,
    "foto" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Publicacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "foto" TEXT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "data" DATETIME NOT NULL,
    "categoria" TEXT,
    "status" TEXT NOT NULL DEFAULT 'rascunho'
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_usuario_key" ON "Admin"("usuario");
