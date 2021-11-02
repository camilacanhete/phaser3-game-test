import { Const } from "../game/const";

export class Background extends Phaser.GameObjects.TileSprite {
    constructor(scene) {
        super(
            scene, 
            0, 
            0,
            scene.screenWidth,
            scene.screenHeight,
            scene.textures.get(Const.ATLAS.INGAME),
            "fondo"
        );     
        
        const image = scene.textures.get(Const.ATLAS.INGAME).get("fondo");        
        this.textureWidth = image.width;
        this.textureHeight = image.height;
    
        this.setOrigin(0);   
        this.setDisplaySize(scene.screenWidth, scene.screenHeight);        

        scene.add.existing(this);
    }

    //@override
    setDisplaySize(width, height) {             
        this.setSize(width, height);        
        this.setTileSize(width, height);        
        return this;
    }

    setTileSize(width, height) {                     
        const scaleY = height / this.textureHeight;
        this.setTileScale(scaleY); //csantos: repeat horizontally, scale vertically             
    }

    onWindowResize(screenWidth, screenHeight) {            
        this.setDisplaySize(screenWidth, screenHeight);
    }
}