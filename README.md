# dapla-start-ui

[![Build Status](https://dev.azure.com/statisticsnorway/Dapla/_apis/build/status/statisticsnorway.dapla-start-ui?branchName=master)](https://dev.azure.com/statisticsnorway/Dapla/_build/latest?definitionId=130&branchName=master)


This is a react based frontend app. One the main functionality served is to create GitHub repository for the team which
holds the Terraform code needed to provision resources for the team. 

### Try this application locally

The first time you clone the repository, remember to run `yarn` or `yarn install`.

Run `yarn start` and navigate to `http://localhost:3000`.

### Docker locally

* `yarn build`
* `docker build -t dapla-start-ui .`
* `docker run -p 8000:8180 dapla-start-ui:latest`
    * Alternatively with custom environment
      variables:
      * To run locally: `docker run -p 8000:8180 -e REACT_APP_WORKER_URL=<backend url> dapla-start-ui:latest`
      * REACT_APP_WORKER_URL for staging and Prod: 
        * Staging: https://dapla-start-ui.staging-bip-app.ssb.no/be/dapla-start-api
        * Prod: https://dapla-start-ui.prod-bip-app.ssb.no/be/dapla-start-api
    
    
* Navigate to `http://localhost:8000`

