// Script para otimizar todas as imagens automaticamente
import sharp from 'sharp'
import { readdir, stat, mkdir } from 'fs/promises'
import { join, dirname, extname } from 'path'
import { existsSync, writeFileSync, unlinkSync, readFileSync } from 'fs'

const IMAGE_DIR = './public/imagem'
const MAX_WIDTH = 1920
const QUALITY = 85

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = await stat(inputPath)
    const ext = extname(inputPath).toLowerCase()
    
    // Verificar se já é pequena (< 500KB), pular
    if (stats.size < 500 * 1024) {
      console.log(`⏭️  Já otimizada (pequena): ${inputPath}`)
      return
    }

    console.log(`🔄 Otimizando: ${inputPath}`)
    
    // Ler imagem em buffer primeiro para evitar problemas no Windows
    const inputBuffer = readFileSync(inputPath)
    let image = sharp(inputBuffer)
    const metadata = await image.metadata()
    
    // Redimensionar se muito grande
    if (metadata.width > MAX_WIDTH) {
      image = image.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      console.log(`   📐 Redimensionando de ${metadata.width}px para ${MAX_WIDTH}px`)
    }

    // Otimizar baseado no formato e obter buffer
    let optimizedBuffer
    if (ext === '.png') {
      optimizedBuffer = await image
        .png({ 
          quality: 90,
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toBuffer()
    } else if (ext === '.jpg' || ext === '.jpeg') {
      optimizedBuffer = await image
        .jpeg({ 
          quality: QUALITY,
          mozjpeg: true
        })
        .toBuffer()
    } else if (ext === '.webp') {
      optimizedBuffer = await image
        .webp({ 
          quality: QUALITY
        })
        .toBuffer()
    } else {
      // Copiar outros formatos sem otimizar
      optimizedBuffer = await image.toBuffer()
    }

    // Substituir arquivo original pelo otimizado apenas se ficou menor
    if (optimizedBuffer.length < stats.size) {
      // Usar writeFileSync com flag para sobrescrever
      writeFileSync(outputPath, optimizedBuffer, { flag: 'w' })
      
      const reduction = ((1 - optimizedBuffer.length / stats.size) * 100).toFixed(1)
      const sizeMB = (optimizedBuffer.length / (1024 * 1024)).toFixed(2)
      const oldSizeMB = (stats.size / (1024 * 1024)).toFixed(2)
      
      console.log(`   ✅ ${oldSizeMB}MB → ${sizeMB}MB (${reduction}% menor)`)
    } else {
      console.log(`   ⏭️  Mantida original (já otimizada)`)
    }
    
  } catch (error) {
    console.error(`   ❌ Erro ao otimizar ${inputPath}:`, error.message)
  }
}

async function processDirectory(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      
      if (entry.isDirectory()) {
        await processDirectory(fullPath)
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase()
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
          await optimizeImage(fullPath, fullPath) // Sobrescreve a original
        }
      }
    }
  } catch (error) {
    console.error(`Erro ao processar diretório ${dir}:`, error.message)
  }
}

async function main() {
  console.log('🚀 Iniciando otimização de imagens...')
  console.log(`📁 Processando: ${IMAGE_DIR}`)
  console.log(`⚙️  Configurações: Max ${MAX_WIDTH}px, Qualidade ${QUALITY}%`)
  console.log('')
  
  if (!existsSync(IMAGE_DIR)) {
    console.error(`❌ Diretório não encontrado: ${IMAGE_DIR}`)
    process.exit(1)
  }

  const startTime = Date.now()
  await processDirectory(IMAGE_DIR)
  const endTime = Date.now()
  
  console.log('')
  console.log(`✅ Otimização concluída em ${((endTime - startTime) / 1000).toFixed(1)}s`)
  console.log('💡 Dica: Faça um novo build após a otimização')
}

main().catch(console.error)

