import { Const } from "../game/const";

export class LabelPoints extends Phaser.GameObjects.BitmapText {
    constructor(scene) {
        super(
            scene,
            scene.screenWidth / 2,
            scene.screenHeight / 2,
            Const.FONT.FREDOKA
        );
        this.setOrigin(0.5);   
        this.setFontSize(60);          
        scene.add.existing(this);
    }

    play(x, y, text) {
        this.alpha = 1;
        this.x = x;
        this.y = y;
        this.text = "+" + text;
        this.scene.tweens.add({
            targets: this,                                          
            ease: 'Linear',
            props: {
                alpha: {
                    start: 1,
                    to: 0,
                    delay: 250,
                    duration: 250
                },            
                y: {
                    start: this.y,
                    to: this.y - 75,
                    duration: 500
                }                
            }
          }, this);
    }
}