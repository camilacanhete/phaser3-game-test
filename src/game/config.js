export class GameConfig {

    static SETTINGS = {  
        type: Phaser.WEBGL,    
        parent: "game",
        pixelArt: false,
        backgroundColor: '#fff',
        physics: {
            default: 'arcade',
            arcade: {
                debug: true                
            }
        },
        dom: {
            createContainer: true
        },                
        scale: {               
            mode: Phaser.Scale.NONE, //csantos: we will resize the game with our own code
            width: window.innerWidth * window.devicePixelRatio, //csantos: set game width by multiplying window width with devicePixelRatio
            height: window.innerHeight * window.devicePixelRatio, //csantos: set game height by multiplying window height with devicePixelRatio                
        },
        plugins: {
            scene: [
                { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
            ]
        }            
    }

    static GET_SETTINGS() {  
        console.log("GameConfig: get settings", GameConfig.SETTINGS);
        return GameConfig.SETTINGS;
    }
}