# 📤 Comandos para Enviar Arquivos ao GitHub

Execute estes comandos no seu terminal **local** (não no servidor da Hostinger):

## 1️⃣ Verificar Status

```bash
git status
```

## 2️⃣ Adicionar Todos os Arquivos de Deploy

```bash
git add ecosystem.config.cjs
git add deploy.sh
git add setup-inicial.sh
git add GUIA_RAPIDO.md
git add COMANDOS_HOSTINGER.md
git add DEPLOY_HOSTINGER.md
git add README_DEPLOY.md
git add .gitignore
```

**OU adicionar tudo de uma vez:**

```bash
git add .
```

## 3️⃣ Fazer Commit

```bash
git commit -m "Adiciona arquivos de deploy para Hostinger com PM2"
```

## 4️⃣ Enviar para o GitHub

```bash
git push origin main
```

**OU se a branch for `master`:**

```bash
git push origin master
```

---

## ✅ Verificar se Foi Enviado

Acesse: https://github.com/marcosg432/casa10

Você deve ver os seguintes arquivos:
- ✅ `ecosystem.config.cjs`
- ✅ `deploy.sh`
- ✅ `setup-inicial.sh`
- ✅ `GUIA_RAPIDO.md`
- ✅ `COMANDOS_HOSTINGER.md`
- ✅ `DEPLOY_HOSTINGER.md`
- ✅ `README_DEPLOY.md`
- ✅ `.gitignore`

---

## 🚀 Depois de Enviar

No servidor da Hostinger, execute:

```bash
cd ~/casa10
git pull origin main
```

Isso vai baixar todos os arquivos de deploy!

