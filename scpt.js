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
var text2;

var varJ;
var varJ2;
var tJour;

var pad1;
var pad2;
const PAD_A = 0;
const PAD_B = 1;
const PAD_X = 2;
const PAD_Y = 3;
const PAD_LB = 4;
const PAD_RB = 5;
const PAD_LT= 6;
const PAD_RT = 7;
const PAD_START = 10;
const PAD_SELECT = 11;
const PAD_AXIS_X = 0;
const PAD_AXIS_Y = 1;

            
            
/*Fonction qui va charger les images*/
function preload() {
	game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tileSet', 'img/tile.png');
	game.load.image('ball', 'img/ball.png');
	game.load.image('noi', 'img/coconut.png');
	game.load.image('bagr', 'img/background.jpg');
}

/*--------Fonction create
------- Elle Initialisera tout ce qui se lance quand la page est chargé*/
function create() {
	//Fond
	game.stage.backgroundColor = '#0174DF';
	//game.add.sprite(0, 0, 'bagr');
	
	text = game.add.text(game.world.centerX, game.world.centerY, "< SPACE >", { font: "65px Arial", fill: "#ffffff", align: "center" });
	text.inputEnabled = true;
	text.anchor.set(0.5);
	
	//Physique du jeu
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.restitution = 0.9;
	game.physics.p2.world.defaultContactMaterial.friction = 0.3;
	

	
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
	
	g_key = game.input.keyboard.addKey(Phaser.Keyboard.G);
	h_key = game.input.keyboard.addKey(Phaser.Keyboard.H);
	j_key = game.input.keyboard.addKey(Phaser.Keyboard.J);
	k_key = game.input.keyboard.addKey(Phaser.Keyboard.K);
	
	un_key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1);
	deux_key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2);
	trois_key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_3);
	quatre_key = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4);
	/********************************
	***          GamePad          ***
	*********************************/

        //demarre le systeme de gamepad
        game.input.gamepad.start();

        // recupere le gamepad via game.input.gamepad.padX, pour X dans [1-4]
        pad1 = game.input.gamepad.pad1;
        pad2 = game.input.gamepad.pad2;
	
	gameEtat = 0;
	varJ = 1;
	varJ2 = 1;
	tJour = Phaser.Timer.SECOND*4;
}

/*---------Fonction Update
--------Il va géré les etat de la partie*/
function update() {
    if(gameEtat==0){
	//if (space.isDown){ 
	if (pad1.isDown(PAD_A)) {
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
	text.x = 16*grille;
	text.y = 3*grille;
	
	//Player1
	player1 = game.add.sprite(grille*28, grille*14, 'ball');
	game.physics.enable(player1, Phaser.Physics.ARCADE);
	player1.body.setCircle(25);
	player1.anchor.setTo(0.5, 0.5);
	vitesse1 = 200;
	
	//Player2
	player2 = game.add.sprite(grille*3, grille*14, 'ball');
	game.physics.enable(player2, Phaser.Physics.ARCADE);
	player2.body.setCircle(25);
	player2.anchor.setTo(0.5, 0.5);
	vitesse2 = 200;
	
	vitNoi1 = 150;
	vitNoi2 = 150;
	
    	
}

/*--------Fonction Crea
-----Elle va initialiser le "game start" */
function crea(){

	gameEtat = 1;
	text.x = 7*32;
	text.fontSize = 40;
	text.setText("Choisis ton item !");
	
	text2 = game.add.text(23*grille, 3*grille, "Choisis ton item !", { font: "40px Arial", fill: "#ffffff", align: "center" });
	text2.inputEnabled = true;
	text2.anchor.set(0.5);
	
	//Noix de Cocos
	noiCocos = game.add.group();
	noiCocos.enableBody = true;
	noiCocos.createMultiple(300, 'noi', 0, false);
	
    	creaNoiCoco1(3*grille,7*grille);
    	noiCoco.body.angularVelocity = 300;
    	creaNoiCoco2(18*grille,9*grille);
}

/*-----------Fonction GameU
---------C est la boucle du jeu une fois lancé*/
function gameU(){	
	var xAxis = pad1.axis(PAD_AXIS_X);
	var yAxis = pad1.axis(PAD_AXIS_Y);
	var xAxis2 = pad2.axis(PAD_AXIS_X);
	var yAxis2 = pad2.axis(PAD_AXIS_Y);
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
	//if (cursors.left.isDown){ 
	if (xAxis < -0.1){
		player1.body.velocity.x = -vitesse1;
	}
	
	//if (cursors.right.isDown){ 
	if (xAxis > 0.1){
		player1.body.velocity.x = vitesse1;
	} 
	
	//if (cursors.up.isDown){ 
	if (yAxis < -0.1){
		player1.body.velocity.y = -vitesse1;
	}
	
	//if (cursors.down.isDown){ 
	if (yAxis > 0.1){
		player1.body.velocity.y = vitesse1;
	} 
	
	
	//Controle du player 2
	//if (q_key.isDown){ 
	if (xAxis2 < -0.1){
		player2.body.velocity.x = -vitesse2;
	}
	
	if (xAxis2 > 0.1){ 
		player2.body.velocity.x = vitesse2;
	} 
	if (yAxis2 < -0.1){ 
		player2.body.velocity.y = -vitesse2;
	}
	
	if (yAxis2 > 0.1){ 
		player2.body.velocity.y = vitesse2;
	} 
	
	/*Selection des item*/
	if(varJ == 1){
		//Controle du player 2
		//if (g_key.isDown){ 
		if (pad2.isDown(PAD_A)) {
			varJ = 0;
			creaNoiCoco2(18*grille,7*grille);
			game.time.events.add(tJour, jour1, this);
			text.setText("Attend !");
		}

		if (pad2.isDown(PAD_B)){ 
			if(vitesse2 < 600){
				console.log("+1");
				vitesse2 += 100;
				varJ = 0;
				game.time.events.add(tJour, jour1, this);
				text.setText("Attend !");
			}
		}
		
		/*
		if (j_key.isDown){ 
			noiCoco.body.velocity.y += 100;
			varJ = 0;
			game.time.events.add(tJour, jour1, this);
			text.setText("Attend !");
		}

		if (k_key.isDown){ 
		} */
	}
	
	if(varJ2 == 1){
		//Controle du menu player 1
		//if (un_key.isDown){ 
		if (pad1.isDown(PAD_A)) {
			varJ2 = 0;
			creaNoiCoco1(3*grille,7*grille);
			game.time.events.add(tJour, jour2, this);
			text2.setText("Attend !");
		}

		if (pad1.isDown(PAD_B)){ 
			if(vitesse1 < 600){
				vitesse1 += 100;
				varJ2 = 0;
				game.time.events.add(tJour, jour2, this);
				text2.setText("Attend !");
			}
		}
		/*
		if (trois_key.isDown){ 
			noiCoco.body.velocity.y += 100;
			varJ2 = 0;
			game.time.events.add(tJour, jour2, this);
			text2.setText("Attend !");
		}

		if (quatre_key.isDown){ 
		} */
	}
	
	noiCoco.body.angularVelocity = 300;
	player1.body.angularVelocity = -300;
	player2.body.angularVelocity = -300;
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

/*Fonction jour
elle initialise la fonction varJ a 1 pour nous permetre de rechoisir un item*/
function jour1(){
	varJ = 1;
	text.setText("Choisis ton item !");
}

function jour2(){
	varJ2 = 1;
	text2.setText("Choisis ton item !");
}












