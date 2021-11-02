import { Const } from "../game/const";

export class HUDText extends Phaser.GameObjects.BitmapText {
    constructor(scene) {
        super(
            scene,
            0,
            0,
            Const.FONT.FREDOKA
        );
        this.setOrigin(0, 0.5);  
        this.setFontSize(36);
        scene.add.existing(this);
    }    
}