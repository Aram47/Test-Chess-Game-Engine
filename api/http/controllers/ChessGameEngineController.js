export default class ChessGameEngineController {
	constructor(chessGameEngineService) {
		this.chessGameEngineService = chessGameEngineService;
	}

	isEngineReady = (req, res) => {
		this.chessGameEngineService.isEngineReady(req, res);
		return res.status(200).json({ status: 'Engine is ready' });
	}

	handleCommand = (req, res) => {
		this.chessGameEngineService.handleCommand(req, res);
		return res.status(200).json({ status: 'Command handled' });
	}
}