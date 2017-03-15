# tweetscape

## How to use it

### Connect your Twitter API

- Duplicate the `.env.example` file and rename it to `.env`
- Get your application settings from the [Twitter Application Management](https://apps.twitter.com/)
- Remplace the default values into your `.env` file by your Twitter Application values
- Keep `NODE_ENV` value to `production` from your [Heroku application](https://heroku.com) to deploy the API

### Install dependencies

```bash
$ npm install
```

### Serve the client port

```bash
$ npm run dev
```


### Serve the API port

```bash
$ npm run server
```

### Build for production

```bash
$ npm run build
```

### Lint your code

```bash
$ npm run lint
```

## Deploy your build

Before, you have to build for production.

```bash
$ npm run deploy
```

## Prior installation

You have to download [Node.js](https://nodejs.org/en/download/)
