import express from 'express';
import cors from 'cors';
import UserRouter from './UserRouter.js';
import DialogRouter from './DialogRouter.js';
export const Base = 'src/users.json';
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.get('/error', (req, res) => {
    res.sendStatus(404);
});
app.use('/dialog', DialogRouter);
app.use('/user', UserRouter);
app.use((req, res) => {
    res.redirect('/error');
});
app.listen(PORT, () => {
    console.log(`server works ,PORT ${PORT}`);
});
