#!/bin/bash

echo "🔍 DIAGNÓSTICO COMPLETO DE PERFORMANCE"
echo "======================================"
echo ""

cd /root/casa10inn

echo "1. VERIFICANDO SERVIDOR:"
echo "------------------------"
pm2 describe casa10inn | grep -E "script path|status|memory|cpu"
echo ""

echo "2. VERIFICANDO SE ESTÁ USANDO server.js:"
echo "----------------------------------------"
SCRIPT=$(pm2 describe casa10inn 2>/dev/null | grep "script path" | awk -F'|' '{print $2}' | xargs)
if [[ "$SCRIPT" == *"server.js"* ]]; then
    echo "✅ CORRETO: Usando server.js"
else
    echo "❌ ERRADO: Ainda usando vite preview ou outro servidor"
    echo "   Script atual: $SCRIPT"
fi
echo ""

echo "3. VERIFICANDO BUILD:"
echo "---------------------"
if [ -d "dist" ]; then
    echo "✅ Pasta dist existe"
    echo "Tamanho total: $(du -sh dist/ | awk '{print $1}')"
    echo ""
    echo "Arquivos JS maiores:"
    find dist/assets/js -name "*.js" -exec ls -lh {} \; 2>/dev/null | awk '{print $5, $9}' | sort -hr | head -5
    echo ""
    echo "Total de arquivos JS: $(find dist/assets/js -name "*.js" 2>/dev/null | wc -l)"
else
    echo "❌ Pasta dist NÃO existe!"
fi
echo ""

echo "4. VERIFICANDO LOGS RECENTES:"
echo "-----------------------------"
pm2 logs casa10inn --lines 10 --nostream | tail -10
echo ""

echo "5. VERIFICANDO ERROS:"
echo "--------------------"
pm2 logs casa10inn --err --lines 20 --nostream | tail -20
echo ""

echo "6. VERIFICANDO USO DE RECURSOS:"
echo "-------------------------------"
pm2 describe casa10inn | grep -E "memory|cpu|heap"
echo ""

echo "7. VERIFICANDO SE SERVER.JS EXISTE:"
echo "-----------------------------------"
if [ -f "server.js" ]; then
    echo "✅ server.js existe"
else
    echo "❌ server.js NÃO existe!"
fi
echo ""

echo "8. VERIFICANDO CONFIGURAÇÃO PM2:"
echo "--------------------------------"
if [ -f "ecosystem.config.cjs" ]; then
    echo "✅ ecosystem.config.cjs existe"
    echo "Conteúdo:"
    cat ecosystem.config.cjs | grep -E "script|name"
else
    echo "❌ ecosystem.config.cjs NÃO existe!"
fi
echo ""

echo "9. TESTANDO ACESSO AO SERVIDOR:"
echo "-------------------------------"
curl -I http://localhost:3004 2>/dev/null | head -5
echo ""

echo "======================================"
echo "FIM DO DIAGNÓSTICO"

