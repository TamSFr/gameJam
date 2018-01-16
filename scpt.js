var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'jeu', { preload: preload, create: create, update: update });

/*---------------------------------------
---           Les variables           ---
-----------------------------------------
---  map => tileset                   ---
--- layer => bordure map              ---
--- grille => taille grille           --- 
--- gameEtat => Etat de la partie     ---
--- player1 => joueur 1               ---
--- player2 => joueur 2               ---
--- vitesse1 => vitesse du joueur 1   ---
--- vitesse2 => vitesse du joueur 2   ---
--- noiCoco => Noix de coco           ---
--- vitNoi1 => Vitesse noix J1        ---
--- vitNoi2 => Vitesse noix J2        ---
-----------------------------------------*/

var map; 
var layer; 
var grille = 32; 

var gameEtat; 
/*---------------------------------------
---             Game Etat             ---
-----------------------------------------
--- -1 => Rien                        ---
---  0 => Ecran d'accueil             ---
---  1 => Lancement                   ---
---  2 => Pendant la partie           ---
---  3 => Fin de la partie            ---
-----------------------------------------*/

var player1; 
var player2;
var vitesse1;

var noiCoco
var vitNoi1
var vitNoi2

var alea;
var text;

var varJ;

/*Fonction qui va charger les images*/
function preload() {
	game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tileSet', 'img/tile.png');
	game.load.image('ball', 'img/ball.png');
	game.load.image('noi', 'img/coconut.png');
}

/*--------Fonction create
------- Elle Initialisera tout ce qui se lance quand la page est chargé*/
function create() {
	text = game.add.text(game.world.centerX, game.world.centerY, "< SPACE >", { font: "65px Arial", fill: "#ffffff", align: "center" });
	text.inputEnabled = true;
	text.anchor.set(0.5);
	
	//Physique du jeu
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.restitution = 0.9;
	game.physics.p2.world.defaultContactMaterial.friction = 0.3;
	
	//Fond
	game.stage.backgroundColor = '#2d2d2d';
	
	//TileSet
	map = this.add.tilemap('map');
	map.addTilesetImage("tile", "tileSet");
	
	map.setCollisionBetween(1, 2);
	
	//Les controle
	cursors = game.input.keyboard.createCursorKeys();
	space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	z_key = game.input.keyboard.addKey(Phaser.Keyboard.Z);
	s_key = game.input.keyboard.addKey(Phaser.Keyboard.S);
	q_key = game.input.keyboard.addKey(Phaser.Keyboard.Q);
	d_key = game.input.keyboard.addKey(Phaser.Keyboard.D);
	a_key = game.input.keyboard.addKey(Phaser.Keyboard.A);
	e_key = game.input.keyboard.addKey(Phaser.Keyboard.E);
	c_key = game.input.keyboard.addKey(Phaser.Keyboard.C);
	w_key = game.input.keyboard.addKey(Phaser.Keyboard.W);
	p_key = game.input.keyboard.addKey(Phaser.Keyboard.P);
	o_key = game.input.keyboard.addKey(Phaser.Keyboard.O);
	i_key = game.input.keyboard.addKey(Phaser.Keyboard.I);
	u_key = game.input.keyboard.addKey(Phaser.Keyboard.U);
	
	gameEtat = 0;
	varJ = 1;
}

/*---------Fonction Update
--------Il va géré les etat de la partie*/
function update() {
    if(gameEtat==0){
	if (space.isDown){ 
		pret();
		gameEtat = -1;
        }
    }
    else{
    	if(gameEtat==1){
        	gameU();
        }
    }
}

function pret(){
	game.time.events.add(Phaser.Timer.SECOND, crea, this);
	//Creation du tileSet
	layer = map.createLayer("Calque de Tile 1");
	
	text.setText("Pret?");
	text.x = 16*32;
	text.y = 3*32;
	
	//Player1
	player1 = game.add.sprite(grille*28, grille*14, 'ball');
	game.physics.enable(player1, Phaser.Physics.ARCADE);
	player1.body.setCircle(16);
	player1.anchor.setTo(0.5, 0.5);
	vitesse1 = 200;
	
	//Player2
	player2 = game.add.sprite(grille*3, grille*14, 'ball');
	game.physics.enable(player2, Phaser.Physics.ARCADE);
	player2.anchor.setTo(0.5, 0.5);
	vitesse2 = 200;
	
	vitNoi1 = 150;
	vitNoi2 = 150;
	
    	
}

/*--------Fonction Crea
-----Elle va initialiser le "game start" */
function crea(){

	gameEtat = 1;
	text.setText("Go !");
	
	//Noix de Cocos
	noiCocos = game.add.group();
	noiCocos.enableBody = true;
	noiCocos.createMultiple(300, 'noi', 0, false);
	
    	creaNoiCoco1(3*grille,7*grille);
    	creaNoiCoco2(18*grille,9*grille);
}

/*-----------Fonction GameU
---------C est la boucle du jeu une fois lancé*/
function gameU(){	

	//Player1
	player1.body.velocity.x = 0;
	player1.body.velocity.y = 0;
	game.physics.arcade.collide(player1, layer);
	
	//Player2
	player2.body.velocity.x = 0;
	player2.body.velocity.y = 0;
	game.physics.arcade.collide(player2, layer);
	
	//Controle de Noix de Coco
	game.physics.arcade.collide(noiCocos, layer);
	
	//Collision entre noix et joueurs
	game.physics.arcade.overlap(player1, noiCocos, j1Perd, null, this);
	game.physics.arcade.overlap(player2, noiCocos, j2Perd, null, this);
	game.physics.arcade.collide(noiCocos);
	
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
	
	
	//Controle du player 2
	if (q_key.isDown){ 
		player2.body.velocity.x = -vitesse2;
	}
	
	if (d_key.isDown){ 
		player2.body.velocity.x = vitesse2;
	} 
	if (z_key.isDown){ 
		player2.body.velocity.y = -vitesse2;
	}
	
	if (s_key.isDown){ 
		player2.body.velocity.y = vitesse2;
	} 
	
	if(varJ == 1){
		//Controle du player 2
		if (a_key.isDown){ 
			varJ = 0;
			creaNoiCoco2(18*grille,7*grille);
			
		}

		if (e_key.isDown){ 
			vitesse2 += 100;
			varJ = 0;
		} 
		if (c_key.isDown){ 
			noiCoco.body.velocity.y += 100;
			varJ = 0;
		}

		if (w_key.isDown){ 
			player2.body.velocity.y = vitesse2;
			varJ = 0;
		} 
	}
}


/*----------Fonction Creation de noix 1
--------Elle va créé un noix de coco en x et en y*/
function creaNoiCoco1(x, y){
	//Creation d'une noix de Coco
	
    	noiCoco = noiCocos.getFirstExists(false);
    	noiCoco.reset(x, y);
    	noiCoco.body.setCircle(15);
    	alea = Math.floor(Math.random()*2)
    	if(alea < 1){
		noiCoco.body.velocity.x = vitNoi1;
	}
	else{
		noiCoco.body.velocity.x = -vitNoi1;
	}
	alea = Math.floor(Math.random()*2)
	if(alea < 1){
		noiCoco.body.velocity.y = vitNoi1;
	}
	else{
		noiCoco.body.velocity.y = -vitNoi1;
	}
	
	//Gere les rebond
	noiCoco.body.bounce.set(1);
	noiCoco.anchor.setTo(0.5, 0.5);
}

/*----------Fonction Creation de noix 2
--------Elle va créé un noix de coco en x et en y*/
function creaNoiCoco2(x, y){
	//Creation d'une noix de Coco
	
    	noiCoco = noiCocos.getFirstExists(false);
    	noiCoco.reset(x, y);
    	noiCoco.body.setCircle(15);
    	alea = Math.floor(Math.random()*2)
    	if(alea < 1){
		noiCoco.body.velocity.x = vitNoi2;
	}
	else{
		noiCoco.body.velocity.x = -vitNoi2;
	}
	alea = Math.floor(Math.random()*2)
	if(alea < 1){
		noiCoco.body.velocity.y = vitNoi2;
	}
	else{
		noiCoco.body.velocity.y = -vitNoi2;
	}
	
	//Gere les rebond
	noiCoco.body.bounce.set(1);
	noiCoco.anchor.setTo(0.5, 0.5);
}


/*---------Fonction perdu-------------*/
function j1Perd(player1, noiCoco){
	alert("Le joueur 2 Gagne :D");
	javascript:window.location.reload()
}

function j2Perd(player1, noiCoco){
	alert("Le joueur 1 Gagne :D");
	javascript:window.location.reload()
}













