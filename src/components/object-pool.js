import { Item } from "./item";

export class ObjectPool extends Phaser.GameObjects.Group {

	constructor(scene) {
		super(scene, {
			classType: Item,
			maxSize: 10,
			runChildUpdate: true,			
		});		
		
		this.countChildren = 0;

		scene.add.existing(this);
	}	

	spawn(score) {			
		const item = this.get();

		//csantos: reached maximum amount of items in group
		if (!item) return;

		this.countChildren++;
		item.setItem((this.countChildren % 3 === 0) ? Item.TYPE.BAD : Item.TYPE.GOOD, score);

		return item;		
	}

	despawn(item) {		
		item.remove();
	}
}