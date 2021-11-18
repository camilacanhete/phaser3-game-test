import { Const } from "../game/const";

//csantos: physics body doesn't behave very well on a SpineGameObject directly, so we use a Container to fix that
export class Character extends Phaser.GameObjects.Container {

    static ANIMATION = {
        IDLE: "IDLE",
        LOSE: "LOSE",
        RUN: "RUN",
    }

    static DIRECTION = {
        LEFT: -1,
        RIGHT: 1
    }

    static SPEED = 300;

    constructor(scene) {
        super(
            scene,             
            scene.screenWidth / 2, 
            scene.screenHeight * 0.85
        ); 
                
        this.animation = Character.ANIMATION.IDLE;
        this.direction = Character.DIRECTION.LEFT; //csantos: movement direction
        this.character = scene.add.spine(0, 0, Const.SPINE.CHARACTER, this.animation, true);
        this.screenWidth = scene.screenWidth;
        this.screenheight = scene.screenHeight;         
        this.speedMultiplier = 1;
        this.setCharacterScale();        
        scene.add.existing(this);
        scene.physics.add.existing(this); 
        
        this.setPhysicsSize();
        this.add(this.character);
    }

    setCharacterScale() {        
        const height = this.scene.screenHeight * 0.22;
        const scale = height / this.character.height;         
        this.character.setScale(scale);
        this.character.scaleX *= this.direction;
        this.speedMultiplier = Math.abs(this.character.scaleX) * (this.scene.sys.game.scale.isGamePortrait ? 1 : 2);        
    } 

    setPhysicsSize() { 
        const bounds = this.character.getBounds();  
        const width = bounds.size.x * 0.5;
        const height = bounds.size.y * 0.25;
        this.body.collideWorldBounds = true;
        this.body.setSize(width, height);
		this.body.setOffset(width * -0.5, -height / 0.3);
	}

    setSkin(skin) {        
        this.character.setSkin(null);
        this.character.setSkinByName(skin); 
        this.character.play(this.animation, true);
    }

    move(direction) {
        if(this.animation !== Character.ANIMATION.RUN) {
            this.animation = Character.ANIMATION.RUN; 
            this.character.play(Character.ANIMATION.RUN, true);
        }        
        if(direction !== this.direction) {            
            this.direction = direction;            
            this.character.scaleX *= -1;
        }                        
        // if((this.direction === Character.DIRECTION.LEFT && this.body.x <= 0) || 
        //    (this.direction === Character.DIRECTION.RIGHT && this.body.x >= this.screenWidth - this.body.width)) {   
        //     this.body.setVelocityX(0);                           
        //     return;                            
        // }        
        this.body.setVelocityX(Character.SPEED * direction * this.speedMultiplier);
    }

    stop() {
        if(this.animation !== Character.ANIMATION.IDLE) {
            this.animation = Character.ANIMATION.IDLE; 
            this.character.play(Character.ANIMATION.IDLE, true);
        }
        this.body.setVelocityX(0);
    }

    onGameStart() {
        this.body.enable = true;        
        this.animation = Character.ANIMATION.IDLE;
        this.direction = Character.DIRECTION.LEFT; //csantos: movement direction
        this.setCharacterScale();
        this.setPosition(this.scene.screenWidth / 2, this.scene.screenHeight * 0.85);        
        this.setSkin('default');  
    }

    onGameOver() {
        this.body.setVelocityX(0);
        this.body.enable = false;
        this.animation = Character.ANIMATION.LOSE;
        this.setSkin('skinsad');
    }

    onWindowResize(screenWidth, screenHeight, deviceRatio) {        
        this.screenWidth = screenWidth;
        this.screenheight = screenHeight;
        this.deviceRatio = (window.devicePixelRatio > 1) ? 2 : 1;        
        this.setCharacterScale();        
        this.setPosition(screenWidth / 2, screenHeight * 0.85);
        this.setPhysicsSize();
    }
}