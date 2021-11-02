import { Const } from "../game/const";

export class LoadingBar {

    constructor(scene) {
        this.scene = scene;
        this.baseScale = (this.scene.deviceRatio >= 2) ? 2 : 1;
        this.backgroundImage = null;
        this.foregroundImage = null;
        this.mask = null;
        this.maskShape = null;
        this.step = 0;        
        this.createImages();
    }

    createImages() {        
        const texture = this.scene.textures.get(Const.ATLAS.LOADING);    
        
        //csantos: add background image
        this.backgroundImage = new Phaser.GameObjects.Image(
            this.scene, 
            this.scene.screenWidth / 2, 
            this.scene.screenHeight / 2,
            texture, "carga2"
        );
        this.backgroundImage.setScale(this.baseScale);
        this.fitToScreen(this.backgroundImage);        
        this.scene.add.existing(this.backgroundImage);        

        //csantos: add foreground image
        this.foregroundImage = new Phaser.GameObjects.Image(
            this.scene, 
            this.scene.screenWidth / 2, 
            this.scene.screenHeight / 2,
            texture, "carga1"
        );        
        this.foregroundImage.setScale(this.baseScale);
        this.fitToScreen(this.foregroundImage);
        this.scene.add.existing(this.foregroundImage);

        this.maskShape = new Phaser.Geom.Rectangle(
            0, 
            0,
            this.backgroundImage.displayWidth,
            this.backgroundImage.displayHeight
        );

        this.mask = new Phaser.GameObjects.Graphics(
            this.scene,
            {                 
                x: this.backgroundImage.x - this.backgroundImage.displayWidth / 2, 
                y: this.backgroundImage.y - this.backgroundImage.displayHeight / 2                      
            }
        ).fillRectShape(this.maskShape);

        this.scene.add.existing(this.mask);               

        this.foregroundImage.mask = new Phaser.Display.Masks.GeometryMask(
            this.scene, 
            this.mask
        );                 
    }

    fitToScreen(image) {              
        if(image.displayWidth > this.scene.screenWidth - 100) {
            image.displayWidth = this.scene.screenWidth - 100;
            image.scaleY = image.scaleX;
        } else if(image.displayHeight > this.scene.screenHeight) {
            image.displayHeight = this.scene.screenHeight;
            image.scaleX = image.scaleY;
        }
    }

    //csantos: step is already percentage. EG: 0.66 (66%)
    updateProgress(value) {             
        let stepWidth = this.backgroundImage.displayWidth * value;
        this.step = value;
        this.mask.x = (this.backgroundImage.x - this.backgroundImage.displayWidth / 2) + stepWidth;
    }

    onWindowResize(screenWidth, screenHeight, deviceRatio) {         
        this.baseScale = (deviceRatio >= 2) ? 2 : 1;
        this.backgroundImage.setScale(this.baseScale);
        this.foregroundImage.setScale(this.baseScale);
        this.fitToScreen(this.backgroundImage);       
        this.fitToScreen(this.foregroundImage);       
        this.backgroundImage.setPosition(screenWidth / 2, screenHeight / 2);
        this.foregroundImage.setPosition(screenWidth / 2, screenHeight / 2);                        
        this.foregroundImage.clearMask(true);
        this.mask.destroy();        
        this.mask = new Phaser.GameObjects.Graphics(
            this.scene,
            {                 
                x: this.backgroundImage.x - this.backgroundImage.displayWidth / 2, 
                y: this.backgroundImage.y - this.backgroundImage.displayHeight / 2                      
            }
        ).fillRectShape(this.maskShape);
        this.scene.add.existing(this.mask);
        this.foregroundImage.mask = new Phaser.Display.Masks.GeometryMask(
            this.scene, 
            this.mask
        );        
        this.updateProgress(this.step);                
    }
}