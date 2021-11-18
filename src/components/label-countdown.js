import { Const } from "../game/const";

export class LabelCountdown extends Phaser.GameObjects.BitmapText {

    static FONTSIZE = 320;

    constructor(scene) {
        super(
            scene,
            scene.screenWidth / 2,
            scene.screenHeight / 2,
            Const.FONT.FREDOKA_NUMBER
        );
        this.baseWidth = scene.screenWidth;
        this.baseHeight = scene.screenHeight;
        this.setOrigin(0.5);
        this.setTint(0xedebf0);                
        this.setTextScale();
        scene.add.existing(this);
    }

    setTextScale() {              
        const scale = Math.min(this.baseWidth, this.baseHeight) / Const.FONT.BASE_SCREEN_SIZE;                        
        this.setFontSize(LabelCountdown.FONTSIZE * scale);        
        this.setDropShadow(6 * scale, 6 * scale, 0x5b3d82, 1);
    }

    onWindowResize(screenWidth, screenHeight) {
        this.baseWidth = screenWidth;
        this.baseHeight = screenHeight;
        this.setTextScale();
        this.setPosition(screenWidth / 2, screenHeight / 2);
    }
}