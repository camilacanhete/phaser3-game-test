import { Background } from "../components/background";
import { Character } from "../components/character";
import { Explosion } from "../components/explosion";
import { HUDLives } from "../components/hud-lives";
import { HUDScore } from "../components/hud-score";
import { Item } from "../components/item";
import { LabelCountdown } from "../components/label-countdown";
import { ObjectPool } from "../components/object-pool";
import { Const } from "../game/const";
import { Scene } from "./scene";

export class Ingame extends Scene { 

    constructor() {
        super();
        this.score = 0;
        this.lives = 1;
        this.state = Const.GAME_STATE.PAUSED;
    }

    //@override
    create() {
        super.create();
        this.cameras.main.setBackgroundColor(0xbaf2ff); //csantos: change background color
    }

    bindEvents() {
        console.log("Ingame: binding events...", this.scene);
        super.bindEvents();           
        this.input.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
        this.input.on(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);
        if(!this.isMobile()) {
            this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, this.onKeyPress, this);
            this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_UP, this.onKeyUp, this) ;
        } 
    }

    createComponents() {                
        this.background = new Background(this);
        this.hudLives = new HUDLives(this);
        this.hudScore = new HUDScore(this);
        this.explosion = new Explosion(this);                
        this.pool = new ObjectPool(this);
        this.character = new Character(this);
        this.counter = new LabelCountdown(this);
        this.music = this.sound.add(Const.AUDIO.CLASSIC, { loop: true, volume: 0.5 });        

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
        this.score = 0;
        this.lives = 1;
        this.hudLives.setText(this.lives);
        this.hudScore.setText(this.score);
        this.music.play();
        this.character.onGameStart();
        if(this.timer) this.timer.remove();
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
                delay: 750, // ms                
                callback: this.spawnItem,
                callbackScope: this,            
                loop: true
            });
        } else {
            this.sound.play(Const.AUDIO.BEEP);
            this.counter.setText(this.timer.getRepeatCount());
        }
    }

    addPoints(item) {
        this.score += item.points;
        this.hudScore.setText(this.score);
        item.label.play(item.x, item.y, item.points);                
    }

    spawnItem() {
        this.pool.spawn(this.score);
    }

    collectItem(character, item) {
        if(!item.active) return;
        if(item.type === Item.TYPE.GOOD) {                        
            item.remove( Explosion.TEXTURES.POINT );            
            this.addPoints(item)
            this.sound.play(Const.AUDIO.POP);            
        } else {
            this.lives--;   
            this.hudLives.setText(this.lives);         
            this.sound.play(Const.AUDIO.EXPLODE);
            if(this.lives <= 0) {
                item.remove( Explosion.TEXTURES.LOSE );
                this.onGameOver();
            }
        }        
    }

    onGameOver() {
        this.state = Const.GAME_STATE.OVER;
        this.music.stop();
        this.sound.play(Const.AUDIO.LOSE);
        this.character.onGameOver();
        this.pool.onGameOver();
        this.timer.remove();        
        this.timer = this.time.addEvent({
            delay: 3000, // ms                
            callback: this.startGame,
            callbackScope: this
        });
    }

    onRemoveItem(type, x, y) {
        this.explosion.explode(type, x, y);
    }

    onPointerDown(pointer) {
        if(this.state !== Const.GAME_STATE.START) return;        
        if(pointer.x <= this.screenWidth / 2) {
            this.character.move(Character.DIRECTION.LEFT);
        } else {
            this.character.move(Character.DIRECTION.RIGHT);
        }
    }

    onPointerUp(pointer) {   
        if(this.state !== Const.GAME_STATE.START) return;     
        this.character.stop();
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
        this.physics.world.bounds.width = this.screenWidth;
        this.physics.world.bounds.height = this.screenHeight;  
        this.background.onWindowResize(this.screenWidth, this.screenHeight);  
        this.character.onWindowResize(this.screenWidth, this.screenHeight, this.deviceRatio);  
        this.pool.onWindowResize(this.screenWidth, this.screenHeight, this.deviceRatio);  
        this.explosion.onWindowResize(this.screenWidth, this.screenHeight);
        this.hudLives.onWindowResize(this.screenWidth, this.screenHeight);
        this.hudScore.onWindowResize(this.screenWidth, this.screenHeight);
        this.counter.onWindowResize(this.screenWidth, this.screenHeight);
    } 
}