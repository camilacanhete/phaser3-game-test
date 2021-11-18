# Phaser 3 Game Test

A simple responsive game using object-oriented Javascript (ES6) with Phaser 3 framework and Spine Plugin. Bundled using Webpack. 
Play the game: https://camisfolio-phaser3.web.app

## Folders

```
src
```

The development folder where all magic happens.

```
dist
```

The production folder with a bundle version of the development code and all necessary assets. Do not edit this folder manually, always use Webpack to generate the content. All javascript/typescript/css code inside this folder will be minified / obfuscated and all assets will be renamed (except the spine assets). 

## Commands

```
npm init
```

Use the init command to install all necessary node modules, including Webpack that will be used to run the localhost server. 

```
npm start
```

Start the development server with a non-minified and non-obfuscated version of the javascript bundle, enabling log and debug messages.

```
npm run test
```

Build the final production bundle file and open the development server for testing.

```
npm run build
```

Build the final production bundle file inside the dist folder.

```
npm run lint:js
```

Verify if the javascript code fits the current rules and format the code to make it more readable and maintanable.

## Todo

- [ ] Fade in/lose effects