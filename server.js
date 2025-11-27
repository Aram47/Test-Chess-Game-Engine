import http from 'http';
import config from './config/config.js';
import setupHttp from './api/http/setupHttp.js';

class ChessGameEngineServer {
	setup = async () => {
		await config();

		const app = setupHttp();

		this.server = http.createServer(app);

		return this;
	}

	listen = () => {
		const PORT = process.env.PORT;
		this.server.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	}
};

const server = new ChessGameEngineServer();

export default server;