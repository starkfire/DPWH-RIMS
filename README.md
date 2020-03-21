# DPWH Road Inventory Management System

Front-End for the DPWH Road Inventory Management System

## Features
* Storing Data for:
  * Potholes
  * Guard Rails
  * Signages
* Supports CSV files
* Geospatial Mapping for Items with Location Data

## Requirements
* Node.js
* npm
* MongoDB (required by the API)

**You also have to install the [Dedicated API for DPWH-RIMS](https://github.com/starkfire/DPWH-RIMS-API)**

## Install
Navigate to the project directory and run:
```
npm install
```
This will install all dependencies specified in the `package.json` file.

## Development
Enable hot-reloading while developing and testing
```
npm run serve
```

To build the app
```
npm run build
```

For linting
```
npm run lint
```