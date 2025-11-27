import cors from 'cors';
import express from 'express';
import chessGameEngineRouter from './routes/chessGameEngineRouter.js';

export default function setupHttp() {
	const app = express();

	app.use(express.json());
	app.use(cors());

	app.use('/chess-game-engine', chessGameEngineRouter);

	return app;
}