import { Const } from "../game/const";

export class BtnPlay extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(
            scene, 
            scene.screenWidth / 2,
            scene.screenHeight / 2,
            scene.textures.get(Const.ATLAS.LOADING),
            "boton_desactivado"
        );
        this.state = {            
            active: false
        }
        
        this.changeScene = this.changeScene.bind(this);      
        this.setScale();
        this.setPosition(scene.screenWidth / 2, scene.screenHeight / 2 + this.displayHeight);
        this.setInteractive();
        this.bindEvents();

        scene.add.existing(this);
    }

    //@override
    setScale(scaleX, scaleY) {
        if(scaleX === undefined) {
            const height = this.scene.screenHeight * 0.08;
            scaleX = scaleY = height / this.height;            
        }
        super.setScale(scaleX, scaleY);        
        return this;
    }

    bindEvents() {        
        this.on(Phaser.Input.Events.POINTER_DOWN, this.onClick, this);
    }    

    onClick() {                
        if(this.state.active) {                        
            this.scene.sound.play(Const.AUDIO.CLICK); 
            this.scene.tweens.add({
                targets: this,
                scale: 0.75,
                yoyo: true,
                repeat: false,
                duration: 150,
                onComplete: this.changeScene
            });                   
        }
    }

    changeScene() {
        this.scene.onGameStart();
    }

    setActiveState(active) {        
        this.state.active = active;
        if(this.state.active) {            
            this.setTexture(this.scene.textures.get(Const.ATLAS.LOADING), "boton_activado");
        } else {
            this.setTexture(this.scene.textures.get(Const.ATLAS.LOADING), "boton_desactivado");
        }
    }

    onWindowResize(screenWidth, screenHeight) { 
        this.setScale();           
        this.setPosition(screenWidth / 2, screenHeight / 2 + this.displayHeight);       
    }

    remove() {
        console.log("BtnPLay: removing events...");
        this.off(Phaser.Input.Events.POINTER_DOWN, this.onClick, this);
        super.remove();
    }
}