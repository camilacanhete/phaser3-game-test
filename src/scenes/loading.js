import gameAtlasPNG from '../assets/img/gameAtlas.png';
import gameAtlasJSON from '../assets/img/gameAtlas.json';
import fntFredoka from '../assets/img/fredoka.fnt';
import fntFredokaPNG from '../assets/img/fredoka.png';
import fntFredokaNumbers from '../assets/img/fredoka_numbers.fnt';
import fntFredokaNumbersPNG from '../assets/img/fredoka_numbers.png';
import spineMascotJSON from '../assets/spine/skeleton.json';
import spineMascotPNG from '../assets/spine/skeleton.png';
import spineMascotAtlas from '../assets/spine/skeleton.atlas';
import beep from '../assets/audio/beep.mp3';
import bomb from '../assets/audio/bomb.mp3';
import classic from '../assets/audio/classic_arcade.mp3';
import explode from '../assets/audio/explode.mp3';
import lose from '../assets/audio/gameLose.mp3';
import pop from '../assets/audio/pop.mp3';
import { Const } from '../game/const';
import { LoadingBar } from '../components/loading-bar';
import { BtnPlay } from '../components/btn-play';
import { Scene } from './scene';

export class Loading extends Scene {    

    //@override
    create() {  
        super.create();     
        this.loadAssets();        
    }

    bindEvents() {  
        console.log("Loading: binding events");
        super.bindEvents();
        this.load.once(Phaser.Loader.Events.COMPLETE, this.onLoadComplete, this);
        this.load.on(Phaser.Loader.Events.PROGRESS, this.onLoading, this);        
    }

    createComponents() {        
        this.loadingBar = new LoadingBar(this);
        this.btnPlay = new BtnPlay(this);        
    }

    loadAssets() {        
        console.log("Loading: loading assets...");
        this.load.atlas(Const.ATLAS.INGAME, gameAtlasPNG, gameAtlasJSON);
        this.load.audio(Const.AUDIO.BEEP, beep);
        this.load.audio(Const.AUDIO.BOMB, bomb);
        this.load.audio(Const.AUDIO.CLASSIC, classic);        
        this.load.audio(Const.AUDIO.EXPLODE, explode);
        this.load.audio(Const.AUDIO.LOSE, lose);
        this.load.audio(Const.AUDIO.POP, pop);        
        this.load.bitmapFont(Const.FONT.FREDOKA, fntFredokaPNG, fntFredoka);
        this.load.bitmapFont(Const.FONT.FREDOKA_NUMBER, fntFredokaNumbersPNG, fntFredokaNumbers);
        this.load.spine(Const.SPINE.CHARACTER, spineMascotJSON, [ spineMascotAtlas ], true);
        this.load.start();
    }

    onLoading(progress) {        
        console.log("Loading: on loading", progress);
        this.loadingBar.updateProgress(progress);
    }

    onLoadComplete() {
        console.log("Loading: loaded assets succesfully");
        this.btnPlay.setActiveState(true);
    }     

    onWindowResize() {
        super.onWindowResize();
        this.loadingBar.onWindowResize(this.screenWidth, this.screenHeight, this.deviceRatio);
        this.btnPlay.onWindowResize(this.screenWidth, this.screenHeight, this.deviceRatio);
    }
}