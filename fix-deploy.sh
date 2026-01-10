#!/bin/bash

echo "🔧 Script de Correção do Deploy Casa10inn"
echo "=========================================="
echo ""

cd /root/casa10inn

echo "1. Resolvendo conflito do Git..."
git checkout -- package-lock.json
echo "✅ Conflito resolvido"
echo ""

echo "2. Atualizando código do repositório..."
git pull origin main
echo "✅ Código atualizado"
echo ""

echo "3. Verificando se server.js existe..."
if [ -f "server.js" ]; then
    echo "✅ server.js encontrado"
else
    echo "❌ ERRO: server.js não encontrado!"
    exit 1
fi
echo ""

echo "4. Instalando dependências..."
npm install
echo "✅ Dependências instaladas"
echo ""

echo "5. Criando build de produção..."
npm run build
echo "✅ Build criado"
echo ""

echo "6. Parando processo antigo..."
pm2 stop casa10inn 2>/dev/null || echo "Processo não estava rodando"
pm2 delete casa10inn 2>/dev/null || echo "Processo não existia"
echo "✅ Processo antigo removido"
echo ""

echo "7. Iniciando com servidor otimizado..."
pm2 start ecosystem.config.cjs
echo "✅ Servidor iniciado"
echo ""

echo "8. Salvando configuração PM2..."
pm2 save
echo "✅ Configuração salva"
echo ""

echo "9. Verificando script path..."
SCRIPT_PATH=$(pm2 describe casa10inn 2>/dev/null | grep "script path" | awk -F'|' '{print $2}' | xargs)
echo "Script path: $SCRIPT_PATH"

if [[ "$SCRIPT_PATH" == *"server.js"* ]]; then
    echo "✅ CORRETO: Usando server.js otimizado!"
else
    echo "❌ AVISO: Ainda pode estar usando vite preview"
fi
echo ""

echo "10. Status do processo:"
pm2 describe casa10inn | grep -E "status|memory|cpu|uptime"
echo ""

echo "11. Últimas linhas dos logs:"
pm2 logs casa10inn --lines 10 --nostream
echo ""

echo "=========================================="
echo "✅ Deploy concluído!"
echo ""
echo "Verifique se os logs mostram:"
echo "  '🚀 Servidor rodando em http://0.0.0.0:3004'"
echo ""
echo "Se aparecer 'vite preview', algo ainda está errado."

