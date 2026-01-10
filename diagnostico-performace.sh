#!/bin/bash

echo "=== DIAGNÓSTICO DE PERFORMANCE CASA10INN ==="
echo ""

echo "1. Status do processo casa10inn:"
pm2 describe casa10inn | grep -E "status|memory|cpu|restarts|uptime"
echo ""

echo "2. Uso de memória detalhado:"
pm2 describe casa10inn | grep -E "memory|heap"
echo ""

echo "3. Logs recentes (últimas 20 linhas):"
pm2 logs casa10inn --lines 20 --nostream
echo ""

echo "4. Informações do script rodando:"
pm2 describe casa10inn | grep -E "script path|interpreter|exec mode"
echo ""

echo "5. Tamanho da pasta dist (build):"
du -sh /root/casa10inn/dist 2>/dev/null || echo "Pasta dist não encontrada"
echo ""

echo "6. Arquivos maiores em dist:"
find /root/casa10inn/dist -type f -size +1M -exec ls -lh {} \; 2>/dev/null | head -10
echo ""

echo "7. Verificação se está usando server.js ou vite preview:"
pm2 describe casa10inn | grep "script path"
echo ""

echo "8. Uso total de memória dos processos Node:"
pm2 list | awk '{sum+=$4} END {print "Memória total: " sum " MB"}'
echo ""

echo "=== FIM DO DIAGNÓSTICO ==="

