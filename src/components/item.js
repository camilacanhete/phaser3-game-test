import { Const } from "../game/const";
import { Explosion } from "./explosion";
import { LabelPoints } from "./label-points";

export class Item extends Phaser.GameObjects.Image {

    static SPEEDY = 200;

    static TYPE = {
        GOOD: "GOOD",
        BAD: "BAD",
    };

    static BAD = [
        {
            texture: "bomb"
        }
    ];

    static GOOD = [
        {
            texture: "chip", 
            points: 1,
            minScore: 0 //csantos: 0-10 points
        },
        {
            texture: "takis", 
            points: 1,
            minScore: 10 //csantos: 10-15 points
        },
        {
            texture: "gomita1", 
            points: 1,
            minScore: 15 //csantos: 15-20 points
        },
        {
            texture: "gomita2", 
            points: 1,
            minScore: 15 //csantos: 15-20 points
        },
        {
            texture: "gomita3", 
            points: 1,
            minScore: 15 //csantos: 15-20 points
        },
        {
            texture: "gomita4", 
            points: 1,
            minScore: 20 //csantos: 20-25 points
        },
        {
            texture: "gomita5", 
            points: 1,
            minScore: 20 //csantos: 20-25 points
        },
        {
            texture: "gomita6",
            points: 1,
            minScore: 20 //csantos: 20-25 points
        },
        {
            texture: "peanut", 
            points: 1,
            minScore: 20 //csantos: 20-25 points
        },
        {
            texture: "skwinkle", 
            points: 1,
            minScore: 25 //csantos: 25-30 points
        },        
        {
            texture: "pina",
            points: 2,
            minScore: 25 //csantos: 25-30 points
        },
        {
            texture: "mango",
            points: 2,
            minScore: 25 //csantos: 25-30 points
        }        
    ];

    constructor(scene, type) {
        super(
            scene, 
            scene.screenWidth / 2,
            scene.screenHeight / 2,
            scene.textures.get(Const.ATLAS.INGAME),
            "chip"
        );   
        
        this.speedMultiplier = (this.scene.sys.game.scale.isPortrait) ? 2 : 1;
        this.screenWidth = this.scene.screenWidth;
        this.screenHeight = this.scene.screenHeight;        
        this.type = type || Item.TYPE.GOOD; //csantos: items can be GOOD or BAD
        this.points = 1; //csantos: how much this item adds to player's score              
        this.label = new LabelPoints(scene);
        this.setAngle(Phaser.Math.Between(0, 360));
        this.setScale();        
        this.maxHeight = scene.screenHeight * 0.85;
        scene.add.existing(this);
        scene.physics.add.existing(this);        
    }

    //@override
    setScale(scaleX, scaleY) {
        if(scaleX === undefined) {
            const height = this.scene.screenHeight * 0.1;
            scaleX = scaleY = height / this.height;
            console.log("scale:", scaleX, height, this.height, this.scene.screenHeight);
        }
        super.setScale(scaleX, scaleY);        
        return this;
    } 

    setPhysicsSize() {                
        this.body.setSize(this.width, this.height);               
        this.body.updateCenter();
	}

    setEnable(enable) {
        this.body.enable = enable;              
    }

    setItem(type, score) {
        let randomItem = null;
        this.type = type;
        switch(this.type) {
            case Item.TYPE.BAD:
                randomItem = Phaser.Math.RND.pick(Item.BAD);
                this.setTexture(this.texture, randomItem.texture);
                this.body.setVelocityY(Item.SPEEDY * this.speedMultiplier + (score * 10));                
            break;
            case Item.TYPE.GOOD: 
                const availableItems = Item.GOOD.filter((item) => score >= item.minScore);
                randomItem = Phaser.Math.RND.pick(availableItems);
                this.setTexture(this.texture, randomItem.texture);
                this.points = randomItem.points;
                this.body.setVelocityY(Item.SPEEDY * this.speedMultiplier);                 
            break;
        }

        this.setScale();
        this.setPosition(Phaser.Math.Between( this.displayWidth, this.screenWidth - this.displayWidth ), -this.displayHeight);                                  
        this.setEnable(true);
        this.setPhysicsSize();
        this.setActive(true);
        this.setVisible(true);
    }

    update() {    
        if(!this.active) return;
        this.angle += Math.PI;              
        if(this.y > this.maxHeight) {
            this.remove( (this.type === Item.TYPE.GOOD) ? Explosion.TEXTURES.MISS : Explosion.TEXTURES.BOMB );
        }
        if(this.angle === 360) this.angle = 0;
    }

    remove(texture) {
        this.setEnable(false);
        this.setActive(false);
        this.setVisible(false);
        if(texture) this.scene.onRemoveItem(texture, this.x, this.y);
    }

    onWindowResize(screenWidth, screenHeight, deviceRatio) {        
        this.screenWidth = screenWidth;
        this.screenheight = screenHeight;
        this.maxHeight = screenHeight * 0.85;
        this.speedMultiplier = (this.scene.sys.game.scale.isPortrait) ? 2 : 1; 
        this.setScale();       
    }
}