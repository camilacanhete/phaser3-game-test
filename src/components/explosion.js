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
        this.emitter = this.createEmitter({	
            x: this.screenWidth / 2, 
            y: this.screenHeight / 2,
			lifespan: 2000,    
            radial: true,         
            speed: 200,            
            scale: { random: [1 * scene.deviceRatio, 2 * scene.deviceRatio] },
            rotate: { random: true, start: 0, end: 720 },
            gravityY: 200,
            alpha: { start: 1, end: 0 },      
            quantity: 10

		});
        scene.add.existing(this);
    }

    explode(texture, x, y) {                           
        this.emitter.setFrame(texture);        
        this.emitter.explode(Explosion.MAX_ITEMS, x, y);
    }
}