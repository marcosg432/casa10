#!/bin/bash

# Script de Setup Inicial para Hostinger
# Execute este script APENAS UMA VEZ no servidor da Hostinger

set -e

echo "🚀 Configurando ambiente inicial na Hostinger..."

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar se está rodando como root ou com sudo
if [ "$EUID" -ne 0 ]; then 
    echo -e "${YELLOW}⚠️  Alguns comandos podem precisar de sudo${NC}"
fi

echo -e "${YELLOW}📦 Atualizando sistema...${NC}"
sudo apt-get update

echo -e "${YELLOW}📥 Instalando Node.js 18...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

echo -e "${YELLOW}📥 Instalando Git...${NC}"
sudo apt-get install git -y

echo -e "${YELLOW}📥 Instalando PM2...${NC}"
sudo npm install pm2@latest -g

echo -e "${YELLOW}📥 Instalando Nginx...${NC}"
sudo apt-get install nginx -y

echo -e "${GREEN}✅ Instalações concluídas!${NC}"
echo -e "${GREEN}📊 Versões instaladas:${NC}"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "PM2: $(pm2 --version)"
echo "Git: $(git --version)"

echo -e "${GREEN}✅ Ambiente configurado com sucesso!${NC}"
echo -e "${YELLOW}📝 Próximos passos:${NC}"
echo "1. Clone o repositório: git clone https://github.com/marcosg432/casa10.git"
echo "2. Entre no diretório: cd casa10"
echo "3. Execute: npm install && npm run build"
echo "4. Inicie com PM2: pm2 start ecosystem.config.cjs"
echo "5. Configure o Nginx seguindo o GUIA_RAPIDO.md"

