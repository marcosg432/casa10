# ✅ Finalizar Deploy - Nginx Configurado!

## 🎉 Status Atual

- ✅ Nginx configurado corretamente
- ✅ Teste do Nginx passou (syntax is ok)
- ✅ Link simbólico já existe (não é problema)

---

## 🚀 Próximos Comandos

Execute estes comandos **agora**:

### 1️⃣ Reiniciar Nginx

```bash
sudo systemctl restart nginx
```

### 2️⃣ Verificar Status do Nginx

```bash
sudo systemctl status nginx
```

**Deve mostrar "active (running)" ✅**

### 3️⃣ Verificar se Está Funcionando

```bash
# Verificar PM2
pm2 status

# Verificar se aplicação responde localmente
curl http://localhost:3001

# Testar se Nginx está respondendo
curl http://localhost

# Verificar se responde pelo IP externo
curl http://193.160.119.67
```

### 4️⃣ Configurar PM2 para Iniciar no Boot

Se ainda não fez:

```bash
pm2 startup
# Execute o comando que aparecer na tela
pm2 save
```

### 5️⃣ Verificar Firewall (Importante!)

```bash
# Verificar status do firewall
sudo ufw status

# Se estiver ativo, garantir que portas estão abertas
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp

# Verificar novamente
sudo ufw status
```

---

## 🌍 Acessar o Site

Depois de reiniciar o Nginx, acesse no navegador:

**http://193.160.119.67**

Seu site deve aparecer! 🎉

---

## 🔍 Verificar Logs (Se Necessário)

Se o site não carregar, verifique os logs:

```bash
# Logs do Nginx
sudo tail -50 /var/log/nginx/error.log
sudo tail -50 /var/log/nginx/access.log

# Logs do PM2
pm2 logs brisa-azul --lines 50
```

---

## 🐛 Solução de Problemas Rápida

### Site não carrega

```bash
# 1. Verificar se PM2 está rodando
pm2 status

# 2. Verificar se aplicação responde
curl http://localhost:3001

# 3. Verificar Nginx
sudo systemctl status nginx

# 4. Reiniciar tudo
pm2 restart brisa-azul
sudo systemctl restart nginx

# 5. Verificar firewall
sudo ufw status
```

### Erro 502 Bad Gateway

```bash
# Aplicação não está respondendo
pm2 restart brisa-azul
pm2 logs brisa-azul

# Verificar se porta 3001 está aberta
sudo netstat -tulpn | grep 3001
```

### Erro 404 Not Found

```bash
# Verificar configuração do Nginx
sudo nginx -t
sudo cat /etc/nginx/sites-available/brisa-azul
```

---

## ✅ Checklist Final

- [ ] Nginx reiniciado
- [ ] Nginx status: active (running)
- [ ] PM2 rodando (status: online)
- [ ] Aplicação responde em http://localhost:3001
- [ ] Nginx responde em http://localhost
- [ ] Firewall configurado (portas 80 e 443 abertas)
- [ ] PM2 configurado para iniciar no boot
- [ ] Site acessível em http://193.160.119.67

---

## 🎉 Comandos Finais

Execute estes comandos para finalizar:

```bash
# 1. Reiniciar Nginx
sudo systemctl restart nginx

# 2. Verificar status
sudo systemctl status nginx
pm2 status

# 3. Configurar PM2 para iniciar no boot
pm2 startup
# Execute o comando que aparecer
pm2 save

# 4. Verificar firewall
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 5. Testar
curl http://localhost:3001
curl http://localhost
```

---

## 📝 Comandos Úteis para o Futuro

```bash
# Ver status
pm2 status
sudo systemctl status nginx

# Ver logs
pm2 logs brisa-azul
sudo tail -f /var/log/nginx/error.log

# Reiniciar
pm2 restart brisa-azul
sudo systemctl restart nginx

# Atualizar projeto
cd ~/casa10
git pull origin main
npm install
npm run build
pm2 restart brisa-azul
```

---

**Execute `sudo systemctl restart nginx` e depois acesse http://193.160.119.67 no navegador! 🚀**

