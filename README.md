# ExpressJS and TypeScript

## Installation

```
git clone https://github.com/siteslave/ts-node-express myApi
cd myApi
npm i
```

## Running

```
cp .env.example.txt .env
npm start
```

open browser and go to http://localhost:3000

## PM2

```
npm i ts-node -g
```

start pm2

```
pm2 start --interpreter ts-node src/bin/www.ts MyServerName
```
