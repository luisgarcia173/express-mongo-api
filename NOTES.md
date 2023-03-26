# config base
yarn add express zod config cors express mongoose pino pino-pretty dayjs bcrypt jsonwebtoken lodash nanoid dotenv

# config para dec
yarn add @types/body-parser @types/config @types/cors @types/express @types/node @types/pino @types/bcrypt @types/jsonwebtoken @types/lodash @types/nanoid ts-node nodemon typescript -D

# config para testes 
yarn add jest ts-jest @types/jest supertest @types/supertest
## jest.config.js
module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  // The test environment that will be used for testing
  testEnvironment: "node",
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
};

# config para prod
yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript
## babel.rc
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  ignore: [
    '**/*.test.ts'
  ]
}

# package.json
"scripts": {
  "start": "node dist/app.js",
  "build": "babel src --out-dir dist --no-copy-ignored",
  "dev": "nodemon --watch 'src/' --exec 'ts-node src/app.ts' -e ts",
  "test": "jest"
},

# ESLINT
yarn add eslint -D
eslint --init

❯ To check syntax, find problems, and enforce code style
❯ JavaScript modules (import/export)
❯ None of these
❯ Yes
❯ Aperte espaço para desmarcar Browser, mova para Node e aperte espaço para selecionar.
❯ Use a popular style guide
❯ Standard: https://github.com/standard/standard
❯ JSON
❯ Yes
❯ yarn