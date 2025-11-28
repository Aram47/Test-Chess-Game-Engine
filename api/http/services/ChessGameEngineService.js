export default class ChessGameEngineService {
	constructor(stockfish) {
		this.stockfish = stockfish;
	}

	handleCommand = (req, res) => {
		const stockfishResponse = this.stockfish.handleCommand(req.body.command);
		return {
			responseType: stockfishResponse.type,
			response: stockfishResponse.response,
		};
	}
}