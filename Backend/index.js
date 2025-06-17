import express from 'express';
import {router} from './src/routes/router.js';
import cors from 'cors';

const app = express();
app.use(cors());


app.use(express.json());


app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
console.log("funcionando");

app.use('/api',router);
