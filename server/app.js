import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import router from './routers/index.js';
import syncDatabase from './db/syncDb.js';
import addSampleData from './sidders/index.js';
import dropAllTables from './db/dropDb.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', router)


syncDatabase().then(() => addSampleData())
// dropAllTables()

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});