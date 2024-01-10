# README

## Broadcasting Command Updates
```node deploy-commands.js``` will announce command updates to deployed bots

## Running The Bot As An Application
```node index.js``` will start the application

## Running The App In Development
```nodemon``` will start the application, monitor for changes, and restart as necessary

## Dev Notes
When I was using `discord-interactions-js` the instructions that came with it had me set up `ngrok`.  The application was listening for http connections on port 3000.
This codebase however is not like that.  Since I'm not listening for HTTP POSTs, but rather am listening over Gateway, it means I didn't have to configure the bot with an INTERACTIONS ENDPOINT URL on the discord settings page.
It also means that I don't seem to need ngrok either.