import { Boot } from "../scenes/boot";
import { Loading } from "../scenes/loading";
import { Ingame } from "../scenes/ingame";
import { GameConfig } from "./config";
import { Const } from "./const";

export class Game extends Phaser.Game {

    constructor() {
        super(GameConfig.GET_SETTINGS());          

        this.scene.add(Const.SCENES.BOOT, Boot);
        this.scene.add(Const.SCENES.LOADING, Loading);
        this.scene.add(Const.SCENES.INGAME, Ingame);        
        this.scene.start(Const.SCENES.BOOT);           
                
        this.bindEvents();
        this.resize();
    }      

    bindEvents() {
        window.addEventListener('resize', this.resize.bind(this));                        
    }

    resize() {       
        const deviceRatio = window.devicePixelRatio;
        this.scale.resize(window.innerWidth * deviceRatio, window.innerHeight * deviceRatio);
        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.style.height = window.innerHeight + "px";                
        this.scale.setZoom(1 / deviceRatio);
        console.log("Game: changing canvas to " + window.innerWidth * deviceRatio, window.innerHeight * deviceRatio);
    }
}