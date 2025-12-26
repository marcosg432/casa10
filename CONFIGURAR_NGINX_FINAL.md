# 🌐 Configurar Nginx - Aplicação Rodando!

## ✅ Status Atual

- ✅ Build criado com sucesso
- ✅ PM2 iniciado (brisa-azul está online)
- ✅ Aplicação rodando na porta 3001

---

## 🔧 Configurar Nginx

Execute estes comandos **agora**:

### 1️⃣ Verificar se Aplicação Está Respondendo

```bash
# Testar se está respondendo na porta 3001
curl http://localhost:3001
```

Se retornar HTML, está funcionando! ✅

---

### 2️⃣ Criar Configuração do Nginx

```bash
# Criar arquivo de configuração
sudo nano /etc/nginx/sites-available/brisa-azul
```

**Cole este conteúdo (substitua `seudominio.com` pelo seu domínio real):**

```nginx
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;

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

### 3️⃣ Ativar Site e Testar Configuração

```bash
# Ativar o site
sudo ln -s /etc/nginx/sites-available/brisa-azul /etc/nginx/sites-enabled/

# Remover configuração padrão (opcional)
sudo rm /etc/nginx/sites-enabled/default 2>/dev/null

# Testar configuração do Nginx
sudo nginx -t
```

**Se aparecer "syntax is ok" e "test is successful", continue:**

---

### 4️⃣ Reiniciar Nginx

```bash
# Reiniciar Nginx
sudo systemctl restart nginx

# Verificar status
sudo systemctl status nginx
```

---

### 5️⃣ Verificar Tudo

```bash
# Verificar PM2
pm2 status

# Verificar se aplicação responde
curl http://localhost:3001

# Verificar Nginx
sudo systemctl status nginx

# Ver logs do Nginx (se necessário)
sudo tail -f /var/log/nginx/error.log
```

---

## 🔄 Configurar PM2 para Iniciar no Boot

Se ainda não fez isso:

```bash
# Gerar comando de startup
pm2 startup

# Execute o comando que aparecer na tela (será algo como):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root

# Salvar configuração
pm2 save
```

---

## 🌍 Acessar o Site

Depois de configurar o Nginx:

1. **Se você configurou um domínio:**
   - Acesse: `http://seudominio.com`

2. **Se ainda não tem domínio configurado:**
   - Você pode acessar pelo IP: `http://193.160.119.67`
   - Mas precisa ajustar o Nginx para aceitar o IP:

```bash
sudo nano /etc/nginx/sites-available/brisa-azul
```

**Mude para:**
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

**Depois:**
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🐛 Solução de Problemas

### Nginx não inicia

```bash
# Verificar erros
sudo nginx -t

# Ver logs
sudo tail -50 /var/log/nginx/error.log
```

### Site não carrega

```bash
# Verificar se PM2 está rodando
pm2 status

# Verificar se aplicação responde
curl http://localhost:3001

# Verificar logs do PM2
pm2 logs brisa-azul

# Verificar logs do Nginx
sudo tail -f /var/log/nginx/error.log
```

### Porta 3001 não responde

```bash
# Verificar se porta está em uso
sudo netstat -tulpn | grep 3001

# Reiniciar PM2
pm2 restart brisa-azul

# Ver logs
pm2 logs brisa-azul --lines 50
```

---

## ✅ Checklist Final

- [ ] Aplicação rodando no PM2 (status: online)
- [ ] Aplicação responde em http://localhost:3001
- [ ] Nginx configurado
- [ ] Nginx testado (nginx -t passou)
- [ ] Nginx reiniciado
- [ ] PM2 configurado para iniciar no boot
- [ ] Site acessível via domínio ou IP

---

## 🎉 Pronto!

Seu site deve estar funcionando! Acesse pelo domínio ou IP configurado.

**Comandos úteis para o futuro:**

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs brisa-azul

# Reiniciar aplicação
pm2 restart brisa-azul

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

**Continue com a configuração do Nginx acima! 🚀**

