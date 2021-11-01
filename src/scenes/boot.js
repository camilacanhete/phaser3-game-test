import loadingAtlasPNG from '../assets/img/loadingAtlas.png';
import loadingAtlasJSON from '../assets/img/loadingAtlas.json';
import { Const } from '../game/const';
import click from '../assets/audio/click.mp3';
import { Scene } from './scene';

export class Boot extends Scene {

    //@override
    preload() {  
        console.log("Boot: loading starting");
        this.domElement = document.getElementById("loading");
        this.load.atlas(Const.ATLAS.LOADING, loadingAtlasPNG, loadingAtlasJSON);                        
        this.load.audio(Const.AUDIO.CLICK, click);
    }

    //@override
    create() {
        console.log("Boot: loading complete");
        this.domElement.remove();        
        this.scene.start(Const.SCENES.LOADING);            
    }
}