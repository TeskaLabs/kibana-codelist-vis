# kibana-codelist-vis

A plugin for Kibana that translates field values into a text labels using code list

---

## Install

```
bin/kibana-plugin install https://github.com/TeskaLabs/kibana-codelist-vis/releases/download/v18.03.02/kibana_codelist_vis-18.03.02.zip
```

## Create a lookup

In this example we will create a lookup with the unique identifier `language`.

After you run the following command (assuming Elasticsearch is listening at `localhost:9200`) you will be able to configure format `Language` to Kibana fields of type `string` using the Kibana Management UI.

```
curl --request PUT \
  --url 'http://localhost:9200/.lookup/doc/x-lff-lookup:language' \
  --header 'Content-Type: application/json' \
  --data '{
  "type": "x-lff-lookup",
  "config": {
    "lookupType": "Language",
    "fieldType": "string",
    "map": {
      "en": "English",
      "de": "German",
      "ru": "Russian"
    }
  }
}'
```


## Develop

This project has been built with npm package `generator-kibana-plugin` which is now deprecated. It assumes the following folder structure:

```
.
├── kibana
└── kibana-codelist-vis
```

### Prerequisites

- `nvm` - Node version manager (https://github.com/creationix/nvm)

```
nvm install v8.11.3
nvm use v8.11.3
```

- `yarn` - a Node package manager

```
npm install yarn
```

Prepare Kibana

```
$ git clone https://github.com/elastic/kibana.git
$ cd kibana
$ yarn install
$ yarn kbn bootstrap
```

Clone this repo

```
$ git clone https://github.com/TeskaLabs/kibana-codelist-vis.git
$ cd kibana-codelist-vis
$ npm install
```

### Run

Start kibana and have it include this plugin

```
npm start -- --oss
```

### Build

Build release into folder `./build/`

```
npm run build
```

## Kibana Contributing Guide

See the [kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. Once you have completed that, use the following npm tasks.

  - `npm start`

    Start kibana and have it include this plugin

  - `npm start -- --config kibana.yml`

    You can pass any argument that you would normally send to `bin/kibana` by putting them after `--` when running `npm start`

  - `npm run build`

    Build a distributable archive

  - `npm run test:browser`

    Run the browser tests in a real web browser

  - `npm run test:server`

    Run the server tests using mocha

For more information about any of these commands run `npm run ${task} -- --help`.
