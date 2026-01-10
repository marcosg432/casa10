#!/bin/bash

# Script de Reativação Rápida para Hostinger
# Uso: ./reativar.sh

set -e  # Parar em caso de erro

echo "🔄 Reativando aplicação Casa10 Inn..."

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

# Verificar se o build existe
if [ ! -d "dist" ]; then
    echo -e "${YELLOW}⚠️  Diretório 'dist' não encontrado. Criando build...${NC}"
    npm run build
fi

echo -e "${YELLOW}🚀 Iniciando aplicação no PM2...${NC}"

# Tentar iniciar a aplicação
pm2 start ecosystem.config.cjs

echo -e "${YELLOW}💾 Salvando configuração do PM2...${NC}"
pm2 save

echo -e "${GREEN}✅ Aplicação reativada com sucesso!${NC}"
echo -e "${GREEN}📊 Status da aplicação:${NC}"
pm2 status

echo -e "${GREEN}📝 Comandos úteis:${NC}"
echo -e "  - Ver logs: ${YELLOW}pm2 logs casa10inn${NC}"
echo -e "  - Parar: ${YELLOW}pm2 stop casa10inn${NC}"
echo -e "  - Reiniciar: ${YELLOW}pm2 restart casa10inn${NC}"
echo -e "  - Monitorar: ${YELLOW}pm2 monit${NC}"




