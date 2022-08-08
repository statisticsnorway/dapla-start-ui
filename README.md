# dapla-start-ui

[![Build Status](https://dev.azure.com/statisticsnorway/Dapla/_apis/build/status/statisticsnorway.dapla-start-ui?branchName=master)](https://dev.azure.com/statisticsnorway/Dapla/_build/latest?definitionId=130&branchName=master)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=statisticsnorway_dapla-start-ui&metric=coverage)](https://sonarcloud.io/summary/new_code?id=statisticsnorway_dapla-start-ui)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=statisticsnorway_dapla-start-ui&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=statisticsnorway_dapla-start-ui)

This React application is built for in-house use in Statistics Norway. It aims to create user-friendly step by step
wizard for creating new teams that wish to be onboarded on Statistics Norway Data Plattform (Dapla).

Functionality includes:

* Defining a team name
* Choosing services to be enabled for the team
* Mapping team members to different levels of services and data access

## Development

Use `make` for common tasks:

```
local-install                  Installation steps for local devlopment
local-build                    Build the app for local serving
local-run                      Run the app locally
local-test                     Run tests and get coverage report
update-version-major           Autoincrement and update the major version
update-version-minor           Autoincrement and update the minor version
update-version-patch           Autoincrement and update the patch version
docker-build                   Build docker image
docker-run                     Run app locally with docker
docker-shell                   Enter shell of locally running docker container
docker-cleanup                 Cleanup locally running docker container
```

## Technical

### Project structure

The application code is divided into 3 main parts:

1. The application entry `/src/App.js` which handles routing and puts it all together
2. The steps in the wizard, located in `/src/components/steps/`
3. Any and all text content is located in `/src/content/`
    * This means that if you wish to edit any text in the application, edit it here, **not** in the JSX anywhere else in
      the code

The output JSON for the backend is stored in the applications' context, using
[React Context](https://reactjs.org/docs/context.html). Found in `/src/context/AppContext.js`. This also means any input
data from the user is available across the entire application, always. Because of this the user can go back and forth
between steps in the wizard and not have their previous input lost. However, nothing is stored between sessions.

### UI Components

This application uses [PrimeReact](https://www.primefaces.org/primereact/).

### Other

This application follows
[General React Setup](https://github.com/statisticsnorway/cra-template-dapla-react-app#general-react-setup) from our
_dapla-react-app_ template when it comes to handling runtime environment variables, unit tests setup and everything
related to CI/CD.
