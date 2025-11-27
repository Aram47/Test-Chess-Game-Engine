export default class ChessGameEngineMiddleware {
	checkEngineReady = (req, res, next) => {
		next();
	}

	validateCommand = (req, res, next) => {
		next();
	}
}