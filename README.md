## About <a name = "about"></a>
## About <a name = "about"></a>

The purpose of the project is to check postgresql advantages and disadvantages as a search service and to check the best software architecture choices.

### Prerequisites

```
- node.js 12 or higher
- PostgreSQL 13 or higher
```

### Installation

1) Clone project on your local machine
```
$ git clone git@github.com:RafalR86/postgresearch.git
```

2) Install node packages
```
$ npm i
```
3) Create your local ormconfig.ts file based on ormconfig.ts.template and set connection to your local database created
for the project.

4) Run migrations for create database structure
```
$ npm run migration:up
```

### Running the app
```
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### Importing sample data to database
I prepared import for this file:
```
https://archive.org/download/stackexchange/drupal.stackexchange.com.7z
```
But you can adjust it for another files (bigger smaller) from this site:

```
https://archive.org/download/stackexchange
```

To start import:
1) Put downloaded Comments.xml file to "imports" directory
2) Build project
```
$ npm run build
```
3) Run command:
```
$ npm run inport-comments
```