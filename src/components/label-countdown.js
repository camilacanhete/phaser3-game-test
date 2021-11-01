import { Const } from "../game/const";

export class LabelCountdown extends Phaser.GameObjects.BitmapText {
    constructor(scene) {
        super(
            scene,
            scene.screenWidth / 2,
            scene.screenHeight / 2,
            Const.FONT.FREDOKA_NUMBER
        );
        this.setOrigin(0.5);
        this.setTint(0xedebf0);        
        this.setDropShadow(6, 6, 0x5b3d82, 1);
        scene.add.existing(this);
    }
}