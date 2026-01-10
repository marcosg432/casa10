module.exports = {
  apps: [
    {
      name: 'casa10inn',
      script: 'server.js',
      interpreter: 'node',
      // O PM2 vai usar o diretório atual automaticamente
      // Se precisar especificar, descomente a linha abaixo e ajuste o caminho:
      // cwd: process.env.HOME + '/casa10inn',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3004
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true,
      // Otimizações de performance
      exec_mode: 'fork',
      min_uptime: '10s',
      max_restarts: 10
    }
  ]
};

