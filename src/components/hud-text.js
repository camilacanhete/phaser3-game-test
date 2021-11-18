import { Const } from "../game/const";

export class HUDText extends Phaser.GameObjects.BitmapText {
    
    static FONTSIZE = 720;

    constructor(scene, parent) {
        super(
            scene,
            0,
            0,
            Const.FONT.FREDOKA
        );        
        this.baseWidth = parent.displayWidth;
        this.baseHeight = parent.displayHeight;
        this.setOrigin(0, 0.5);  
        this.setTextScale();
        scene.add.existing(this);
    }   

    setTextScale() {              
        const scale = Math.min(this.baseWidth, this.baseHeight) / Const.FONT.BASE_SCREEN_SIZE;        
        this.setFontSize(HUDText.FONTSIZE * scale);        
    } 

    onWindowResize(parent){
        this.baseWidth = parent.displayWidth;
        this.baseHeight = parent.displayHeight;
        this.setTextScale();
        this.setPosition(parent.x, parent.y);
    }
}