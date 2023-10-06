# 2048_duel
A 2-player 2048 game. Finally!

## About
This project is a 2-player adaptation of the popular 2048 game created by Gabriele Cirulli. It is completely free and available to play [here](www.2048duel.com)!

## Credit
I copied some CSS elements, namely the grid layout and animation styles, from the original 2048 source code avalable [here](https://github.com/gabrielecirulli/2048), but everything else was done independently so that I could learn frontend development. 

I'd love to thank Matthew Bullock, Sofia Cortes, and Timmy Kurtin for style ideas and playtesting. I hope you enjoy!

# Temporary build instructions

to run docker:
```Bash
docker-compose up
```

## Deploy changes to GitHub Pages
```Bash
npm run deploy
```

## Build instructions for Capacitor
### Developing locally
Uncomment server code in capacitor.config.ts
```
server: {
    url: 'http://<ip_address>:<port>',
    cleartext: true
}
```

Start app locally
```Bash
npm start
```
Sync ios and android with latest changes
```
npx capacitor-assets generate
npx cap sync
```
Run in Xcode, and changes should be up-to-date

Generate all assets from logo
```
npx @capacitor/assets generate --iconBackgroundColor '#2B2C31' --iconBackgroundColorDark '#222222' --splashBackgroundColor '#faf8ef' --splashBackgroundColorDark '#faf8ef'
```

### Developing for deployment
```Bash
npm run build
npx cap sync
```
App is ready to run!

# Known Bugs
Resetting immediately after a move sometimes causes defects
timers start immediately
resetting board does not immediately start timer
weird bug moving screen on mobile
menu goes to 2 lines for multiplayer timer on mobile
