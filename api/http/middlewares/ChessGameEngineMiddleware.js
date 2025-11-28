export default class ChessGameEngineMiddleware {
	validateCommand = (req, res, next) => {
		next();
	}
}