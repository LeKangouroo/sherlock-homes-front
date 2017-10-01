import './usage/usage';
import fs from 'fs';

const tasks = fs.readdirSync('./tasks/');

// Tasks loading
tasks.forEach((task) => require('./tasks/' + task));
