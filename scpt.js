var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'jeu', { preload: preload, create: create, update: update });
var map;
var layer;
var grille = 32;
var player1;
var player2;
var gameEtat;
var vitesse1;

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
	
	//Les controle
	cursors = game.input.keyboard.createCursorKeys();
	space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
	gameEtat = 0;
}

function update() {
    if(gameEtat==0){
	if (space.isDown){ 
		crea();
    		gameEtat = 1;
        }
    }
    else{
    	if(gameEtat==1){
        	gameU();
        }
    }
}

function crea(){
	//Player1
	player1 = game.add.sprite(grille*28, grille*14, 'ball');
	game.physics.enable(player1, Phaser.Physics.ARCADE);
	vitesse1 = 200;
	
	//Player2
	player2 = game.add.sprite(grille*3, grille*14, 'ball');
	game.physics.enable(player2, Phaser.Physics.ARCADE);
	vitesse1 = 200;
	
	//Metéorite1
	noiCoco = game.add.group();
}

function gameU(){	

	//Player1
	player1.body.velocity.x = 0;
	player1.body.velocity.y = 0;
	game.physics.arcade.collide(player1, layer);
	
	//Player2
	player2.body.velocity.x = 0;
	player2.body.velocity.y = 0;
	game.physics.arcade.collide(player2, layer);
	
	//Controle du player 1
	if (cursors.left.isDown){ 
		player1.body.velocity.x = -vitesse1;
	}
	
	if (cursors.right.isDown){ 
		player1.body.velocity.x = vitesse1;
	} 
	if (cursors.up.isDown){ 
		player1.body.velocity.y = -vitesse1;
	}
	
	if (cursors.down.isDown){ 
		player1.body.velocity.y = vitesse1;
	} 
}













