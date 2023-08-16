import { exit } from 'process';

const path = require('path');
const dotenv = require('dotenv');

export default () => {
    const dotenvPath = path.resolve(process.cwd(), `.env`);
    const result = dotenv.config({ path: dotenvPath });

    if (result.error) {
        console.error('The environment file does not found');
        exit(1);
    }
};
