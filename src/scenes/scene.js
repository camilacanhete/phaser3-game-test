export class Scene extends Phaser.Scene {

    constructor() {
        super();     
        this.deviceRatio = window.devicePixelRatio;
        this.screenWidth = window.innerWidth * this.deviceRatio;
        this.screenHeight = window.innerHeight * this.deviceRatio;
    }

    //@override
    create() {  
        this.bindEvents(); 
        this.createComponents();       
    }

    bindEvents() {
        this.scale.on(Phaser.Scale.Events.RESIZE, this.onWindowResize, this);
    }

    createComponents() {

    }

    isMobile() {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {        
            return true;
        }
        return false;
    }

    onShutdown() {        
        console.log("Scene: removing scene", this.scene.key);
        this.scale.off(Phaser.Scale.Events.RESIZE, this.onWindowResize, this);
        this.scene.remove(this.scene.key);
    }

    //csantos: custom function to resize all scene elements
    onWindowResize() {       
        if(!this.scene.isActive(this.scene.key)) return;                
        
        this.deviceRatio = window.devicePixelRatio;
        this.screenWidth = window.innerWidth * this.deviceRatio;
        this.screenHeight = window.innerHeight * this.deviceRatio;        
        console.log(this.sys.game.scale);

        if(this.cameras.main) {
            this.cameras.main.setViewport(0, 0, this.screenWidth, this.screenHeight);
        }                        
    } 
}