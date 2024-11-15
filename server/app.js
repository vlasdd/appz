import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import router from './routers/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', router)

sequelize.authenticate()
  .then(async () => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});