# Clone repo <br />
Clone this repo on you device <br />

# Env files<br />
## packages/api <br />
 .env<br />
 GOOGLE_APPLICATION_CREDENTIALS=""<br />
 URL_FRONTEND=""<br />
 DB_HOST=""<br />
 DB_PORT=""<br />
 DB_NAME=""<br />
 NODE_ENV=""<br />

## packages/pwa
 Dit zijn persoonlijke keys van firebase<br />
 en een mapskey van google console maps api<br />
 .env<br />
 VITE_APIKEY:""<br />
 VITE_AUTHDOMAIN:""<br />
 VITE_PROJECTID:""<br />
 VITE_STORAGEBUCKET:""<br />
 VITE_MESSAGINGSENDERID:""<br />
 VITE_APPID:""<br />
 VITE_GOOGLE_MAPS_API_KEY:""<br />
 VITE_CLOUDNAME:""<br />
 VITE_CLOUD_UPLOAD_PRESET:""<br />


# How to seed<br />

 in je workspace api, voer volgend commando uit<br />
 Seed all: npx nestjs-command seed:database:all<br />

 (delete all: npx nestjs-command seed:reset:all)<br />


## Open project in de root en run npm run dev


# Testing commands
unit tests: npm run test
e2z tests: npm run test:e2e -w api
