_NAME = "test_chess_game_engine"

build:
	docker build -f "./dockerfiles/$(_VERSION).Dockerfile" -t "aram4774/chess-game-engine:$(_VERSION)" .
build-15:
	_VERSION="15" make build

run: --stop-and-remove
	make build
	docker run -dt --name "$(_NAME)" "aram4774/chess-game-engine:$(_VERSION)"
run-15:
	_VERSION="15" make run

--stop-and-remove:
	docker stop "$(_NAME)" || true 2>/dev/null
	docker rm "$(_NAME)" || true 2>/dev/null

################################################################################
# DEBUG COMMANDS

rebuild:
	docker system prune -af --volumes
	docker build -f "./dockerfiles/$(_VERSION).Dockerfile" --no-cache -t "aram4774/chess-game-engine:$(_VERSION)" .
rebuild-15:
	_VERSION="15" make rebuild

sh: build
	docker run -it aram4774/chess-game-engine:$(_VERSION) /bin/sh
sh-15:
	_VERSION="15" make sh

shf: rebuild
	docker run -it aram4774/chess-game-engine:$(_VERSION) /bin/sh
shf-15:
	_VERSION="15" make shf