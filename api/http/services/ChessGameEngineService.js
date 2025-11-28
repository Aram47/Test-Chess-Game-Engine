import { spawn } from 'child_process'

export default class ChessGameEngineService {
	constructor() {
		this.engines = new Array(Number(process.env.CHES_ENGINE_PULL_SIZE));
		this.engines.forEach((element, index, array) => {
			array[index] = spawn('stockfish');
			array[index].stdout.on('data', (data) => {
				console.log('Stockfish says:', data.toString());
			});
		});
		
		this.StockfishCommands = {
			uci: () => {},
			debug: () => {},
			isready: () => {},
			setoption: () => {},
			register: () => {},
			ucinewgame: () => {},
			position: () => {},
			go: () => {},
			stop: () => {},
			ponderhit: () => {},
			quit: () => {},
		}

		this.StockfishResponses = {
			id: 'id',
			uciok: 'uciok',
			readyok: 'readyok',
			bestmove: 'bestmove',

		}
	}

	isEngineReady = (req, res) => {

	}

	handleCommand = (req, res) => {

	}
}