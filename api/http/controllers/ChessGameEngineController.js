export default class ChessGameEngineController {
	constructor(chessGameEngineService) {
		this.chessGameEngineService = chessGameEngineService;
	}

	handleCommand = (req, res) => {
		const { responseType, response } = this.chessGameEngineService.handleCommand(req, res);
		return res.status(200).json({ responseType, response });
	}
}