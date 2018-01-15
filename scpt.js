var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'jeu', { preload: preload, create: create, update: update });
var map;
var layer;
var grille = 32;

function preload() {
	game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tileSet', 'img/tile.png');
	game.load.image('ball', 'img/ball.png');
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE)
	
	//Fond
	game.stage.backgroundColor = '#2d2d2d';
	
	//TileSet
	map = this.add.tilemap('map');
	map.addTilesetImage("tile", "tileSet");
	layer = map.createLayer("Calque de Tile 1");
	map.setCollisionBetween(1, 2);
	
	player1 = game.add.sprite(32*18, 32*7, 'ball');
	
	//Les controle
	cursors = game.input.keyboard.createCursorKeys();
	

}

function update() {

}


function colli(maBoule, bouleR){
}













