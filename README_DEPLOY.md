# 🚀 Deploy na Hostinger - Brisa Azul Resort

Este repositório contém todos os arquivos necessários para fazer o deploy do projeto **Brisa Azul - Resort & Spa Hotel** na Hostinger usando PM2.

## 📁 Arquivos de Deploy

- **`ecosystem.config.cjs`** - Configuração do PM2
- **`deploy.sh`** - Script para atualizar o projeto (após primeiro deploy)
- **`setup-inicial.sh`** - Script para configurar o ambiente (execute apenas uma vez)
- **`GUIA_RAPIDO.md`** - Guia rápido com comandos prontos
- **`COMANDOS_HOSTINGER.md`** - Guia detalhado passo a passo
- **`DEPLOY_HOSTINGER.md`** - Documentação completa

## ⚡ Início Rápido

### 1. Conectar ao servidor SSH da Hostinger

```bash
ssh usuario@seu-ip-ou-dominio
```

### 2. Executar setup inicial (apenas uma vez)

```bash
# Baixar e executar o script de setup
curl -o setup-inicial.sh https://raw.githubusercontent.com/marcosg432/casa10/main/setup-inicial.sh
chmod +x setup-inicial.sh
./setup-inicial.sh
```

### 3. Clonar e configurar o projeto

```bash
cd ~
git clone https://github.com/marcosg432/casa10.git
cd casa10
npm install
npm run build
```

### 4. Iniciar com PM2

```bash
pm2 start ecosystem.config.cjs
pm2 startup
# Execute o comando que aparecer na tela
pm2 save
```

### 5. Configurar Nginx

Siga as instruções no arquivo **`GUIA_RAPIDO.md`** para configurar o Nginx.

## 📖 Documentação Completa

- **Para iniciantes**: Leia o `GUIA_RAPIDO.md`
- **Para referência detalhada**: Leia o `COMANDOS_HOSTINGER.md`
- **Para documentação completa**: Leia o `DEPLOY_HOSTINGER.md`

## 🔄 Atualizar o Projeto

Após o primeiro deploy, para atualizar o projeto:

```bash
cd ~/casa10
./deploy.sh
```

Ou manualmente:

```bash
cd ~/casa10
git pull origin main
npm install
npm run build
pm2 restart brisa-azul
```

## 📝 Comandos Úteis do PM2

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

## ⚠️ Importante

- Substitua `seudominio.com` pelo seu domínio real na configuração do Nginx
- A aplicação roda na porta **3001** por padrão (pode ser alterada para 3005)
- Certifique-se de que as portas 80 (HTTP) e 443 (HTTPS) estão abertas no firewall

## 🆘 Problemas?

Consulte a seção de **Solução de Problemas** no arquivo `DEPLOY_HOSTINGER.md`.

---

**Desenvolvido para deploy na Hostinger com PM2** 🎉

