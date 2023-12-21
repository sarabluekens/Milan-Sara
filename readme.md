# Clone repo
Clone this repo on you device

# Env files
packages/api 
.env
GOOGLE_APPLICATION_CREDENTIALS=""
URL_FRONTEND=""
DB_HOST=""
DB_PORT=""
DB_NAME=""
NODE_ENV=""

packages/pwa
Dit zijn persoonlijke keys van firebase
en een mapskey van google console maps api
.env
VITE_APIKEY:""
VITE_AUTHDOMAIN:""
VITE_PROJECTID:""
VITE_STORAGEBUCKET:""
VITE_MESSAGINGSENDERID:""
VITE_APPID:""
VITE_GOOGLE_MAPS_API_KEY:""
VITE_CLOUDNAME:""
VITE_CLOUD_UPLOAD_PRESET:""


# How to seed

in je workspace api, voer volgend commando uit
 Seed all: npx nestjs-command seed:database:all

 (delete all: npx nestjs-command seed:reset:all)


Open project in de root en run npm run dev


# Testing commands
unit tests: npm run test
e2z tests: npm run test:e2e -w api
