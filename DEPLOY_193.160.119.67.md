# 🚀 Deploy no Servidor 193.160.119.67

## 📋 Comandos Completos para Executar

Execute estes comandos **na ordem apresentada** no terminal SSH do servidor.

---

## 1️⃣ Conectar ao Servidor

```bash
ssh root@193.160.119.67
```

---

## 2️⃣ Atualizar Sistema e Instalar Node.js

```bash
# Atualizar sistema
sudo apt-get update
sudo apt-get upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalação
node --version
npm --version
```

---

## 3️⃣ Instalar PM2 e Nginx

```bash
# Instalar PM2 globalmente
sudo npm install pm2@latest -g

# Instalar Nginx
sudo apt-get install nginx -y

# Verificar instalações
pm2 --version
nginx -v
```

---

## 4️⃣ Clonar o Repositório

```bash
# Ir para o diretório home
cd ~

# Clonar o repositório
git clone https://github.com/marcosg432/casa10.git

# Entrar no projeto
cd casa10
```

---

## 5️⃣ Instalar Dependências e Fazer Build

```bash
# Instalar dependências
npm install

# Criar build de produção
npm run build
```

---

## 6️⃣ Iniciar com PM2 (Porta 3001)

```bash
# Iniciar aplicação
pm2 start ecosystem.config.cjs

# Verificar status
pm2 status

# Ver logs
pm2 logs brisa-azul
```

---

## 7️⃣ Configurar PM2 para Iniciar no Boot

```bash
# Gerar comando de startup
pm2 startup

# Execute o comando que aparecer na tela (será algo como):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root

# Salvar configuração
pm2 save
```

---

## 8️⃣ Configurar Nginx

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

**Continue:**

```bash
# Ativar o site
sudo ln -s /etc/nginx/sites-available/brisa-azul /etc/nginx/sites-enabled/

# Remover configuração padrão (opcional)
sudo rm /etc/nginx/sites-enabled/default

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## 9️⃣ Verificar se Está Funcionando

```bash
# Ver status do PM2
pm2 status

# Ver logs em tempo real
pm2 logs brisa-azul

# Testar se está respondendo
curl http://localhost:3001

# Verificar status do Nginx
sudo systemctl status nginx

# Verificar se a porta está aberta
sudo netstat -tulpn | grep 3001
```

---

## 🔄 Comandos Úteis

### Gerenciar PM2

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs brisa-azul

# Reiniciar
pm2 restart brisa-azul

# Parar
pm2 stop brisa-azul

# Monitorar recursos
pm2 monit
```

### Gerenciar Nginx

```bash
# Reiniciar
sudo systemctl restart nginx

# Ver status
sudo systemctl status nginx

# Ver logs de erro
sudo tail -f /var/log/nginx/error.log

# Ver logs de acesso
sudo tail -f /var/log/nginx/access.log
```

### Atualizar Projeto

```bash
cd ~/casa10
git pull origin main
npm install
npm run build
pm2 restart brisa-azul
```

---

## 🔧 Usar Porta 3005 (Se Precisar)

Se quiser usar a porta 3005:

```bash
# Editar vite.config.js
cd ~/casa10
nano vite.config.js
```

**Mude:**
```javascript
preview: {
  host: true,
  port: 3005  // Mude de 3001 para 3005
}
```

**E editar ecosystem.config.cjs:**
```bash
nano ecosystem.config.cjs
```

**Mude:**
```javascript
env: {
  NODE_ENV: 'production',
  PORT: 3005  // Mude de 3001 para 3005
}
```

**Depois:**
```bash
npm run build
pm2 restart brisa-azul
sudo nano /etc/nginx/sites-available/brisa-azul
# Mude proxy_pass http://localhost:3001; para proxy_pass http://localhost:3005;
sudo systemctl restart nginx
```

---

## 🐛 Solução de Problemas

### Porta 3001 já em uso

```bash
# Verificar qual processo está usando
sudo lsof -i :3001

# Matar processo (substitua PID)
kill -9 PID
```

### Aplicação não inicia

```bash
# Ver logs detalhados
pm2 logs brisa-azul --lines 100

# Verificar se build existe
ls -la ~/casa10/dist/
```

### Nginx não funciona

```bash
# Verificar configuração
sudo nginx -t

# Ver logs
sudo tail -50 /var/log/nginx/error.log
```

---

## ✅ Checklist

- [ ] Conectado ao servidor via SSH
- [ ] Node.js instalado
- [ ] PM2 instalado
- [ ] Nginx instalado
- [ ] Repositório clonado
- [ ] Dependências instaladas
- [ ] Build criado
- [ ] PM2 iniciado na porta 3001
- [ ] PM2 configurado para iniciar no boot
- [ ] Nginx configurado
- [ ] Site acessível

---

**Pronto! 🎉**

