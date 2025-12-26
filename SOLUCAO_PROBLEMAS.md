# 🔧 Solução de Problemas - Servidor Hostinger

## ⚠️ Problemas Encontrados

1. **Erros de conexão com repositórios Ubuntu**
2. **Node.js 18.x está deprecado**

---

## ✅ Solução Completa

### 1️⃣ Corrigir Repositórios Ubuntu

```bash
# Atualizar lista de repositórios
sudo apt-get update --fix-missing

# Se ainda não funcionar, trocar o mirror
sudo sed -i 's|http://ubuntu.mirror.vu.lt/ubuntu|http://archive.ubuntu.com/ubuntu|g' /etc/apt/sources.list

# Atualizar novamente
sudo apt-get update
```

**OU usar mirror brasileiro:**

```bash
# Editar sources.list
sudo nano /etc/apt/sources.list

# Substituir todas as ocorrências de:
# http://ubuntu.mirror.vu.lt/ubuntu
# Por:
# http://archive.ubuntu.com/ubuntu

# Salvar e atualizar
sudo apt-get update
```

---

### 2️⃣ Instalar Node.js 20.x (Versão Atual Suportada)

```bash
# Remover Node.js 18.x se já estiver instalado
sudo apt-get remove nodejs npm -y

# Limpar cache
sudo apt-get autoremove -y
sudo apt-get autoclean

# Instalar Node.js 20.x (LTS - Long Term Support)
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

### 3️⃣ Instalar PM2 e Nginx

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

### 4️⃣ Continuar com o Deploy

Agora continue com os comandos normais:

```bash
# Clonar repositório
cd ~
git clone https://github.com/marcosg432/casa10.git
cd casa10

# Instalar dependências
npm install

# Fazer build
npm run build

# Iniciar com PM2
pm2 start ecosystem.config.cjs
pm2 startup
# Execute o comando que aparecer
pm2 save
```

---

## 🚀 Comandos Rápidos (Tudo de Uma Vez)

Execute estes comandos na ordem:

```bash
# 1. Corrigir repositórios
sudo sed -i 's|http://ubuntu.mirror.vu.lt/ubuntu|http://archive.ubuntu.com/ubuntu|g' /etc/apt/sources.list
sudo apt-get update

# 2. Remover Node.js antigo (se existir)
sudo apt-get remove nodejs npm -y 2>/dev/null
sudo apt-get autoremove -y

# 3. Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Verificar versão
node --version
npm --version

# 5. Instalar PM2 e Nginx
sudo npm install pm2@latest -g
sudo apt-get install nginx -y

# 6. Clonar e configurar projeto
cd ~
git clone https://github.com/marcosg432/casa10.git
cd casa10
npm install
npm run build

# 7. Iniciar com PM2
pm2 start ecosystem.config.cjs
pm2 startup
# Execute o comando que aparecer
pm2 save

# 8. Configurar Nginx
sudo nano /etc/nginx/sites-available/brisa-azul
```

**Cole no Nginx (substitua `seudominio.com`):**
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

**Salve:** `Ctrl+X`, `Y`, `Enter`

**Continue:**
```bash
sudo ln -s /etc/nginx/sites-available/brisa-azul /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Verificar
pm2 status
curl http://localhost:3001
```

---

## 📝 Notas Importantes

- **Node.js 20.x** é a versão LTS atual e será suportada até 2026
- Os erros de repositório são comuns em servidores VPS e podem ser resolvidos trocando o mirror
- Se ainda houver problemas de conexão, tente usar um mirror brasileiro:
  ```bash
  sudo sed -i 's|http://archive.ubuntu.com/ubuntu|http://br.archive.ubuntu.com/ubuntu|g' /etc/apt/sources.list
  sudo apt-get update
  ```

---

## ✅ Verificação Final

```bash
# Verificar versões
node --version  # Deve ser v20.x.x
npm --version   # Deve ser 10.x.x
pm2 --version   # Deve ser 5.x.x

# Verificar se aplicação está rodando
pm2 status
pm2 logs brisa-azul

# Verificar Nginx
sudo systemctl status nginx
curl http://localhost:3001
```

---

**Pronto! Problemas resolvidos! 🎉**

