module.exports = {
    apps: [
      {
        name: 'swagrun-app',
        cwd: '/home/ec2-user/backend',
        script: 'npm',
        args: 'start',
        env: {
          NODE_ENV: 'production',
          DATABASE_HOST: '127.0.0.1', // database Endpoint under 'Connectivity & Security' tab
          DATABASE_PORT: '3306',
          DATABASE_NAME: 'swagrun_cms', // DB name under 'Configuration' tab
          DATABASE_USERNAME: 'root', // default username
          DATABASE_PASSWORD: '@$NkKf4h/\Wm',
        },
      },
    ],
  };
  