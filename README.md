# How to use

## Prerequisites
- Node.js
- npm
- git

## Installation
First clone the repository

Then do the following:
```bash
cd <path to repository>
npm install
```

## Usage
Start the local dev environnement with the following command:
```bash
npm start
```

## Online demo
You can find an online demo without installing anything locally [here](https://pocketplant.fr/)

## Features

### Implemented
- Capture a pokeplant using your webcam or by uploading a picture
- Randomly generated pokeplants types, stats and skills
- Get the name of the pokeplant and its description and stats
- Get the location of the pokeplants on a map
- See your captured pokeplants
- Pokedex with all the pokeplants captured by everyone
- Release a captured pokeplant
- Login with Google
- Edit your profile
- Room system with real-time chat


### In progress
- Real-time turn based battle system

## Tech Used
- ReactJs
- React Bootstrap
- TypeScript
- Redux (Redux thunk)
- Supabase
- Postgres
- GraphQL
- Cloudinary
- Leaflet Map
- ONETSolutions (for the domain name)
- Cloudflare (Security and SSL Certification)


## Future tech improvements
- Using StyledComponent instead of pure css and Bootstrap
- Better file naming and tree organization (
    ```
    Components
        ComponentName
            - index.tsx
    
    Pages
        PageName
            -index.tsx
    ```
etc.
)

## Potential issues
- Registering with mail and password works but sometime the confirmation mail appears in the spam folder or takes some time to arrive. If you don't want to wait you can use the Google login but you will have to edit your profile to add a username. 
- Choosing a gender using google login isn't supported yet.

## Access to supabase
If you want to check inside the supabase instance, please send me an email at 
quangminhjean@gmail.com
and I will send you an invite.



