import loadenv from './src/common/loadenv/index';
loadenv();

const baseConfig = {
    type: 'mysql',
    database: process.env.MYSQL_DATABASE,
    entities: [path.resolve(__dirname, 'src/**/*.entity{.ts,.js}')],
};

module.exports = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    synchronize: true,
    ...baseConfig,
};