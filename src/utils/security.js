import bcrypt from 'bcryptjs'
import validator from 'validator'

// Configurações de segurança
const SALT_ROUNDS = 10
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000 // 24 horas em milissegundos
const CSRF_TOKEN_KEY = 'csrf_token'

// ========== HASH DE SENHAS ==========
export const hashPassword = async (password) => {
  if (!password || password.length < 6) {
    throw new Error('Senha deve ter pelo menos 6 caracteres')
  }
  return await bcrypt.hash(password, SALT_ROUNDS)
}

export const comparePassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    return false
  }
  return await bcrypt.compare(password, hashedPassword)
}

// ========== SANITIZAÇÃO DE INPUTS ==========
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return ''
  // Remove tags HTML e caracteres perigosos
  return validator.escape(validator.stripLow(str.trim()))
}

export const sanitizeEmail = (email) => {
  if (typeof email !== 'string') return ''
  const cleaned = email.trim().toLowerCase()
  return validator.isEmail(cleaned) ? cleaned : ''
}

export const sanitizePhone = (phone) => {
  if (typeof phone !== 'string') return ''
  // Remove caracteres não numéricos, exceto +, espaços e parênteses
  return phone.replace(/[^\d\s()+-]/g, '').trim()
}

export const sanitizeNumber = (num) => {
  if (typeof num === 'number') return num
  if (typeof num !== 'string') return 0
  const cleaned = num.replace(/[^\d.,]/g, '').replace(',', '.')
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? 0 : parsed
}

export const sanitizeText = (text) => {
  if (typeof text !== 'string') return ''
  // Remove tags HTML mas mantém quebras de linha
  return validator.escape(text.trim())
}

// ========== VALIDAÇÃO ==========
export const validateEmail = (email) => {
  return validator.isEmail(email)
}

export const validatePhone = (phone) => {
  // Valida formato básico de telefone brasileiro
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 11
}

export const validatePassword = (password) => {
  // Senha deve ter pelo menos 6 caracteres
  return password && password.length >= 6
}

export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined
}

// ========== TOKENS DE SESSÃO ==========
export const generateSessionToken = () => {
  // Gera um token aleatório seguro
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

export const createSession = (userId) => {
  const token = generateSessionToken()
  const expiresAt = Date.now() + SESSION_TIMEOUT
  
  const session = {
    token,
    userId,
    expiresAt,
    createdAt: Date.now()
  }
  
  // Armazena no localStorage (em produção, usar httpOnly cookies)
  localStorage.setItem('session_token', token)
  localStorage.setItem('session_expires', expiresAt.toString())
  
  return session
}

export const validateSession = () => {
  const token = localStorage.getItem('session_token')
  const expiresAt = localStorage.getItem('session_expires')
  
  if (!token || !expiresAt) {
    return false
  }
  
  const now = Date.now()
  const expiration = parseInt(expiresAt, 10)
  
  if (now > expiration) {
    // Sessão expirada
    clearSession()
    return false
  }
  
  return true
}

export const clearSession = () => {
  localStorage.removeItem('session_token')
  localStorage.removeItem('session_expires')
}

// ========== CSRF PROTECTION ==========
export const generateCSRFToken = () => {
  const token = generateSessionToken()
  sessionStorage.setItem(CSRF_TOKEN_KEY, token)
  return token
}

export const getCSRFToken = () => {
  return sessionStorage.getItem(CSRF_TOKEN_KEY)
}

export const validateCSRFToken = (token) => {
  const storedToken = getCSRFToken()
  return storedToken && storedToken === token
}

// ========== RATE LIMITING (simples) ==========
const loginAttempts = new Map()
const MAX_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutos

export const checkLoginAttempts = (email) => {
  const attempts = loginAttempts.get(email)
  
  if (!attempts) {
    return { allowed: true }
  }
  
  if (attempts.lockedUntil && Date.now() < attempts.lockedUntil) {
    const minutesLeft = Math.ceil((attempts.lockedUntil - Date.now()) / 60000)
    return {
      allowed: false,
      message: `Muitas tentativas de login. Tente novamente em ${minutesLeft} minutos.`
    }
  }
  
  if (attempts.count >= MAX_ATTEMPTS) {
    attempts.lockedUntil = Date.now() + LOCKOUT_TIME
    return {
      allowed: false,
      message: 'Muitas tentativas de login. Conta bloqueada por 15 minutos.'
    }
  }
  
  return { allowed: true }
}

export const recordLoginAttempt = (email, success) => {
  if (success) {
    loginAttempts.delete(email)
    return
  }
  
  const attempts = loginAttempts.get(email) || { count: 0 }
  attempts.count += 1
  attempts.lastAttempt = Date.now()
  
  if (attempts.count >= MAX_ATTEMPTS) {
    attempts.lockedUntil = Date.now() + LOCKOUT_TIME
  }
  
  loginAttempts.set(email, attempts)
}

// ========== SANITIZAÇÃO DE OBJETOS ==========
export const sanitizeObject = (obj, schema) => {
  const sanitized = {}
  
  for (const key in schema) {
    if (obj.hasOwnProperty(key)) {
      const type = schema[key]
      
      switch (type) {
        case 'string':
          sanitized[key] = sanitizeString(obj[key])
          break
        case 'email':
          sanitized[key] = sanitizeEmail(obj[key])
          break
        case 'phone':
          sanitized[key] = sanitizePhone(obj[key])
          break
        case 'number':
          sanitized[key] = sanitizeNumber(obj[key])
          break
        case 'text':
          sanitized[key] = sanitizeText(obj[key])
          break
        default:
          sanitized[key] = obj[key]
      }
    }
  }
  
  return sanitized
}



