# 🌐 Configurar Nginx SEM Domínio (Usando IP)

## 📋 Configuração para Acessar pelo IP: 193.160.119.67

Execute estes comandos **na ordem**:

---

## 1️⃣ Criar Configuração do Nginx

```bash
sudo nano /etc/nginx/sites-available/brisa-azul
```

**Cole este conteúdo (usando o IP diretamente):**

```nginx
server {
    listen 80;
    server_name 193.160.119.67;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Salve:** `Ctrl+X`, depois `Y`, depois `Enter`

---

## 2️⃣ Ativar Site e Testar

```bash
# Ativar o site
sudo ln -s /etc/nginx/sites-available/brisa-azul /etc/nginx/sites-enabled/

# Remover configuração padrão (opcional)
sudo rm /etc/nginx/sites-enabled/default 2>/dev/null

# Testar configuração
sudo nginx -t
```

**Se aparecer "syntax is ok" e "test is successful", continue:**

---

## 3️⃣ Reiniciar Nginx

```bash
# Reiniciar Nginx
sudo systemctl restart nginx

# Verificar status
sudo systemctl status nginx
```

---

## 4️⃣ Verificar Firewall (Importante!)

Certifique-se de que as portas 80 (HTTP) e 443 (HTTPS) estão abertas:

```bash
# Verificar status do firewall
sudo ufw status

# Se o firewall estiver ativo, abrir portas
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # SSH (já deve estar aberta)

# Verificar novamente
sudo ufw status
```

---

## 5️⃣ Verificar Tudo

```bash
# Verificar PM2
pm2 status

# Verificar se aplicação responde localmente
curl http://localhost:3001

# Verificar Nginx
sudo systemctl status nginx

# Testar se Nginx está respondendo
curl http://localhost
```

---

## 🌍 Acessar o Site

Depois de configurar tudo, você pode acessar:

**http://193.160.119.67**

Abra no navegador e seu site deve aparecer!

---

## 🔧 Configurar PM2 para Iniciar no Boot

Se ainda não fez:

```bash
# Gerar comando de startup
pm2 startup

# Execute o comando que aparecer na tela (será algo como):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root

# Salvar configuração
pm2 save
```

---

## 🐛 Solução de Problemas

### Site não carrega no navegador

```bash
# 1. Verificar se PM2 está rodando
pm2 status

# 2. Verificar se aplicação responde localmente
curl http://localhost:3001

# 3. Verificar se Nginx está rodando
sudo systemctl status nginx

# 4. Verificar logs do Nginx
sudo tail -50 /var/log/nginx/error.log

# 5. Verificar logs do PM2
pm2 logs brisa-azul --lines 50

# 6. Verificar firewall
sudo ufw status
```

### Porta 80 não responde

```bash
# Verificar se porta 80 está aberta
sudo netstat -tulpn | grep :80

# Verificar se Nginx está escutando
sudo ss -tlnp | grep :80

# Reiniciar Nginx
sudo systemctl restart nginx
```

### Erro 502 Bad Gateway

Isso significa que o Nginx não consegue se conectar à aplicação:

```bash
# Verificar se aplicação está rodando
pm2 status

# Verificar se porta 3001 está aberta
sudo netstat -tulpn | grep :3001

# Reiniciar aplicação
pm2 restart brisa-azul

# Ver logs
pm2 logs brisa-azul
```

---

## 📝 Configuração Alternativa (Aceitar Qualquer Host)

Se quiser que o Nginx aceite qualquer host (útil para testes):

```bash
sudo nano /etc/nginx/sites-available/brisa-azul
```

**Use esta configuração:**

```nginx
server {
    listen 80 default_server;
    server_name _;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Depois:**
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## ✅ Checklist Final

- [ ] Nginx configurado com IP 193.160.119.67
- [ ] Nginx testado (nginx -t passou)
- [ ] Nginx reiniciado
- [ ] Firewall configurado (portas 80 e 443 abertas)
- [ ] PM2 rodando (status: online)
- [ ] Aplicação responde em http://localhost:3001
- [ ] Site acessível em http://193.160.119.67

---

## 🎉 Pronto!

Acesse **http://193.160.119.67** no seu navegador e seu site deve aparecer!

---

## 💡 Dica: Adicionar Domínio Depois

Se você quiser adicionar um domínio depois:

1. Configure o DNS do domínio para apontar para o IP: `193.160.119.67`
2. Edite o arquivo do Nginx:
   ```bash
   sudo nano /etc/nginx/sites-available/brisa-azul
   ```
3. Mude `server_name 193.160.119.67;` para `server_name seudominio.com www.seudominio.com;`
4. Reinicie o Nginx: `sudo systemctl restart nginx`

---

**Execute os comandos acima e seu site estará acessível pelo IP! 🚀**

