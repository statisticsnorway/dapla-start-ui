.PHONY: default
default: | help

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: local-install
local-install: ## Installation steps for local development
	yarn install

.PHONY: local-build
local-build: ## Build the app for local serving
	yarn build

.PHONY: local-run
local-run: ## Run the app locally
	yarn start

.PHONY: local-test
local-test: ## Run tests and get coverage report
	yarn coverage

.PHONY: docker-build
docker-build: ## Build docker image
	docker build -t dapla-start-ui .

.PHONY: docker-run
docker-run: ## Run app locally with docker
	 docker run -p 3000:8180 -e REACT_APP_API=http://localhost:8000 --name dapla-start-ui dapla-start-ui:latest

.PHONY: docker-shell
docker-shell: ## Enter shell of locally running docker container
	docker exec -it dapla-start-ui bash

.PHONY: docker-cleanup
docker-cleanup: ## Cleanup locally running docker container
	docker kill dapla-start-ui
	docker container rm dapla-start-ui
