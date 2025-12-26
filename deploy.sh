#!/bin/bash

# Script de Deploy Automático para Hostinger
# Uso: ./deploy.sh

set -e  # Parar em caso de erro

echo "🚀 Iniciando deploy do Brisa Azul..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: package.json não encontrado. Execute este script na raiz do projeto.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Atualizando código do repositório...${NC}"
git pull origin main || git pull origin master

echo -e "${YELLOW}📥 Instalando dependências...${NC}"
npm install

echo -e "${YELLOW}🏗️ Criando build de produção...${NC}"
npm run build

echo -e "${YELLOW}🔄 Reiniciando aplicação no PM2...${NC}"
pm2 restart ecosystem.config.cjs || pm2 start ecosystem.config.cjs

echo -e "${YELLOW}💾 Salvando configuração do PM2...${NC}"
pm2 save

echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo -e "${GREEN}📊 Status da aplicação:${NC}"
pm2 status

echo -e "${GREEN}📝 Para ver os logs: pm2 logs brisa-azul${NC}"

