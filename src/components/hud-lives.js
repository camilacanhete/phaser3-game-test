import { Const } from "../game/const";
import { HUDText } from "./hud-text";

export class HUDLives extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(
            scene, 
            0,
            0,
            scene.textures.get(Const.ATLAS.INGAME),
            "life_box"
        );
        this.setScale();
        this.setPosition(this.displayWidth / 2 + 15, this.displayHeight + 5);
        this.setDepth(1000);
        this.text = new HUDText(scene, this);        
        this.text.setPosition(this.x, this.y);        
        this.text.setDepth(this.depth + 1);        
        scene.add.existing(this);
    }

    //@override
    setScale(scaleX, scaleY) {
        if(scaleX === undefined) {
            const height = this.scene.screenHeight * 0.06;
            scaleX = scaleY = height / this.height;            
        }
        super.setScale(scaleX, scaleY);        
        return this;
    }

    setText(value) {
        this.text.setText("x " + value);
        console.log("Lives:", value);
    }

    onWindowResize(screenWidth, screenHeight, deviceRatio) {        
        this.screenWidth = screenWidth;
        this.screenheight = screenHeight;  
        this.setScale();
        this.setPosition(this.displayWidth / 2 + 15, this.displayHeight + 5);   
        this.text.onWindowResize(this);
    }
}