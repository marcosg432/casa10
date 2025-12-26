# ⚡ Guia Rápido - Deploy na Hostinger

## 📋 Resumo dos Passos

1. Conectar via SSH
2. Instalar Node.js e PM2
3. Clonar repositório
4. Instalar dependências e fazer build
5. Iniciar com PM2
6. Configurar Nginx

---

## 🚀 Comandos Rápidos (Copie e Cole)

### Passo 1: Conectar e Preparar Ambiente

```bash
# Conectar ao servidor
ssh usuario@seu-ip

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2
sudo npm install pm2@latest -g
```

### Passo 2: Clonar e Configurar Projeto

```bash
# Ir para home e clonar
cd ~
git clone https://github.com/marcosg432/casa10.git
cd casa10

# Instalar dependências
npm install

# Fazer build
npm run build
```

### Passo 3: Iniciar com PM2

```bash
# Iniciar aplicação (execute dentro da pasta casa10)
pm2 start ecosystem.config.cjs

# Configurar para iniciar no boot
pm2 startup
# Execute o comando que aparecer na tela

# Salvar configuração
pm2 save
```

### Passo 4: Configurar Nginx

```bash
# Instalar Nginx
sudo apt-get install nginx -y

# Criar configuração
sudo nano /etc/nginx/sites-available/brisa-azul
```

**Cole isso (substitua `seudominio.com`):**
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
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Continue:**
```bash
# Ativar e reiniciar
sudo ln -s /etc/nginx/sites-available/brisa-azul /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## ✅ Verificar

```bash
# Ver status do PM2
pm2 status

# Ver logs
pm2 logs brisa-azul

# Testar localmente
curl http://localhost:3001
```

---

## 🔄 Atualizar Projeto (Futuro)

```bash
cd ~/casa10
git pull origin main
npm install
npm run build
pm2 restart brisa-azul
```

---

## 📝 Notas

- **Porta padrão**: 3001
- **Domínio**: Substitua `seudominio.com` pelo seu domínio real
- **Caminho**: O PM2 vai usar o diretório atual automaticamente
- **Logs**: `pm2 logs brisa-azul` para ver os logs

---

**Pronto! 🎉**

