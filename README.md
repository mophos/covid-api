# ExpressJS and TypeScript

## Installation

```
npm i typescript -g
npm i ts-node -g
```

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
pm2 start --interpreter ts-node src/bin/www.ts MyServerName
```
