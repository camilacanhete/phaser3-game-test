import { Background } from "../components/background";
import { Character } from "../components/character";
import { Explosion } from "../components/explosion";
import { Item } from "../components/item";
import { LabelCountdown } from "../components/label-countdown";
import { LabelPoints } from "../components/label-points";
import { ObjectPool } from "../components/object-pool";
import { Const } from "../game/const";
import { Scene } from "./scene";

export class Ingame extends Scene { 

    constructor() {
        super();
        this.score = 0;
        this.state = Const.GAME_STATE.PAUSED;
    }

    //@override
    create() {
        super.create();
        this.cameras.main.setBackgroundColor(0xbaf2ff); //csantos: change background color
    }

    bindEvents() {
        console.log("Ingame: binding events...");
        super.bindEvents();        
        this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.onKeyPress, this);
        this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_UP, this.onKeyUp, this);
    }

    createComponents() {        
        this.background = new Background(this);
        this.explosion = new Explosion(this);                
        this.pool = new ObjectPool(this);
        this.character = new Character(this);
        this.counter = new LabelCountdown(this);
        //this.points = new LabelPoints(this);

        this.collider = this.physics.add.overlap(
            this.character,
            this.pool,
            this.collectItem,
            null,
            this
        );    
        this.startGame();    
    }   

    startGame() {
        this.character.onGameStart();
        this.timer = this.time.addEvent({
            delay: 1000, // ms                
            callback: this.countdown,
            callbackScope: this,            
            repeat: 3
        });        
    }
    
    countdown() {
        if(this.timer.getRepeatCount() === 0) {
            this.state = Const.GAME_STATE.START;
            this.counter.setText();
            this.timer.remove();
            this.timer = this.time.addEvent({
                delay: 1000, // ms                
                callback: this.spawnItem,
                callbackScope: this,            
                loop: true
            });
        } else {
            this.counter.setText(this.timer.getRepeatCount());
        }
    }

    addPoints(item) {
        this.score += item.points;
        item.label.play(item.x, item.y, item.points);
        console.log("Score:", this.score);
    }

    spawnItem() {
        this.pool.spawn(this.score);
    }

    collectItem(character, item) {
        if(!item.active) return;
        if(item.type === Item.TYPE.GOOD) {                        
            item.remove( Explosion.TEXTURES.POINT );
            //this.points.play(item.x, item.y, item.points);
            this.addPoints(item);            
        } else {
            item.remove( Explosion.TEXTURES.LOSE );
            this.onGameOver();
        }        
    }

    onGameOver() {
        this.state = Const.GAME_STATE.OVER;
        this.timer.remove();
        this.character.onGameOver();
        this.startGame();
    }

    onRemoveItem(type, x, y) {
        this.explosion.explode(type, x, y);
    }

    onKeyPress(e) {    
        if(this.state !== Const.GAME_STATE.START) return;     
        switch(e.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:                
                this.character.move(Character.DIRECTION.LEFT);
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:                
                this.character.move(Character.DIRECTION.RIGHT);
            break;
        }
    }

    onKeyUp(e) {
        if(this.state !== Const.GAME_STATE.START) return;
        switch(e.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:                
                this.character.stop();
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:                
                this.character.stop();
            break;s
        }
    }

    //csantos: custom function to resize all scene elements
    onWindowResize() {       
        super.onWindowResize();   
        this.background.onWindowResize(this.screenWidth, this.screenHeight);          
    } 
}