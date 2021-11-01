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
        this.character.scaleX = this.character.scaleY = 0.75 * this.scene.deviceRatio;
        scene.add.existing(this);
        scene.physics.add.existing(this); 
        
        const bounds = this.character.getBounds();
        this.setPhysicsSize(bounds.size.x * 0.75, bounds.size.y * 0.9);
        this.add(this.character);
    }

    setPhysicsSize(width, height) {        
        this.body.setSize(width, height);
		this.body.setOffset(width * -0.5, -height);		        
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
        if((this.direction === Character.DIRECTION.LEFT && this.body.x <= 0) || 
           (this.direction === Character.DIRECTION.RIGHT && this.body.x >= this.screenWidth - this.body.width)) {   
            this.body.setVelocityX(0);                           
            return;                            
        }
        this.body.setVelocityX(Character.SPEED * direction);
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
        this.character.scaleX = this.character.scaleY = 0.75 * this.scene.deviceRatio;
        this.character.scaleX *= this.direction;
        this.setPosition(this.scene.screenWidth / 2, this.scene.screenHeight * 0.85);        
        this.setSkin('default');  
    }

    onGameOver() {
        this.body.setVelocityX(0);
        this.body.enable = false;
        this.animation = Character.ANIMATION.LOSE;
        this.setSkin('skinsad');
    }
}