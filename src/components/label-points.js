import { Const } from "../game/const";

export class LabelPoints extends Phaser.GameObjects.BitmapText {

    static FONTSIZE = 60;

    constructor(scene) {
        super(
            scene,
            scene.screenWidth / 2,
            scene.screenHeight / 2,
            Const.FONT.FREDOKA
        );
        this.baseWidth = scene.screenWidth;
        this.baseHeight = scene.screenHeight;
        this.setOrigin(0.5);  
        this.setTint(0x692bf6); 
        this.setTextScale();                  
        scene.add.existing(this);
    }

    play(x, y, value) {
        this.alpha = 1;
        this.x = x;
        this.y = y;
        this.text = "+" + value;
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
    
    setTextScale() {              
        const scale = this.baseHeight / Const.FONT.BASE_SCREEN_SIZE;
        this.setFontSize(LabelPoints.FONTSIZE * scale);        
    }

    onWindowResize(screenWidth, screenHeight) {
        this.baseWidth = screenWidth;
        this.baseHeight = screenHeight;
        this.setTextScale();
        this.setPosition(screenWidth / 2, screenHeight / 2);
    }
}