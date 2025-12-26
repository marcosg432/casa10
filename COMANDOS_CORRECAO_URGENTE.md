# 🚨 Correção Urgente - Mirror Problemático

## ⚠️ Problema: Sistema travado tentando conectar ao mirror `ubuntu.mirror.vu.lt`

Execute estes comandos **AGORA** no terminal da Hostinger:

---

## 1️⃣ Parar o Processo Atual (Se Estiver Travado)

Pressione: `Ctrl+C` para cancelar o processo atual

---

## 2️⃣ Remover/Desabilitar o Mirror Problemático

```bash
# Editar sources.list
sudo nano /etc/apt/sources.list
```

**Procure por linhas que contenham `ubuntu.mirror.vu.lt` e:**

**OPÇÃO A - Comentar as linhas (adicionar # no início):**
```bash
# Comentar todas as linhas com ubuntu.mirror.vu.lt
# Exemplo: # deb http://ubuntu.mirror.vu.lt/ubuntu noble main
```

**OPÇÃO B - Substituir todas as ocorrências:**
```bash
# No terminal, execute:
sudo sed -i 's|http://ubuntu.mirror.vu.lt/ubuntu|http://archive.ubuntu.com/ubuntu|g' /etc/apt/sources.list
sudo sed -i 's|https://ubuntu.mirror.vu.lt/ubuntu|http://archive.ubuntu.com/ubuntu|g' /etc/apt/sources.list
```

**Salve:** `Ctrl+X`, depois `Y`, depois `Enter`

---

## 3️⃣ Limpar Cache e Atualizar

```bash
# Limpar cache do apt
sudo apt-get clean
sudo rm -rf /var/lib/apt/lists/*

# Atualizar lista de pacotes
sudo apt-get update
```

---

## 4️⃣ Instalar Node.js 20.x (NÃO 18.x)

```bash
# Remover qualquer instalação anterior do Node.js
sudo apt-get remove nodejs npm -y 2>/dev/null
sudo apt-get autoremove -y

# Instalar Node.js 20.x (versão LTS atual e suportada)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalação
node --version
npm --version
```

**Você deve ver:**
- Node.js: v20.x.x
- npm: 10.x.x

---

## 5️⃣ Instalar PM2 e Nginx

```bash
# Instalar PM2
sudo npm install pm2@latest -g

# Instalar Nginx
sudo apt-get install nginx -y

# Verificar
pm2 --version
nginx -v
```

---

## 6️⃣ Clonar e Configurar Projeto

```bash
# Ir para home
cd ~

# Clonar repositório
git clone https://github.com/marcosg432/casa10.git

# Entrar no projeto
cd casa10

# Instalar dependências
npm install

# Fazer build
npm run build
```

---

## 7️⃣ Iniciar com PM2

```bash
# Iniciar aplicação
pm2 start ecosystem.config.cjs

# Verificar status
pm2 status

# Ver logs
pm2 logs brisa-azul
```

---

## 8️⃣ Configurar PM2 para Iniciar no Boot

```bash
# Gerar comando de startup
pm2 startup

# Execute o comando que aparecer na tela (será algo como):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root

# Salvar configuração
pm2 save
```

---

## 9️⃣ Configurar Nginx

```bash
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

**Salve:** `Ctrl+X`, depois `Y`, depois `Enter`

**Continue:**

```bash
# Ativar site
sudo ln -s /etc/nginx/sites-available/brisa-azul /etc/nginx/sites-enabled/

# Remover default (opcional)
sudo rm /etc/nginx/sites-enabled/default 2>/dev/null

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## ✅ Verificar Tudo

```bash
# Verificar Node.js
node --version  # Deve ser v20.x.x

# Verificar PM2
pm2 status

# Verificar Nginx
sudo systemctl status nginx

# Testar aplicação
curl http://localhost:3001
```

---

## 🔧 Se Ainda Houver Problemas com o Mirror

```bash
# Verificar quais mirrors estão configurados
cat /etc/apt/sources.list | grep mirror

# Remover TODOS os mirrors problemáticos
sudo sed -i '/ubuntu.mirror.vu.lt/d' /etc/apt/sources.list

# Adicionar apenas archive.ubuntu.com
sudo sed -i 's|http://.*ubuntu|http://archive.ubuntu.com/ubuntu|g' /etc/apt/sources.list
sudo sed -i 's|https://.*ubuntu|http://archive.ubuntu.com/ubuntu|g' /etc/apt/sources.list

# Atualizar
sudo apt-get clean
sudo apt-get update
```

---

## 📝 Comandos Rápidos (Tudo de Uma Vez)

Se quiser fazer tudo rapidamente:

```bash
# 1. Parar processo atual (Ctrl+C se necessário)

# 2. Remover mirror problemático
sudo sed -i 's|http://ubuntu.mirror.vu.lt/ubuntu|http://archive.ubuntu.com/ubuntu|g' /etc/apt/sources.list
sudo sed -i 's|https://ubuntu.mirror.vu.lt/ubuntu|http://archive.ubuntu.com/ubuntu|g' /etc/apt/sources.list

# 3. Limpar e atualizar
sudo apt-get clean
sudo apt-get update

# 4. Instalar Node.js 20.x
sudo apt-get remove nodejs npm -y 2>/dev/null
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 5. Instalar PM2 e Nginx
sudo npm install pm2@latest -g
sudo apt-get install nginx -y

# 6. Clonar e configurar
cd ~
git clone https://github.com/marcosg432/casa10.git
cd casa10
npm install
npm run build

# 7. Iniciar PM2
pm2 start ecosystem.config.cjs
pm2 startup
# Execute o comando que aparecer
pm2 save
```

---

**Execute esses comandos na ordem e seu problema será resolvido! 🎉**

