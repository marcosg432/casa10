# 🖥️ Comandos para Terminal da Hostinger

## 📋 Comandos Prontos para Copiar e Colar

Execute estes comandos **no terminal SSH da Hostinger**, na ordem apresentada:

---

## 1️⃣ Conectar ao Servidor

```bash
ssh usuario@seu-ip-ou-dominio
```

---

## 2️⃣ Instalar Node.js e PM2

```bash
# Atualizar sistema
sudo apt-get update

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 globalmente
sudo npm install pm2@latest -g

# Verificar instalações
node --version
npm --version
pm2 --version
```

---

## 3️⃣ Clonar o Repositório

```bash
# Ir para o diretório home
cd ~

# Clonar o repositório
git clone https://github.com/marcosg432/casa10.git

# Entrar no projeto
cd casa10
```

**OU se já tiver clonado:**

```bash
cd ~/casa10
git pull origin main
```

---

## 4️⃣ Instalar Dependências e Fazer Build

```bash
# Instalar dependências
npm install

# Criar build de produção
npm run build
```

---

## 5️⃣ Iniciar com PM2 (Porta 3001)

```bash
# Iniciar aplicação com PM2
pm2 start ecosystem.config.cjs

# Verificar se está rodando
pm2 status

# Ver logs
pm2 logs brisa-azul
```

---

## 6️⃣ Configurar PM2 para Iniciar Automaticamente

```bash
# Gerar comando de startup
pm2 startup

# Execute o comando que aparecer na tela (será algo como):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u seu-usuario --hp /home/seu-usuario

# Salvar configuração
pm2 save
```

---

## 7️⃣ Instalar e Configurar Nginx

```bash
# Instalar Nginx
sudo apt-get install nginx -y

# Criar arquivo de configuração
sudo nano /etc/nginx/sites-available/brisa-azul
```

**Cole este conteúdo (substitua `seudominio.com` pelo seu domínio):**

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

**Salve com:** `Ctrl+X`, depois `Y`, depois `Enter`

**Continue:**

```bash
# Ativar o site
sudo ln -s /etc/nginx/sites-available/brisa-azul /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## 8️⃣ Verificar se Está Funcionando

```bash
# Ver status do PM2
pm2 status

# Ver logs em tempo real
pm2 logs brisa-azul

# Testar se está respondendo na porta 3001
curl http://localhost:3001

# Verificar se Nginx está rodando
sudo systemctl status nginx
```

---

## 🔄 Comandos Úteis do PM2

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs brisa-azul

# Reiniciar aplicação
pm2 restart brisa-azul

# Parar aplicação
pm2 stop brisa-azul

# Monitorar recursos (CPU, memória)
pm2 monit

# Ver informações detalhadas
pm2 show brisa-azul
```

---

## 🔄 Atualizar o Projeto (Quando Houver Mudanças)

```bash
# Entrar no diretório
cd ~/casa10

# Atualizar código
git pull origin main

# Reinstalar dependências (se necessário)
npm install

# Fazer novo build
npm run build

# Reiniciar aplicação
pm2 restart brisa-azul
```

**OU use o script de deploy:**

```bash
cd ~/casa10
chmod +x deploy.sh
./deploy.sh
```

---

## 🔧 Usar Porta 3005 (Alternativa)

Se quiser usar a porta 3005 ao invés de 3001:

```bash
# Editar configuração do Vite
nano vite.config.js
```

**Altere a linha:**
```javascript
preview: {
  host: true,
  port: 3005  // Mude de 3001 para 3005
}
```

**E no ecosystem.config.cjs:**
```bash
nano ecosystem.config.cjs
```

**Altere:**
```javascript
env: {
  NODE_ENV: 'production',
  PORT: 3005  // Mude de 3001 para 3005
}
```

**Depois:**
```bash
# Rebuild
npm run build

# Reiniciar PM2
pm2 restart brisa-azul

# Atualizar Nginx (edite o arquivo de configuração)
sudo nano /etc/nginx/sites-available/brisa-azul
# Mude proxy_pass http://localhost:3001; para proxy_pass http://localhost:3005;

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## 🐛 Solução de Problemas

### Porta já em uso

```bash
# Verificar qual processo está usando a porta
sudo netstat -tulpn | grep 3001

# OU
sudo lsof -i :3001

# Matar processo (substitua PID pelo número)
kill -9 PID
```

### Aplicação não inicia

```bash
# Ver logs detalhados
pm2 logs brisa-azul --lines 50

# Verificar se o build foi criado
ls -la dist/

# Verificar Node.js
node --version
```

### Nginx não redireciona

```bash
# Verificar configuração
sudo nginx -t

# Ver logs do Nginx
sudo tail -f /var/log/nginx/error.log

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## ✅ Checklist Final

- [ ] Node.js instalado
- [ ] PM2 instalado
- [ ] Repositório clonado
- [ ] Dependências instaladas
- [ ] Build criado
- [ ] PM2 iniciado e funcionando na porta 3001
- [ ] PM2 configurado para iniciar no boot
- [ ] Nginx instalado e configurado
- [ ] Site acessível via domínio

---

**Pronto! Seu site deve estar funcionando na porta 3001! 🎉**

