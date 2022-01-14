# dapla-start-ui

[![Build Status](https://dev.azure.com/statisticsnorway/Dapla/_apis/build/status/statisticsnorway.dapla-start-ui?branchName=master)](https://dev.azure.com/statisticsnorway/Dapla/_build/latest?definitionId=130&branchName=master)


This is a react based frontend app. One the main functionality served is to create GitHub repository for the team which
holds the Terraform code needed to provision resources for the team.

## Development

Use `make` for common tasks:

```
local-install                  Installation steps for local devlopment
local-build                    Build the app for local development
local-run                      Run the app locally
docker-build                   Build docker image
docker-run                     Run app locally with docker
docker-cleanup                 Cleanup locally running docker app
```
* Run **dapla-start-api** locally to test the UI.
  For more details, check [dapla-start-api](https://github.com/statisticsnorway/dapla-start-api#development)

* Navigate to `http://localhost:3000`



