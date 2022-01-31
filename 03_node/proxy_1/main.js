// @ts-check
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from "./routes/index.js";
import rateLimit from "express-rate-limit";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(rateLimit({
    max: 5, // max 5 requests
    windowMs: 10 * 60 * 1000, // 10 minutes, пауза после 5 запросов
}));
app.set('trust proxy', 1);
app.use(cors());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});