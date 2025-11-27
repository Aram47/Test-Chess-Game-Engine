import { Router } from 'express';
import ChessGameEngineService from '../services/ChessGameEngineService.js';
import ChessGameEngineController from '../controllers/ChessGameEngineController.js';
import ChessGameEngineMiddleware from '../middlewares/ChessGameEngineMiddleware.js';

const chessGameController = new ChessGameEngineController(
	new ChessGameEngineService()
);
const chessGameMiddleware = new ChessGameEngineMiddleware();

const router = Router();

router.get('/isEngineReady', chessGameMiddleware.checkEngineReady, chessGameController.isEngineReady);

router.post('/command', chessGameMiddleware.validateCommand, chessGameController.handleCommand);

export default router;