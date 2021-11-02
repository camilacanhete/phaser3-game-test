import { Const } from "../game/const";

export class Explosion extends Phaser.GameObjects.Particles.ParticleEmitterManager {

    static MAX_ITEMS = 10;
    static TEXTURES = {
        POINT: 'star',
        LOSE: 'wrong',
        MISS: 'drop',
        BOMB: 'smoke'
    }

    constructor(scene) {
        super(scene, scene.textures.get(Const.ATLAS.INGAME));   
        
        const image = scene.textures.get(Const.ATLAS.INGAME).get(Explosion.TEXTURES.POINT); 
        this.textureWidth = image.width;
        this.textureHeight = image.height;
        this.setBaseScale(scene.screenWidth, scene.screenHeight);             
        this.customConfig = {	
            x: this.screenWidth / 2, 
            y: this.screenHeight / 2,
			lifespan: 2000,    
            radial: true,         
            speed: 200,            
            scale: this.baseScale,
            scale: { random: [this.baseScale * 0.75, 1.5 * this.baseScale] },
            rotate: { random: true, start: 0, end: 720 },
            gravityY: 200,
            alpha: { start: 1, end: 0 },      
            quantity: 10
		};
        this.emitter = this.createEmitter(this.customConfig);
        scene.add.existing(this);
    }

    setBaseScale(screenWidth, screenHeight) {
        const height = screenHeight * 0.05;
        this.baseScale = height / this.textureHeight;        
    }

    explode(texture, x, y) {                           
        this.emitter.setFrame(texture);        
        this.emitter.explode(Explosion.MAX_ITEMS, x, y);
    }

    onWindowResize(screenWidth, screenHeight) {        
        this.setBaseScale(screenWidth, screenHeight);   
        this.emitter.remove();   
        this.emitter = this.createEmitter(this.customConfig);
    }
}