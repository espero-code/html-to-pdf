module.exports = {
  apps: [
    {
      name: "html-to-pdf",
      script: "src/server.js",
      type: "module",
      instances: 2,
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "development",
        PORT: 7890,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 7890,
      },
      error_file: "logs/err.log",
      out_file: "logs/out.log",
      log_file: "logs/combined.log",
      time: true,
      autorestart: true,
      restart_delay: 1000,
      merge_logs: true,
    },
  ],
};
