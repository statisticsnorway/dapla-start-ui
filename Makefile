.PHONY: default
default: | help

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: local-install
local-install: ## Installation steps for local development
	yarn install

.PHONY: local-build
local-build: ## Build the app for local development
	yarn build

.PHONY: local-run
local-run: ## Run the app locally
	yarn start

.PHONY: docker-build
docker-build: ## Build docker image
	docker build -t dapla-start-ui .

.PHONY: docker-run
docker-run: ## Run app locally with docker
	 docker run -p 3000:8180 -e REACT_APP_API=http://localhost:8000 --name dapla-start-ui dapla-start-ui:latest

.PHONY: docker-shell
docker-shell: ## Enter shell of locally running docker app
	docker exec -it dapla-start-ui bash

.PHONY: docker-cleanup
docker-cleanup: ## Cleanup locally running docker app
	docker kill dapla-start-ui
	docker container rm dapla-start-ui
