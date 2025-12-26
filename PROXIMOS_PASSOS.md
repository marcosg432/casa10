# ✅ Próximos Passos - Nginx Instalado!

## 🎉 Nginx foi instalado com sucesso!

Agora execute estes comandos **na ordem**:

---

## 1️⃣ Verificar Node.js e PM2

```bash
# Verificar se Node.js está instalado
node --version

# Se não estiver instalado, instale Node.js 20.x:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 (se ainda não tiver)
sudo npm install pm2@latest -g

# Verificar
pm2 --version
```

---

## 2️⃣ Clonar o Repositório

```bash
# Ir para home
cd ~

# Clonar repositório
git clone https://github.com/marcosg432/casa10.git

# Entrar no projeto
cd casa10
```

---

## 3️⃣ Instalar Dependências e Fazer Build

```bash
# Instalar dependências
npm install

# Criar build de produção
npm run build
```

---

## 4️⃣ Iniciar com PM2

```bash
# Iniciar aplicação
pm2 start ecosystem.config.cjs

# Verificar status
pm2 status

# Ver logs
pm2 logs brisa-azul
```

---

## 5️⃣ Configurar PM2 para Iniciar no Boot

```bash
# Gerar comando de startup
pm2 startup

# Execute o comando que aparecer na tela (será algo como):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root

# Salvar configuração
pm2 save
```

---

## 6️⃣ Configurar Nginx para o Site

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

## 7️⃣ Ativar Site e Reiniciar Nginx

```bash
# Ativar o site
sudo ln -s /etc/nginx/sites-available/brisa-azul /etc/nginx/sites-enabled/

# Remover configuração padrão (opcional)
sudo rm /etc/nginx/sites-enabled/default 2>/dev/null

# Testar configuração do Nginx
sudo nginx -t

# Se o teste passar, reiniciar Nginx
sudo systemctl restart nginx

# Verificar status do Nginx
sudo systemctl status nginx
```

---

## 8️⃣ Verificar se Está Funcionando

```bash
# Verificar PM2
pm2 status

# Verificar se aplicação está respondendo
curl http://localhost:3001

# Verificar Nginx
sudo systemctl status nginx

# Ver logs do Nginx (se necessário)
sudo tail -f /var/log/nginx/error.log
```

---

## 🔄 Comandos Rápidos (Tudo de Uma Vez)

Se quiser executar tudo rapidamente:

```bash
# 1. Verificar/Instalar Node.js e PM2
node --version || (curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs)
sudo npm install pm2@latest -g

# 2. Clonar e configurar
cd ~
git clone https://github.com/marcosg432/casa10.git
cd casa10
npm install
npm run build

# 3. Iniciar PM2
pm2 start ecosystem.config.cjs
pm2 startup
# Execute o comando que aparecer
pm2 save

# 4. Configurar Nginx (você precisa editar manualmente)
sudo nano /etc/nginx/sites-available/brisa-azul
# Cole a configuração acima

# 5. Ativar e reiniciar
sudo ln -s /etc/nginx/sites-available/brisa-azul /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
```

---

## 📝 Nota sobre Atualização de Kernel

A mensagem sobre atualização de kernel não é crítica agora. Você pode reiniciar o servidor depois que tudo estiver funcionando:

```bash
# Reiniciar servidor (fazer depois que tudo estiver funcionando)
sudo reboot
```

---

## ✅ Checklist Final

- [ ] Node.js instalado (v20.x.x)
- [ ] PM2 instalado
- [ ] Repositório clonado
- [ ] Dependências instaladas
- [ ] Build criado
- [ ] PM2 iniciado e funcionando
- [ ] PM2 configurado para iniciar no boot
- [ ] Nginx configurado para o site
- [ ] Nginx reiniciado
- [ ] Site acessível

---

**Continue com os passos acima! 🚀**

