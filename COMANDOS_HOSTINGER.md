# 🚀 Comandos para Deploy na Hostinger

Execute estes comandos **no terminal SSH da Hostinger**, um por um:

---

## 1️⃣ Conectar ao Servidor

```bash
ssh usuario@seu-ip-ou-dominio
```

---

## 2️⃣ Instalar Node.js e PM2 (se ainda não tiver)

```bash
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

**OU se já tiver o repositório clonado:**

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

## 5️⃣ Configurar e Iniciar com PM2

```bash
# IMPORTANTE: Editar o caminho no ecosystem.config.cjs
# Abra o arquivo e altere o caminho 'cwd' para o caminho correto
nano ecosystem.config.cjs
# Altere: cwd: '/home/usuario/casa10' para o seu caminho real
# Salve com Ctrl+X, depois Y, depois Enter

# Iniciar aplicação com PM2
pm2 start ecosystem.config.cjs

# OU iniciar manualmente (se o arquivo não funcionar)
pm2 start npm --name "brisa-azul" -- run preview
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

## 7️⃣ Verificar se Está Funcionando

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs brisa-azul

# Testar se está respondendo
curl http://localhost:3001
```

---

## 8️⃣ Configurar Nginx (Proxy Reverso)

```bash
# Instalar Nginx (se não tiver)
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

**Salve e continue:**

```bash
# Ativar site
sudo ln -s /etc/nginx/sites-available/brisa-azul /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## 9️⃣ Comandos Úteis para Gerenciar

```bash
# Ver status
pm2 status

# Ver logs em tempo real
pm2 logs brisa-azul

# Reiniciar
pm2 restart brisa-azul

# Parar
pm2 stop brisa-azul

# Monitorar recursos
pm2 monit
```

---

## 🔄 Para Atualizar o Projeto (quando houver mudanças)

```bash
cd ~/casa10
git pull origin main
npm install
npm run build
pm2 restart brisa-azul
```

**OU use o script de deploy:**

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## ⚠️ IMPORTANTE

1. **Substitua `seudominio.com`** pelo seu domínio real na configuração do Nginx
2. **Altere o caminho** no `ecosystem.config.cjs` para o caminho real do seu projeto
3. **Verifique a porta** - o projeto usa porta 3001 por padrão
4. Se a porta for diferente, ajuste no Nginx e no ecosystem.config.cjs

---

## ✅ Checklist

- [ ] Node.js instalado
- [ ] PM2 instalado
- [ ] Repositório clonado
- [ ] Dependências instaladas
- [ ] Build criado
- [ ] PM2 iniciado e funcionando
- [ ] PM2 configurado para iniciar no boot
- [ ] Nginx configurado
- [ ] Site acessível

---

**Pronto! Seu site deve estar funcionando! 🎉**

