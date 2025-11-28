/**
 * @Singleton class Stockfish
 */

import { spawn } from 'child_process'
import { StockfishCommands, StockfishResponse } from '../constants/stockfishContstants';


export default class Stockfish {
	constructor() {
		this.stokfishEngines = new Array(Number(process.env.CHES_ENGINE_PULL_SIZE))
			.fill(null)
			.map(() => {
				const engine = spawn('stockfish');
				console.log(`Stockfish pid: ${engine.pid}`)
        engine.stdout.on('data', (data) => console.log('Stockfish says:', data.toString()));
				engine.stderr.on('data', (data) => console.error('Stockfish stderr:', data.toString()));
        engine.on('error', (err) => console.error('Stockfish failed:', err));
        return engine;
			});

		this.currentEngineIndex = 0;

		this.commands = {
			[StockfishCommands.GO]: StockfishCommands.GO, // go
			[StockfishCommands.UCI]: StockfishCommands.UCI, // uci
			[StockfishCommands.STOP]: StockfishCommands.STOP, // stop
			[StockfishCommands.QUIT]: StockfishCommands.QUIT, // quit
			[StockfishCommands.DEBUG]: StockfishCommands.DEBUG, // debug
			[StockfishCommands.ISREADY]: StockfishCommands.ISREADY, // 
			[StockfishCommands.REGISTER]: StockfishCommands.REGISTER, // register
			[StockfishCommands.POSITION]: StockfishCommands.POSITION, // position
			[StockfishCommands.SETOPTION]: StockfishCommands.SETOPTION, // setoption
			[StockfishCommands.PONDERHIT]: StockfishCommands.PONDERHIT, // ponderhit
			[StockfishCommands.UCINEWGAME]: StockfishCommands.UCINEWGAME, // ucinewgame
		};

		this.stockfishResponses = {
			[StockfishResponse.ID]: StockfishResponse.ID, // id
			[StockfishResponse.UCIOK]: StockfishResponse.UCIOK, // uciok
			[StockfishResponse.READYOK]: StockfishResponse.READYOK, // readyok
			[StockfishResponse.BESTMOVE]: StockfishResponse.BESTMOVE, // bestmove
		};

		const cleanUp = () => {
			console.log('Node.js exiting, killing all Stockfish engines...');
			this.stokfishEngines.forEach((engine) => {
				if (!engine.killed) engine.kill();
			});
		}

		process.on('exit', () => cleanUp()); // exit

		process.on('SIGINT', () => {         // Ctrl+C
			cleanUp();
			process.exit();
		});

		process.on('SIGTERM', () => {        // docker stop / systemd
			cleanUp();
			process.exit();
		});

		process.on('uncaughtException', (err) => {  // error
			console.error('Uncaught exception:', err);
			cleanUp();
			process.exit(1);
		});
	}

	static getInstance = () => {
		if (!Stockfish.stockfish) {
			Stockfish.stockfish = new Stockfish();
		}

		return Stockfish.stockfish;
	}

	handlCommand = (command) => { // simple round robin algorithm implementation
		return new Promise((resolve, reject) => {
			const engine = this.stokfishEngines[this.currentEngineIndex];

			this.currentEngineIndex = (this.currentEngineIndex + 1) % this.stokfishEngines.length;

			const onData = (data) => {
				resolve(data.toString());
				engine.stdout.off('data', onData);
			}

			engine.stdout.on('data', onData);
			engine.stdin.write(command + '\n');
		});
	}
}