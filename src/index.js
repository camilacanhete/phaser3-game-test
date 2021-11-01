import "./styles/index.scss"; //csantos: import styles
import * as Phaser from  "phaser"; //csantos: import phaser
import * as SpinePlugin from "phaser/plugins/spine/dist/SpinePlugin"; //csantos: import spine plugin
import { Game } from './game/game';

//csantos: start new game
function onDeviceReady() { 
    console.log("onDeviceReady: starting game");
    window.game = new Game();
};

window.addEventListener("load", onDeviceReady, false);	

