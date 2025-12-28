module.exports = {
  apps: [
    {
      name: 'casa10inn',
      script: 'npm',
      args: 'run preview -- --port 3004 --host',
      // O PM2 vai usar o diretório atual automaticamente
      // Se precisar especificar, descomente a linha abaixo e ajuste o caminho:
      // cwd: process.env.HOME + '/casa10inn',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3004
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true
    }
  ]
};

