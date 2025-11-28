import { Router } from 'express';
import Stockfish from '../../../helpers/stockfish.js';
import ChessGameEngineService from '../services/ChessGameEngineService.js';
import ChessGameEngineController from '../controllers/ChessGameEngineController.js';
import ChessGameEngineMiddleware from '../middlewares/ChessGameEngineMiddleware.js';

const chessGameController = new ChessGameEngineController(
	new ChessGameEngineService(Stockfish.getInstance())
);

const chessGameMiddleware = new ChessGameEngineMiddleware();

const router = Router();

router.post('/command', chessGameMiddleware.validateCommand, chessGameController.handleCommand);

export default router;