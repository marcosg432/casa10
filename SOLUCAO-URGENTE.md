# 🚨 SOLUÇÃO URGENTE - PERFORMANCE MOBILE

## ⚠️ PROBLEMA CRÍTICO
O site ainda está lento no mobile mesmo após otimizações.

## 📋 PASSO 1: DIAGNÓSTICO COMPLETO

Execute no servidor da Hostinger:

```bash
cd /root/casa10inn
git pull origin main
chmod +x diagnostico-completo.sh
./diagnostico-completo.sh
```

**Copie TODA a saída e me envie!**

## 🔧 PASSO 2: CORREÇÃO COMPLETA E AGRESSIVA

Execute ESTES comandos EXATOS na ordem:

```bash
cd /root/casa10inn

# 1. PARAR TUDO
pm2 stop casa10inn
pm2 delete casa10inn

# 2. GARANTIR CÓDIGO ATUALIZADO
git fetch origin
git reset --hard origin/main

# 3. VERIFICAR SE server.js EXISTE
ls -la server.js
# Se não existir, algo está errado!

# 4. LIMPAR TUDO
rm -rf dist node_modules/.vite .vite

# 5. REINSTALAR DEPENDÊNCIAS
npm install

# 6. BUILD LIMPO
npm run build

# 7. VERIFICAR SE BUILD FOI CRIADO
ls -la dist/index.html
# Deve existir!

# 8. VERIFICAR TAMANHO DO BUILD
du -sh dist/
echo "Tamanho dos JS:"
find dist/assets/js -name "*.js" -exec ls -lh {} \; | awk '{print $5, $9}'

# 9. INICIAR COM SERVER.JS
pm2 start ecosystem.config.cjs

# 10. VERIFICAR SE ESTÁ USANDO server.js
pm2 describe casa10inn | grep "script path"
# DEVE MOSTRAR: /root/casa10inn/server.js

# 11. VER LOGS
pm2 logs casa10inn --lines 30
# DEVE MOSTRAR: "🚀 Servidor rodando em http://0.0.0.0:3004"

# 12. SALVAR
pm2 save
```

## ✅ VERIFICAÇÕES CRÍTICAS

Após executar, verifique:

1. **Script path deve ser:** `/root/casa10inn/server.js` ✅
2. **Logs devem mostrar:** `🚀 Servidor rodando` ✅
3. **NÃO deve mostrar:** `vite preview` ❌
4. **Build deve existir:** `dist/index.html` existe ✅

## 🚨 SE AINDA ESTIVER LENTO

Envie:
1. Saída completa do `./diagnostico-completo.sh`
2. Saída de `pm2 describe casa10inn`
3. Saída de `pm2 logs casa10inn --lines 50`
4. Tamanho do build: `du -sh dist/`
5. Tamanho dos JS: `find dist/assets/js -name "*.js" -exec ls -lh {} \;`

