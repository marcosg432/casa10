# 🚀 Guia Completo de Deploy - Hostinger

Este guia vai te ajudar a fazer o deploy do projeto **Brisa Azul - Resort & Spa Hotel** na Hostinger usando PM2.

## 📋 Pré-requisitos

- Acesso SSH ao servidor Hostinger
- Node.js instalado (versão 18 ou superior)
- Git instalado
- Domínio configurado na Hostinger

---

## 🔧 Passo 1: Conectar ao Servidor via SSH

```bash
ssh usuario@seu-ip-ou-dominio
```

**Exemplo:**
```bash
ssh root@192.168.1.100
# ou
ssh usuario@seudominio.com
```

---

## 📦 Passo 2: Instalar Dependências Necessárias

### 2.1 Atualizar o sistema
```bash
sudo apt-get update
sudo apt-get upgrade -y
```

### 2.2 Instalar Node.js (se não estiver instalado)
```bash
# Instalar Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalação
node --version
npm --version
```

### 2.3 Instalar Git (se não estiver instalado)
```bash
sudo apt-get install git -y
```

### 2.4 Instalar PM2 globalmente
```bash
sudo npm install pm2@latest -g
```

---

## 🔑 Passo 3: Configurar Chave SSH para GitHub

### 3.1 Gerar chave SSH (se ainda não tiver)
```bash
ssh-keygen -t rsa -b 4096 -C "seu-email@example.com"
# Pressione Enter para aceitar o local padrão
# Opcional: defina uma senha para a chave
```

### 3.2 Exibir a chave pública
```bash
cat ~/.ssh/id_rsa.pub
```

### 3.3 Adicionar chave no GitHub
1. Copie o conteúdo exibido acima
2. Acesse: https://github.com/settings/keys
3. Clique em "New SSH key"
4. Cole a chave e salve

---

## 📥 Passo 4: Clonar o Repositório

```bash
# Navegar para o diretório desejado (exemplo: /home/usuario)
cd ~

# Clonar o repositório
git clone git@github.com:marcosg432/casa10.git

# Entrar no diretório do projeto
cd casa10
```

---

## 📦 Passo 5: Instalar Dependências do Projeto

```bash
# Instalar todas as dependências
npm install

# Se houver erros, tente com --legacy-peer-deps
npm install --legacy-peer-deps
```

---

## 🏗️ Passo 6: Build do Projeto

```bash
# Criar build de produção
npm run build
```

Isso criará a pasta `dist/` com os arquivos otimizados.

---

## ⚙️ Passo 7: Configurar PM2

### 7.1 Usar o arquivo de configuração do PM2

O projeto já possui um arquivo `ecosystem.config.cjs` configurado. Para iniciar:

```bash
# Iniciar aplicação com PM2 usando o arquivo de configuração
pm2 start ecosystem.config.cjs

# Ou iniciar manualmente
pm2 start npm --name "brisa-azul" -- start
```

### 7.2 Configurar PM2 para iniciar no boot

```bash
# Gerar script de startup
pm2 startup

# O comando acima vai mostrar um comando. Execute-o (será algo como):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u usuario --hp /home/usuario

# Salvar a lista de processos do PM2
pm2 save
```

---

## 🌐 Passo 8: Configurar Nginx (Proxy Reverso)

### 8.1 Instalar Nginx (se não estiver instalado)
```bash
sudo apt-get install nginx -y
```

### 8.2 Criar configuração do site
```bash
sudo nano /etc/nginx/sites-available/brisa-azul
```

### 8.3 Adicionar configuração (substitua `seudominio.com` pelo seu domínio)

```nginx
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;

    # Redirecionar HTTP para HTTPS (opcional, se tiver SSL)
    # return 301 https://$server_name$request_uri;

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

### 8.4 Ativar o site
```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/brisa-azul /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## 🔒 Passo 9: Configurar SSL (Opcional mas Recomendado)

### 9.1 Instalar Certbot
```bash
sudo apt-get install certbot python3-certbot-nginx -y
```

### 9.2 Obter certificado SSL
```bash
sudo certbot --nginx -d seudominio.com -d www.seudominio.com
```

Siga as instruções na tela. O Certbot vai configurar automaticamente o HTTPS.

---

## ✅ Passo 10: Verificar e Gerenciar a Aplicação

### 10.1 Comandos úteis do PM2

```bash
# Ver status da aplicação
pm2 status

# Ver logs em tempo real
pm2 logs brisa-azul

# Reiniciar aplicação
pm2 restart brisa-azul

# Parar aplicação
pm2 stop brisa-azul

# Deletar aplicação do PM2
pm2 delete brisa-azul

# Monitorar recursos (CPU, memória)
pm2 monit
```

### 10.2 Verificar se está funcionando
```bash
# Verificar se a aplicação está rodando na porta correta
curl http://localhost:3001

# Verificar logs do Nginx
sudo tail -f /var/log/nginx/error.log
```

---

## 🔄 Passo 11: Atualizar o Projeto (Futuras Atualizações)

Quando houver atualizações no GitHub:

```bash
# Entrar no diretório do projeto
cd ~/casa10

# Buscar atualizações
git pull origin main

# Reinstalar dependências (se necessário)
npm install

# Fazer novo build
npm run build

# Reiniciar aplicação no PM2
pm2 restart brisa-azul
```

---

## 🐛 Solução de Problemas

### Problema: Aplicação não inicia
```bash
# Verificar logs
pm2 logs brisa-azul --lines 50

# Verificar se a porta está em uso
sudo netstat -tulpn | grep 3001
```

### Problema: Nginx não redireciona
```bash
# Verificar configuração do Nginx
sudo nginx -t

# Ver logs do Nginx
sudo tail -f /var/log/nginx/error.log
```

### Problema: Porta já em uso
```bash
# Verificar processos na porta
sudo lsof -i :3001

# Matar processo (substitua PID pelo número do processo)
kill -9 PID
```

### Problema: Permissões
```bash
# Dar permissões ao diretório
sudo chown -R $USER:$USER ~/casa10
chmod -R 755 ~/casa10
```

---

## 📝 Notas Importantes

1. **Porta da Aplicação**: O projeto usa a porta `3001` por padrão. Verifique no `vite.config.js` se está configurada outra porta.

2. **Variáveis de Ambiente**: Se o projeto usar variáveis de ambiente, crie um arquivo `.env` na raiz do projeto.

3. **Firewall**: Certifique-se de que as portas 80 (HTTP) e 443 (HTTPS) estão abertas no firewall da Hostinger.

4. **Backup**: Faça backup regular dos dados:
   ```bash
   # Backup do diretório do projeto
   tar -czf backup-$(date +%Y%m%d).tar.gz ~/casa10
   ```

---

## 🎯 Checklist Final

- [ ] Node.js instalado e funcionando
- [ ] Git configurado com chave SSH
- [ ] Repositório clonado
- [ ] Dependências instaladas
- [ ] Build criado com sucesso
- [ ] PM2 instalado e configurado
- [ ] Aplicação rodando no PM2
- [ ] PM2 configurado para iniciar no boot
- [ ] Nginx configurado como proxy reverso
- [ ] SSL configurado (opcional)
- [ ] Site acessível via domínio

---

## 📞 Suporte

Se encontrar problemas, verifique:
- Logs do PM2: `pm2 logs`
- Logs do Nginx: `sudo tail -f /var/log/nginx/error.log`
- Status do sistema: `pm2 status` e `sudo systemctl status nginx`

---

**Pronto! Seu site está no ar! 🎉**

