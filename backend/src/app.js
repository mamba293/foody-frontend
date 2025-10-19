import 'dotenv/config';
import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/index.js';
import errorMiddleware from './middlewares/error-middleware.js';


const app = express();

app.use(express.json());
app.use(cookieParser())
// app.use(cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL
// }));
app.use(cors())

app.use('/api', router);

app.use(errorMiddleware);

export default app;
