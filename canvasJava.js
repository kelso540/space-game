document.querySelector("#root").innerHTML = `<div class="startContainer" id="startContainer"> <!-- starter container -->
<div class="power">
    <strong class="powerText">POWER</strong><button class="buttonPower"></button>
</div>

<canvas id="ctx1" width="400" height="550"></canvas>

<div class="shield">
    <meter class="shieldBar" id="shield1" value="0" min="0" max="300"></meter>  
    <!-- <br> -->
    <meter class="backupBar" id="shield1" value="0" min="0" max="100"></meter>
</div>
<div class="buttons"> 
    <button class="buttonChaff btn" id="btnListen5"><strong class="buttonText">L</strong></button>
    <button class="buttonF btn" id="btnListen1"><strong class="buttonText">F</strong></button>
    <button class="buttonL btn" id="btnListen3"><strong class="buttonText">M</strong></button>
    <button class="buttonM btn" id="btnListen2"><strong class="buttonText">C</strong></button> 
    <button class="buttonR btn" id="btnListen4"><strong class="buttonText">H</strong></button>
    <button class="buttonDodge btn" id="btnListen7"><strong class="buttonText">D</strong></button>
    <button class="buttonHelp btn" id="btnListen6"><strong class="buttonText">R</strong></button>

</div>
    <div id="hideA">
    <strong class="areYouSure">Are you Sure?</strong>
    <br>
    <button class="buttonR padding" onclick="begin();"><strong class="buttonText">Yes</strong></button> <button class="buttonF padding" onclick="bringDownAreYouSure();"><strong class="buttonText">No</strong></button>
</div>
</div>

<div class="container" id="container"> <!-- main game container -->
    <div class="power">
        <strong class="powerText">POWER</strong><button class="buttonPower"></button>
    </div>

    <canvas id="ctx" width="400" height="550"></canvas>

    <div class="shield">
        <meter class="shieldBar" id="shield" value="300" min="0" max="300" low="70" high="150" optimum="300"></meter>
        <br>
        <meter class="backupBar" id="shield2" value="0" min="0" max="100" low="20" high="50" optimum="100"></meter>
    </div>
    <div class="buttons">
        <button class="buttonL btn" id="L" onclick="moveL(ship)"><strong class="buttonText">L</strong></button>
        <button class="buttonF btn" id="F"><strong class="buttonText">F</strong></button>
        <button class="buttonM btn" id="changeM"><strong class="buttonText">M</strong></button>
        <button class="buttonChaff btn" id="C"><strong class="buttonText">C</strong></button> 
        <button class="buttonHelp btn" id="helpButton"><strong class="buttonText">H</strong></button>
        <button class="buttonDodge btn" id="D"><strong class="buttonText">D</strong></button>
        <button class="buttonR btn" id="R" onclick="moveR(ship)"><strong class="buttonText">R</strong></button>
    </div>
</div>

<div class="f5">
    <p class="footerText">&copy; 2022 kelsojacks@outlook.com</p>
</div>

<div class="hide">
    <input type="text" id="time" class="buttonL" value="0" readonly>
    <input type="text" id="delTime" class="buttonL" value="0" readonly>
    <input type="text" id="health" class="buttonL" value="0" readonly>
</div>`; 
const font = "Arial";
const fontSize = "16px"; 
const ctxContext = document.getElementById("ctx");
const ctx = ctxContext.getContext("2d");
ctx.font = `${fontSize} ${font}`;
ctx.textAlign = "center";
const ctx1Context = document.getElementById("ctx1");
const ctx1 = ctx1Context.getContext("2d"); 
ctx1.font = `${fontSize} ${font}`;
ctx1.textAlign = "center";

//CANVAS AND GAME SIZE ADJUSTMENTS **
const WIDTH = 400;
const HEIGHT = 550;
const enemySpawnMaxWidth = 360;
const shipYStart = 430;
const shipXStart = 100;
const startCanvasBounceShipBottomEnd = 490;
const shipEscapeDestroyTextDisplayHeight = 500; 
const missileStartOnShipHeight = 400;
const counterEndCanvasA = 497;
const counterEndCanvasB = 498; 
const missileChangeFromShipCanvasHeight = 490;
const missileOnShipHeight = 400; 
const playerWrapScreenStart = 380;
const bounceShipRandomNumber = 100; 
const canvasCenter = 200; 
// *********************************

//SPAWN FREQUENCIES **
let enemyFrequency = 200;  
let fireFrequency = 250;
let upgradeFrequency = 2000; 
let shieldUpgradeFrequency = 3000;
let fireUpgradeFrequency = 3500;
let midEnemyFrequency = 500;
let midFireFrequency = 550;
let missileEnemyFrequency = 700;
let missileFireFrequency = 750;
let asteroidFrequency = 1000; 
let bossFireFrequency = 2100;    
let bossEnemyFrequency = 2000;
// *********************

const backupShip = new Image();
backupShip.src = "Artwork/backupShip.png";
const backupShipT = new Image();
backupShipT.src = "Artwork/backupShipTransparent.png";
const fb = new Image();
fb.src = "Artwork/podPickupShip.png";
const bm = new Image();
bm.src = "Artwork/sunCore.png";
const lz = new Image();
lz.src = "Artwork/laserFire.png";
const up = new Image();
up.src = "Artwork/spaceCrystalBlue.png";
const gb = new Image();
gb.src = "Artwork/ship3Not.png"; //last enemy ship. 
const ph = new Image();
ph.src = "Artwork/rock.png"; //asteroid to dodge. 
const mi = new Image();
mi.src = "Artwork/missileLarge.png";
const pd = new Image();
pd.src = "Artwork/ship.png"; //player ship. 
const mf = new Image();
mf.src = "Artwork/missileLargeFire.png";
const ch0 = new Image();
ch0.src = "Artwork/chaff0.png"
const ch2 = new Image();
ch2.src = "Artwork/chaff2.png"
const ch1 = new Image();
ch1.src = "Artwork/chaff1.png"
const miSh = new Image();
miSh.src = "Artwork/crystalShipClosed.png"
const miFi = new Image();
miFi.src = "Artwork/missileLargeFireEnemy.png"
const sc = new Image();
sc.src = "Artwork/shipTranslucent.png";
const mc = new Image();
mc.src = "Artwork/molecule.png";
const ba = new Image();
ba.src = "Artwork/battery.png"; 
let imgH = 40;
let imgW = 40;
let timer = 0;
let delTimer = 0;
let asteroidList = {};
let projectileList = {};
let enemyProjectileList = {};
let enemyMissileProjectileList = {};
let helpMissileProjectileList = {}; 
let enemyMidProjectileList = {};
let upgradeList = {};
let projectile = {};
let asteroid = {};
let upgrade = {};
let fireState = false;
let movePL = false;
let movePR = false;
let b;
let time = new Date(); 

let enemyShipX = {};
let enemyShipY = {};
let midShipX = {};
let midShipY = {};
let missileShipY = {};
let missileShipX = {};
let helpShipY = {};
let helpShipX = {};  
let helpShipYA = {};
let helpShipXA = {};
let gone = false;
let shield = Number(document.getElementById("shield").value);
let shipGone = {};
let shipTwice = {};
let upgradeNoise = 0;
let enemyContact = 0;
let midContact = 0;
let missileShipContact = 0;
let enemyFireContact = 0;  
let enemyMissileFireContact = 0;
let enemyShipHit = 0;
let hitEnemyList = {};
let explosiveList = {};
let fireUpgradeList = {};
let shieldList = {};
let midEnemyList = {};
let midHitEnemyList ={};
let chaffList = {};
let missileEnemyList = {};
let missileHitEnemyList = {};
let helperShipList = {}; 
let helperShipListA = {};
let asteroidActualList = {}; 
let h = {
    here: {},
    there: {},
    here1: {},
    there1: {},
    here2: {},
    there2: {},
    here3: {},
    there3: {},
    here4: {},
    there4: {},
    here5: {},
    there5: {},
    here7: {},
    there7: {},
    here8: {},
    there8: {},
    here9: {},
    there9: {},
    here10: {},
    there10: {},
    here11: {},
    there11: {},
    here12: {},
    there12: {},
};
let blowUp;
let fireAway = 0;
let shieldUp = 0;
let midShipHealth = 0;
let shieldV = 0;
let chaffCount = 0;
let missileShipHealth = 0;
let startTextA = "Invasion!"; 
let startTextB = "Earth is being invaded!";
let startTextC = "You are the first to meet the enemy!";
let startTextD = "Destroy as many as possible!";
// let startTextE = "Do your best, good luck!";
let startTextH = "Click any button on screen to start!";
let enemyDText = "Enemies Destroyed ";
let enemyD = 0;
let enemyEscape = 0; 
let enemyEscapeText = "Enemies Let Through ";
let backupAmount = Number(document.getElementById("shield2").value);
let helperYSpeedA = 2;
let helperXSpeedA = 2;
let helperYSpeedB = 3; 
let helperXSpeedB = 3;
let helpMissileTimer = 0; 
let mainTimerCounter = 0;
let mainTimerCounterDisplay = 0; 
let mainCounter0 = "0"; //removable 0 for counter.
let intervalTimer;
let changeMM = document.querySelector("#changeM"); 
let inGameDisplayTextCounter = 0; 
let asteroidCounter = 0;  
let bossEnemyList = {};
let bossShipX = {}; 
let bossShipY = {}; 
let bossShipContact = 0; 
let bossHitEnemyList = {}; 
let bossProjectileList = {};  
let bossShipHealth = 0; 
let asteroidActualHealth = 0; 
let play9er = 0; 
let play9er2 = 0;
let soundList = [];  
class Asteroid {
    constructor(width, height, img, fill, n, x, y, i) {
        this.width = width;
        this.height = height;
        this.img = img;
        this.fill = fill;
        this.n = n;
        this.x = x;
        this.y = y;
        this.i = i;
    }
};
class Sound {
    constructor(src, time){
        this.src = src;
        this.time = time;  
        this.sound = document.createElement("audio");
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.setAttribute("class", this.src); 
        this.sound.style.display = "none";
    }
    playIt(){
        this.sound.src = this.src;
        this.sound.play();
    }
}
const shipFire = new Sound("Sounds/newChaffFire.mp4", 200);
const enemyFire = new Sound("Sounds/enemyLaser.mp4", 200);
const enemyBlow = new Sound("Sounds/newEnemyExplode_1.mp4", 300);
const upgradeSpawn = new Sound("Sounds/upgradeSpawn.mp4", 300);
const enemySpawn = new Sound("Sounds/newEnemySpawn.mp4", 300);
const shipMoveLR = new Sound("Sounds/shipMove.mp4", 100);
const getUpgrade = new Sound("Sounds/getUpgrade.mp4", 500);
const enemyHit = new Sound("Sounds/enemyBlowPuff.mp4", 200);
const missileFireSound = new Sound("Sounds/missileShot.mp4", 300);
const shipHit = new Sound("Sounds/shipEnemyHit.mp4");
const missileExplode = new Sound("Sounds/newEnemyExplode.mp4");
const travel = new Sound("Sounds/travel.mp4", 20000);   
const chaffLaunch = new Sound("Sounds/newChaffFire_1.mp4", 300);
const missileLaunch = new Sound("Sounds/newPlayerMissileFire.mp4", 500);
const endGameSound = new Sound("Sounds/newGameEndSound.mp4");
const overchargeUpgrade = new Sound("Sounds/newOverchargeUpgradeSound.mp4", 500);
const opacityUpgrade = new Sound("Sounds/newOpacityUpgradeGet.mp4", 400);
const helperAround = new Sound("Sounds/newHelperAround.mp4", 28000);
const laserHit = new Sound("Sounds/newLaserFireHit.mp4", 200);
const dodgeSound = new Sound("Sounds/dodgeSound.mp4", 100);
class Missile extends Asteroid { };
class Ship extends Asteroid { };
class Projectile extends Asteroid { };
class Upgrade extends Asteroid { };
class Explosive extends Asteroid { };
class Chaff extends Asteroid { };
//start enemy ship***************
const startShip = new Ship(40, 60, fb, "E", 2, Math.floor((Math.random() * bounceShipRandomNumber) + 10), Math.floor((Math.random() * bounceShipRandomNumber) + 10), 4); 
//player ship*******************
const ship = new Ship(20, 40, pd, "S", 0, shipXStart, shipYStart, 0);
//start player ship**************
const ship1 = new Ship(40, 60, pd, "S", 3, shipXStart, shipYStart, 5);
//player missile *****************
const missile = new Missile(10, 15, mi, "U", 10, ship.x, ship.y, Math.floor((Math.random() * 100) + 1));
let game;
const moveEnemy = (set) => { //moves enemy ships.  
    ctx.drawImage(set.img, set.x, set.y, set.width, set.height);
    set.y = set.y + set.n;
};
const moveHelper1 = (set) => { //moves helper ship one.  
    ctx.drawImage(set.img, set.x, set.y, set.width, set.height);
    set.y = set.y - helperYSpeedA;
    set.x = set.x - helperXSpeedA;
    if (set.x >= enemySpawnMaxWidth) { 
        helperXSpeedA = -helperXSpeedA;
    }  
    if (set.x <= 0) { 
        helperXSpeedA = -helperXSpeedA;
    }
};
const moveHelper2 = (set) => { //moves helper ship two. 
    ctx.drawImage(set.img, set.x, set.y, set.width, set.height);
    set.y = set.y - helperYSpeedB;
    set.x = set.x + helperXSpeedB;
    if (set.x >= enemySpawnMaxWidth) { 
        helperXSpeedB = -helperXSpeedB;
    }  
    if (set.x <= 0) { 
        helperXSpeedB = -helperXSpeedB;
    }
};
const moveUpgrade = (set) => { //moves upgrades. 
    ctx.drawImage(set.img, set.x, set.y, set.width, set.height);
    set.y = set.y + set.n;
};
const moveChaff = (set) => { //moves chaff. 
    ctx.drawImage(set.img, set.x, set.y, set.width, set.height); 
    chaffCount++; 
    chaffLaunch.playIt(); 
    if(chaffCount === 3){
        set.img = ch1;
        set.width = 80;
        set.height = 60;
        set.x = ship.x - 14; 
        set.y = ship.y - 20;
    }
    if(chaffCount === 6){
        set.img = ch2;
        set.width = 100;
        set.height = 80;
        set.x = ship.x - 20; 
        set.y = ship.y - 40;
    }
    if(chaffCount >= 7){
        chaffCount = 0;
    }
    //set.y = set.y + set.n;
};
const moveShip = (set) => { //moves player ship. 
    ctx.drawImage(set.img, set.x, set.y, set.width, set.height);
    if (movePR === true) {
        set.x = set.x + 4;
        ship.x = set.x;
    }
    if (set.x >= WIDTH) {
        set.x = 0;
    }
    if (movePL === true) {
        set.x = set.x - 4;
        ship.x = set.x;
    }
    if (set.x <= -40) {
        set.x = playerWrapScreenStart; //change to ten less than canvas width to wrap ship. 
    }
};
const moveR = () => { //moves ship right. 
    movePR = true;
    movePL = false;
    shipMoveLR.playIt();
};
const moveL = () => { //moves ship left. 
    movePR = false;
    movePL = true;
    shipMoveLR.playIt(); 
};
const dodge = () => {
    play9er = ship.x;
    console.log(play9er);
    dodgeSound.playIt(); 
    setTimeout(dodgeAway, 50);     
};
const dodgeAway = () => {
    play9er2 = ship.x; 
    console.log(play9er2); 
    if(play9er2 < play9er) {
        ship.x -= 40; 
        ship.x -= 40; 
    }
    if(play9er2 > play9er) {
        ship.x += 40; 
        ship.x += 40; 
    }
}
const enemyMaker = () => { //small enemy spawner. 
    const one = new Asteroid(15, 25, fb, "U", 1, Math.floor((Math.random() * enemySpawnMaxWidth) + 0), -70, Math.floor((Math.random() * 5000) + 1));
    asteroidList[one.i] = one;
    if(timer > 2000){ //sets enemy speed
    one.n = 2;
    }
};
const midEnemyMaker = () => { //medium enemy spawner. 
    const one = new Asteroid(20, 40, fb, "U", 1, Math.floor((Math.random() * enemySpawnMaxWidth) + 0), -70, Math.floor((Math.random() * 5000) + 1));
    midEnemyList[one.i] = one;
    if(timer > 2000){ //sets enemy speed.
    one.n = 2;
    }
};
const missileEnemyMaker = () => { //missile enemy spawner. 
    const one = new Asteroid(15, 25, miSh, "U", 1, Math.floor((Math.random() * enemySpawnMaxWidth) + 0), -70, Math.floor((Math.random() * 5000) + 1));
    missileEnemyList[one.i] = one;
    if(timer > 2000){ //sets enemy speed.
    one.n = 2;
    }
};
const bossEnemyMaker = () => { //boss enemy spawner. 
    const one = new Asteroid(50, 70, gb, "U", 1, Math.floor((Math.random() * enemySpawnMaxWidth) + 0), -70, Math.floor((Math.random() * 5000) + 1));
    bossEnemyList[one.i] = one;
    if(timer > 4000){ //sets enemy speed.
    one.n = 2;
    }
};
const asteroidLaunch = () => { //asteroid spawner.  
    const one = new Asteroid(20, 40, ph, "U", 1, Math.floor((Math.random() * enemySpawnMaxWidth) + 0), -70, Math.floor((Math.random() * 5000) + 1));
    asteroidActualList[one.i] = one;
    if(timer > 4000){ //sets enemy speed.
        one.n = 2;
        }
};
const help1 = () => { //helper one spawner. 
    const one = new Ship(15, 25, backupShip, "U", 1, Math.floor((Math.random() * enemySpawnMaxWidth) + 0), 1400, Math.floor((Math.random() * 5000) + 1));
    helperShipList[one.i] = one; 
    backupAmount = 0;  
    document.getElementById("shield2").value = backupAmount;
};
const help2 = () => { //helper two spawner. 
    const one = new Ship(15, 25, backupShip, "U", 1, Math.floor((Math.random() * enemySpawnMaxWidth) + 0), 1400, Math.floor((Math.random() * 5000) + 1));
    helperShipListA[one.i] = one;
    helpMissileTimer = timer; 
    helperAround.playIt(); 
};
const upgradeMaker = () => { //heal upgrade spawner. 
    const one = new Upgrade(40, 40, up, "U", 1, Math.floor((Math.random() * enemySpawnMaxWidth) + 0), -70, Math.floor((Math.random() * 5000) + 1));
    upgradeList[one.i] = one;
};
const shieldUpgrade = () => { //opacity safety spawner. 
    const one = new Upgrade(40, 40, mc, "U", 1, Math.floor((Math.random() * enemySpawnMaxWidth) + 0), -70, Math.floor((Math.random() * 5000) + 1));
    shieldList[one.i] = one;
};
const autoFireUpgrade = () => { //laser overcharge upgrade spawner. 
    const one = new Upgrade(20, 40, ba, "U", 1, Math.floor((Math.random() * enemySpawnMaxWidth) + 0), -70, Math.floor((Math.random() * 5000) + 1));
    fireUpgradeList[one.i] = one;
};
const fire = () => { //laser spawner also controls laser fire position ship.x + 5. 
    const one = new Projectile(5, 10, lz, "U", 10, ship.x + 5, ship.y, Math.floor((Math.random() * 100) + 1));
    projectileList[one.i] = one;
    shipFire.playIt(); 
};
const missileFire = () => { //plays missile fire sound once. 
    fireState = true;
};
const fireShip = () => { //ship laser spawner. 
    const one = new Projectile(5, 10, lz, "U", 15, enemyShipX, enemyShipY, Math.floor((Math.random() * 100) + 1));
    enemyProjectileList[one.i] = one;
};
const chaff = () => { //chaff spawner. 
    const one = new Chaff(30, 30, ch0, "U", 15, ship.x + 5, ship.y - 10, Math.floor((Math.random() * 100) + 1));
    chaffList[one.i] = one;
};
const midFireShip = () => { //medium enemy large laser spawner. 
    const one = new Projectile(10, 20, lz, "U", 15, midShipX - 3, midShipY, Math.floor((Math.random() * 100) + 1));
    enemyMidProjectileList[one.i] = one;
};
const bossFireShip = () => { //boss ship laser spawner.  
    const one = new Projectile(15, 30, lz, "U", 15, bossShipX + 30, bossShipY, Math.floor((Math.random() * 100) + 1));
    bossProjectileList[one.i] = one;
};
const missileShipFire = () => { //missile ship missile spawner. 
    const one = new Projectile(10, 20, miFi, "U", 10, missileShipX + 2, missileShipY, Math.floor((Math.random() * 100) + 1));
    enemyMissileProjectileList[one.i] = one;
};
const helpShipFireA = () => { //missile ship missile spawner. 
    const one = new Projectile(10, 20, mi, "U", 10, helpShipX + 2, helpShipY, Math.floor((Math.random() * 100) + 1));
    helpMissileProjectileList[one.i] = one;
};
const helpShipFireB = () => { //helper missile spawner. 
    const one = new Projectile(10, 20, mi, "U", 10, helpShipXA + 2, helpShipYA, Math.floor((Math.random() * 100) + 1));
    helpMissileProjectileList[one.i] = one;
};
const  projectileMove = (set) => { //moves laser fire from player. 
    ctx.drawImage(set.img, set.x, set.y, set.width, set.height);
    set.y = set.y - set.n;
};
const projectileEnemy = (set) => { //moves laser fire from enemy. 
    ctx.drawImage(set.img, set.x, set.y, set.width, set.height);
    set.y = set.y + set.n;
};
const missileMove = (set) => { //moves missile fire from player.  
    ctx.drawImage(set.img, set.x, set.y, set.width, set.height);
    if (fireState === true) {
        set.y = set.y - set.n;
        enemyShipHit++; 
    }
    if (set.y < -50) {
        fireState = false; 
    }
    if (fireState === false) {
        set.y = ship.y + 10; //controls y on player ship where missile is located.
        set.x = ship.x + 5; //controls x on player ship where missile is located.
        enemyShipHit = 0;
    }
};
const missileBlowUp = () => { //makes new large explosion on missile impact. 
    const one = new Explosive(200, 200, bm, "B", 0, h.here, h.there, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const enemyBlowUp = () => { //makes new explosion on enemy blow up.  
    const one = new Explosive(100, 100, bm, "B", 0, h.here, h.there, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const missileBlowUp1 = () => { //makes new large explosion on missile impact. 
    const one = new Explosive(200, 200, bm, "B", 0, h.here1, h.there1, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const enemyBlowUp1 = () => { //makes new explosion on enemy blow up.  
    const one = new Explosive(100, 100, bm, "B", 0, h.here1, h.there1, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const missileBlowUp2 = () => { //makes new large explosion on missile impact. 
    const one = new Explosive(200, 200, bm, "B", 0, h.here2, h.there2, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const enemyBlowUp2 = () => { //makes new explosion on enemy blow up.  
    const one = new Explosive(100, 100, bm, "B", 0, h.here2, h.there2, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const missileBlowUp3 = () => { //makes new large explosion on missile impact. 
    const one = new Explosive(200, 200, bm, "B", 0, h.here3, h.there3, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const missileBlowUp4 = () => { //makes new large explosion on missile impact. 
    const one = new Explosive(200, 200, bm, "B", 0, h.here4, h.there4, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const missileBlowUp5 = () => { //makes new large explosion on missile impact. 
    const one = new Explosive(200, 200, bm, "B", 0, h.here5, h.there5, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const missileBlowUp7 = () => { //makes new large explosion on missile impact. 
    const one = new Explosive(200, 200, bm, "B", 0, h.here7, h.there7, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const enemyBlowUp8 = () => { //makes new explosion on enemy blow up.  
    const one = new Explosive(100, 100, bm, "B", 0, h.here8, h.there8, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const enemyBlowUp9 = () => { //makes new explosion on enemy blow up.  
    const one = new Explosive(100, 100, bm, "B", 0, h.here9, h.there9, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const enemyBlowUp10 = () => { //makes new explosion on enemy blow up.  
    const one = new Explosive(100, 100, bm, "B", 0, h.here10, h.there10, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const missileBlowUp11 = () => { //makes new explosion on enemy blow up.  
    const one = new Explosive(200, 200, bm, "B", 0, h.here11, h.there11, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const enemyBlowUp12 = () => { //makes new explosion on enemy blow up.  
    const one = new Explosive(100, 100, bm, "B", 0, h.here12, h.there12, Math.floor((Math.random() * 100) + 1));
    explosiveList[one.i] = one;
};
const explodeStay = (set) => { //draws large explosion on canvas. 
    ctx.drawImage(set.img, set.x, set.y, set.width, set.height);
};
const startCanvas = () => { //very start of game screen settings. 
    ctx1.clearRect(0, 0, WIDTH, HEIGHT);
    ctx1.fillText(startTextA, canvasCenter, 30);
    ctx1.fillText(startTextB, canvasCenter, 50);
    ctx1.fillText(startTextC, canvasCenter, 70);
    ctx1.fillText(startTextD, canvasCenter, 90);
    // ctx1.fillText(startTextE, canvasCenter, 150);
    ctx1.fillStyle = "#ff7f50"; 
    ctx1.fillText(startTextH, canvasCenter, 114);
    ctx1.fillText(startTextH, canvasCenter, 114);
    ctx1.fillText(enemyDText, canvasCenter, 140);
    ctx1.fillText(enemyD, canvasCenter, 160);
    ctx1.fillText(enemyEscapeText, canvasCenter, 180);
    ctx1.fillText(enemyEscape, canvasCenter, 200); 
    ctx1.fillText("Time Played: " + mainTimerCounterDisplay + " : " + mainCounter0 + mainTimerCounter, canvasCenter, 220);

    ctx1.fillText('Boosts', 90, 280);
    ctx1.drawImage(mc, 10, 300, 50, 50);
    ctx1.fillText('=  Invisibility', 110, 333);  // x, y
    ctx1.drawImage(ba, 20, 380, 30, 50);
    ctx1.fillText('=  Overcharge', 115, 412);
    ctx1.drawImage(up, 10, 460, 50, 50);
    ctx1.fillText('=  Heal', 95, 490);

    ctx1.fillText('Screen Controls:', 268, 280); 
    ctx1.fillText('F = Fire -', 243, 310);
    ctx1.fillText('M = Missile', 320, 310);
    ctx1.fillText('L = Left -', 243, 332);
    ctx1.fillText('R = Right', 313, 332);
    ctx1.fillText('C = Chaff -', 248, 354);
    ctx1.fillText('D = Dodge', 330, 354);
    ctx1.fillText('H = Summon Helpers', 286, 376);

    ctx1.fillText('Keyboard Controls:', 278, 420);
    ctx1.fillText('Space = Fire -', 258, 452);
    ctx1.fillText('S = Missile', 353, 452);
    ctx1.fillText('A = Left -', 240, 474);
    ctx1.fillText('D = Right', 310, 474);
    ctx1.fillText('W = Chaff -', 246, 496);
    ctx1.fillText('Q & E = Dodge', 343, 496);
    ctx1.fillText('B = Summon Helpers', 283, 518);

    let set = startShip;
    let set1 = ship1;
    ctx1.drawImage(set.img, set.x, set.y, set.width, set.height);
    ctx1.drawImage(set1.img, set1.x, set1.y, set1.width, set1.height);
    const isHitA = testHitRect(startShip, ship1);
    set.x = set.x - set.n;
    set.y = set.y + set.i;
    set1.x = set1.x + set1.n;
    set1.y = set1.y + set1.i;
    if (set.y >= startCanvasBounceShipBottomEnd || set.y <= 0) {
        set.i = -set.i;
    }
    if (set.x >= enemySpawnMaxWidth || set.x <= 0) { //makes the object reverse when it hits the edge
        set.n = -set.n;
    }
    if (set1.y >= startCanvasBounceShipBottomEnd || set1.y <= 0) {
        set1.i = -set1.i;
    }
    if (set1.x >= enemySpawnMaxWidth || set1.x <= 0) {
        set1.n = -set1.n;
    }
    if (isHitA) { //controls ship and enemy ship collision. 
        let pos1 = set.x; 
        let pos2 = set.y;
        ctx1.drawImage(bm, pos1 - 100, pos2 - 100, 200, 200); //minus ship width from width of explosion. 
        set.x = Math.floor((Math.random() * bounceShipRandomNumber) + 10);
        set.y = Math.floor((Math.random() * bounceShipRandomNumber) + 10);
    }
    if (isHitA === false) {
        set.img = fb;
        set1.img = pd;
    }
};
const startVar = setInterval(startCanvas, 40);
const bringUpAreYouSure = () => {
    document.getElementById("hideA").style.display = "block";
};
const bringDownAreYouSure = () => {
    document.getElementById("hideA").style.display = "none";
};
const mainTimer = () => {
    mainTimerCounter++;  
}; 
const begin = () => { //starts game
    shield = 300;
    enemyD = 0;
    enemyEscape = 0;
    mainTimerCounter = 0;
    mainTimerCounterDisplay = 0;
    mainCounter0 = "0";   
    document.getElementById("shield").value = 300;
    document.getElementById("startContainer").style.display = "none";
    document.getElementById("hideA").style.display = "none";
    document.getElementById("container").style.display = "block";
    clearInterval(startVar);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    timer = 0;
    delTimer = 0;
    enemyEscape = 0; 
    playsTravelBackgroundSound();
    game = setInterval(start, 40);
    intervalTimer = setInterval(mainTimer, 1000); 
};
const end = () => { //clears all lists and resets game.
    imgH = 40;
    imgW = 40;
    timer = 0;
    delTimer = 0;
    asteroidList = {};
    projectileList = {};
    enemyProjectileList = {};
    enemyMissileProjectileList = {};
    helpMissileProjectileList = {}; 
    enemyMidProjectileList = {};
    upgradeList = {};
    projectile = {};
    asteroid = {};
    upgrade = {};
    fireState = false;
    movePL = false;
    movePR = false;
    b;
    enemyFrequency = 200; //spawn counters. 
    fireFrequency = 250;
    upgradeFrequency = 2000; 
    shieldUpgradeFrequency = 3000;
    fireUpgradeFrequency = 3500;
    midEnemyFrequency = 500;
    midFireFrequency = 550;
    missileEnemyFrequency = 700;
    missileFireFrequency = 750;
    asteroidFrequency = 1000; 
    bossFireFrequency = 2100;    
    bossEnemyFrequency = 2000;
    enemyShipX = {};
    enemyShipY = {};
    midShipX = {};
    midShipY = {};
    missileShipY = {};
    missileShipX = {};
    helpShipY = {};
    helpShipX = {};  
    helpShipYA = {};
    helpShipXA = {};
    gone = false;
    shield = Number(document.getElementById("shield").value);
    shipGone = {};
    shipTwice = {};
    upgradeNoise = 0;
    enemyContact = 0;
    midContact = 0;
    missileShipContact = 0;
    enemyFireContact = 0;  
    enemyMissileFireContact = 0;
    enemyShipHit = 0;
    hitEnemyList = {};
    explosiveList = {};
    fireUpgradeList = {};
    shieldList = {};
    midEnemyList = {};
    midHitEnemyList ={};
    chaffList = {};
    missileEnemyList = {};
    missileHitEnemyList = {};
    helperShipList = {}; 
    helperShipListA = {};
    asteroidActualList = {}; 
    h = {
        here: {},
        there: {},
        here1: {},
        there1: {},
        here2: {},
        there2: {},
        here3: {},
        there3: {},
        here4: {},
        there4: {},
        here5: {},
        there5: {},
        here7: {},
        there7: {},
        here8: {},
        there8: {},
        here9: {},
        there9: {},
        here10: {},
        there10: {},
        here11: {},
        there11: {},
        here12: {},
        there12: {},
    };
    blowUp;
    fireAway = 0;
    shieldUp = 0;
    midShipHealth = 0;
    shieldV = 0;
    chaffCount = 0;
    missileShipHealth = 0;
    backupAmount = Number(document.getElementById("shield2").value);
    helperYSpeedA = 2;
    helperXSpeedA = 2;
    helperYSpeedB = 3; 
    helperXSpeedB = 3;
    helpMissileTimer = 0;
    asteroidCounter = 0; 
    intervalTimer;
    changeMM = document.querySelector("#changeM"); 
    inGameDisplayTextCounter = 0;  
    bossEnemyList = {};
    bossShipX = {}; 
    bossShipY = {}; 
    bossShipContact = 0; 
    bossHitEnemyList = {}; 
    bossProjectileList = {};  
    bossShipHealth = 0;
    asteroidActualHealth = 0;
    document.getElementById("shield2").value = 0;  
    ctx.clearRect(0, 0, WIDTH, HEIGHT); 
    document.getElementById("startContainer").style.display = "block";
    document.getElementById("container").style.display = "none";
    clearInterval(game);
    clearInterval(intervalTimer); 
    startVar = setInterval(startCanvas, 40);
};
const testHitRect = (object1, object2) => { //collision tester part one.  
    const rect1 = {
        x: object1.x - object1.width / 2,
        y: object1.y - object1.height / 2,
        width: object1.width,
        height: object1.height
    };
    const rect2 = {
        x: object2.x - object2.width / 2,
        y: object2.y - object2.height / 2,
        width: object2.width,
        height: object2.height
    };
    return testHitRectObject(rect1, rect2);
};
const testHitRectObject = (object1, object2) => { //collision tester part two. 
    return object1.x <= object2.x + object2.width
        && object2.x <= object1.x + object1.width
        && object1.y <= object2.y + object2.height
        && object2.y <= object1.y + object1.height;
};
const start = () => { //main game loop 40ms interval
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    timer++;
    let timeBox = document.getElementById("time").value = timer;
    ctx.fillStyle = "#6495ed";
    mainTimerCounter.toString(); //so I remember how to change a value to a string. 
    mainTimerCounterDisplay.toString();
    ctx.fillText(mainTimerCounterDisplay + " : " + mainCounter0 + mainTimerCounter, 200, 50);
    ctx.fillText(enemyDText, 150, 510);
    ctx.fillText(enemyD, 265, 510);  //displays enemy's destroyed. 
    ctx.fillText(enemyEscapeText, 157, 540); 
    ctx.fillText(enemyEscape, 265, 540);  //displays enemy's escaped.
    document.getElementById("time").value = timeBox;
    document.getElementById("health").value = shield;

    for (let key in asteroidList) {  //small enemy control. 
        moveEnemy(asteroidList[key]);
        enemyShipY = asteroidList[key].y + 5;  //sets position of projectile on enemy ships. 
        enemyShipX = asteroidList[key].x + 5;
        const isHit = testHitRect(ship, asteroidList[key]);
        if (isHit && ship.img === pd) {
            enemyContact++;
            h.here1 = asteroidList[key].x + 50; //controls position of enemy explosion on player ship contact.
            h.there1 = asteroidList[key].y - 50;
            asteroidList[key].y = HEIGHT;
            enemyD++;
            enemyBlowUp1();
        } 
        const isHitA = testHitRect(missile, asteroidList[key]);
        if (isHitA && missile.y < missileStartOnShipHeight) { //if statement makes it so missile doesn't blow up while on ship. 
            missileExplode.playIt();
            h.here1 = asteroidList[key].x - 80; //controls position of large missile explosion. 
            h.there1 = asteroidList[key].y - 70;
            asteroidList[key].y = HEIGHT;
            fireState = false;
            enemyD++;
            missileBlowUp1();
        }  
        if (asteroidList[key].y === counterEndCanvasA || asteroidList[key].y === counterEndCanvasB){ //sets numbers to add enemy escape, changes over time. 
            enemyEscape++;
            }
        if (asteroidList[key].y >= HEIGHT) {
            delete asteroidList[key];
        }
    }
    for (let keyA in midEnemyList) { //medium enemy control. 
        moveEnemy(midEnemyList[keyA]);
        midShipY = midEnemyList[keyA].y + 10;
        midShipX = midEnemyList[keyA].x + 20;
        const isHitJ = testHitRect(ship, midEnemyList[keyA]);
        if (isHitJ && ship.img === pd) {
            midContact++ ;
            h.here2 = midEnemyList[keyA].x - 20;
            h.there2 = midEnemyList[keyA].y - 10;
            midEnemyList[keyA].y = HEIGHT;
            enemyD++;
            enemyBlowUp2();
        }
        const isHitK = testHitRect(missile, midEnemyList[keyA]);
        if (isHitK && missile.y < missileStartOnShipHeight) {
            missileExplode.playIt();
            h.here2 = midEnemyList[keyA].x - 70;
            h.there2 = midEnemyList[keyA].y - 60;
            midEnemyList[keyA].y = HEIGHT;
            fireState = false;
            enemyD++;
            missileBlowUp2();
        }
        if (midEnemyList[keyA].y === counterEndCanvasA || midEnemyList[keyA].y === counterEndCanvasB){
            enemyEscape++;
            }
        if (midEnemyList[keyA].y >= HEIGHT) {
            delete midEnemyList[keyA];
        }
    }
    for (let keyOne in missileEnemyList) { //missile enemy control. 
        moveEnemy(missileEnemyList[keyOne]);
        missileShipY = missileEnemyList[keyOne].y + 5;
        missileShipX = missileEnemyList[keyOne].x + 5;
        const isHitO = testHitRect(ship, missileEnemyList[keyOne]);
        if (isHitO && ship.img === pd) {
            missileShipContact++;
            h.here3 = missileEnemyList[keyOne].x - 30;
            h.there3 = missileEnemyList[keyOne].y - 20;
            missileEnemyList[keyOne].y = HEIGHT;
            enemyD++;
            missileBlowUp3();
        }
        const isHitP = testHitRect(missile, missileEnemyList[keyOne]);
        if (isHitP && missile.y < missileStartOnShipHeight) {
            missileExplode.playIt();
            h.here3 = missileEnemyList[keyOne].x - 80;
            h.there3 = missileEnemyList[keyOne].y - 70;
            missileEnemyList[keyOne].y = HEIGHT;
            fireState = false;
            enemyD++;
            missileBlowUp3();
        }
        if (missileEnemyList[keyOne].y === counterEndCanvasA || missileEnemyList[keyOne].y === counterEndCanvasB){
            enemyEscape++;
            }
        if (missileEnemyList[keyOne].y >= HEIGHT) {
            delete missileEnemyList[keyOne];
        }
    }
    for(let aST in asteroidActualList) { //asteroid control. 
        moveEnemy(asteroidActualList[aST]);
        const aSTHit = testHitRect(ship, asteroidActualList[aST]);
        if(aSTHit && ship.img === pd) {
            asteroidCounter++;
            h.here = asteroidActualList[aST].x - 25;
            h.there = asteroidActualList[aST].y - 20;
            asteroidActualList[aST].y = HEIGHT;
            enemyBlowUp(); 
        }
        const aAL = testHitRect(missile, asteroidActualList[aST]);
        if (aAL && missile.y < missileStartOnShipHeight) { //if statement makes it so missile doesn't blow up while on ship. 
            missileExplode.playIt();
            h.here = asteroidActualList[aST].x - 75;
            h.there = asteroidActualList[aST].y - 70;
            asteroidActualList[aST].y = HEIGHT;
            fireState = false;
            missileBlowUp();
        }
        if (asteroidActualList[aST].y >= HEIGHT) {
            delete asteroidActualList[aST];
        }
    }
    for (let bOSS in bossEnemyList) { //boss enemy control. 
        moveEnemy(bossEnemyList[bOSS]);
        bossShipY = bossEnemyList[bOSS].y + 5;
        bossShipX = bossEnemyList[bOSS].x + 5;
        const isHitBOSS0 = testHitRect(ship, bossEnemyList[bOSS]);
        if (isHitBOSS0 && ship.img === pd) {
            bossShipContact++;
            h.here4 = bossEnemyList[bOSS].x - 55;
            h.there4 = bossEnemyList[bOSS].y - 40;
            bossEnemyList[bOSS].y = HEIGHT;
            enemyD++;
            missileBlowUp4();
        }
        const isHitPBoss = testHitRect(missile, bossEnemyList[bOSS]);
        if (isHitPBoss && missile.y < missileStartOnShipHeight) {
            missileExplode.playIt();
            h.here4 = bossEnemyList[bOSS].x - 55;
            h.there4 = bossEnemyList[bOSS].y - 40;
            bossEnemyList[bOSS].y = HEIGHT;
            fireState = false;
            enemyD++;
            missileBlowUp4();
        }
        if (bossEnemyList[bOSS].y === counterEndCanvasA || bossEnemyList[bOSS].y === counterEndCanvasB){
            enemyEscape++;
            }
        if (bossEnemyList[bOSS].y >= HEIGHT) {
            delete bossEnemyList[bOSS];
        }
    }
    for (let a in enemyProjectileList) { //enemy laser fire control.                                           
        projectileEnemy(enemyProjectileList[a]);                                     
        const isHitB = testHitRect(ship, enemyProjectileList[a]);                 
        if (isHitB && ship.img === pd) {                                            
            enemyFireContact++;                                                    
            shield -= 10;                                                         
            document.getElementById("shield").value = shield;
            enemyProjectileList[a].y = HEIGHT;
            laserHit.playIt(); 
        }
        if (enemyProjectileList[a].y >= HEIGHT) {
            delete enemyProjectileList[a];
            enemyFireContact = 0;
        }
    }
    for (let ab in enemyMissileProjectileList) { //missile enemy missile fire control. 
        projectileEnemy(enemyMissileProjectileList[ab]);
        const isHitT = testHitRect(ship, enemyMissileProjectileList[ab]);
        if (isHitT && ship.img === pd) {
            enemyMissileProjectileList[ab].img = bm;
            enemyMissileProjectileList[ab].width = 100;
            enemyMissileProjectileList[ab].height = 100;
            enemyMissileProjectileList[ab].x = enemyMissileProjectileList[ab].x - 45;
            enemyMissileFireContact++;
        }
        if(enemyMissileFireContact >= 2) {
            enemyMissileProjectileList[ab].y = HEIGHT;
        }
        if(enemyMissileProjectileList[ab].y === HEIGHT) {
            delete enemyMissileProjectileList[ab]; 
        }
    }
    for (let hMP in helpMissileProjectileList) { //helper missile control.
        projectileMove(helpMissileProjectileList[hMP]);
        for(let hMP1 in asteroidList) {
            const hMPHit = testHitRect(asteroidList[hMP1], helpMissileProjectileList[hMP]);
            if(hMPHit) {
            missileExplode.playIt();
            h.here5 = helpMissileProjectileList[hMP].x - 80;
            h.there5 = helpMissileProjectileList[hMP].y - 60;
            helpMissileProjectileList[hMP].y = HEIGHT;
            missileBlowUp5(); 
            asteroidList[hMP1].y = HEIGHT; 
            }
        }
        for(let hMP2 in midEnemyList) {
            const hMPHit1 = testHitRect(midEnemyList[hMP2], helpMissileProjectileList[hMP]);
            if(hMPHit1) {
            missileExplode.playIt();
            h.here5 = helpMissileProjectileList[hMP].x - 80;
            h.there5 = helpMissileProjectileList[hMP].y - 60;
            helpMissileProjectileList[hMP].y = HEIGHT;
            missileBlowUp5();
            midEnemyList[hMP2].y = HEIGHT; 
            }
        }
        for(let hMP3 in missileEnemyList) {
            const hMPHit2 = testHitRect(missileEnemyList[hMP3], helpMissileProjectileList[hMP]);
            if(hMPHit2) {
            missileExplode.playIt();
            h.here7 = helpMissileProjectileList[hMP].x - 80;
            h.there7 = helpMissileProjectileList[hMP].y - 60;
            helpMissileProjectileList[hMP].y = HEIGHT;
            missileBlowUp7();
            missileEnemyList[hMP3].y = HEIGHT; 
            }
        }
        for(let hMP3BOSS in bossEnemyList) {
            const hMPHit2BOSS = testHitRect(bossEnemyList[hMP3BOSS], helpMissileProjectileList[hMP]);
            if(hMPHit2BOSS) {
            missileExplode.playIt();
            h.here7 = helpMissileProjectileList[hMP].x - 80;
            h.there7 = helpMissileProjectileList[hMP].y - 60;
            helpMissileProjectileList[hMP].y = HEIGHT;
            missileBlowUp7();
            bossEnemyList[hMP3BOSS].y = HEIGHT; 
            }
        }
    }
    for (let abc in enemyMidProjectileList) { //medium enemy laser shooter. 
        projectileEnemy(enemyMidProjectileList[abc]);
        const isHitCC = testHitRect(ship, enemyMidProjectileList[abc]);
        if (isHitCC && ship.img === pd) {
            enemyFireContact++;
            shield -= 20;
            document.getElementById("shield").value = shield;
            enemyMidProjectileList[abc].y = HEIGHT;
            laserHit.playIt();
        }
        if(enemyMidProjectileList[abc].y === HEIGHT) {
            delete enemyMidProjectileList[abc]; 
        }
    }
    for (let bOSSFire in bossProjectileList) { //boss enemy laser shooter. 
        projectileEnemy(bossProjectileList[bOSSFire]);
        const isHitBFire = testHitRect(ship, bossProjectileList[bOSSFire]);
        if (isHitBFire && ship.img === pd) {
            enemyFireContact++;
            shield -= 50;
            document.getElementById("shield").value = shield;
            bossProjectileList[bOSSFire].y = HEIGHT;
            laserHit.playIt();
        }
        if(bossProjectileList[bOSSFire].y === HEIGHT) {
            delete bossProjectileList[bOSSFire]; 
        }
    }
    for (let b in upgradeList) {  //shield healer upgrade control.  
        moveUpgrade(upgradeList[b]);
        const isHitC = testHitRect(ship, upgradeList[b]);
        if (isHitC) {
            upgradeNoise++; //for sound on first contact
            shield++;
            document.getElementById("shield").value = shield;
            console.log("UPGRADE");
        }
        if (upgradeList[b].y >= HEIGHT) {
            delete upgradeList[b];
            upgradeNoise = 0;
        }
    }
    for (let autoA in shieldList) {  //opacity safety upgrade control.                                      
        moveUpgrade(shieldList[autoA]);
        const isHitI = testHitRect(ship, shieldList[autoA]);
        if (isHitI) { 
            shieldUp = 11; 
            shieldList[autoA].y = HEIGHT;
        }
    }
    for (let auto in fireUpgradeList) { //laser overcharge upgrade control. 
        moveUpgrade(fireUpgradeList[auto]);
        const isHitG = testHitRect(ship, fireUpgradeList[auto]);
        if (isHitG) {
            fireAway = 11;
            fireUpgradeList[auto].y = HEIGHT;
        }
    }
    for (let autoB in chaffList) { //chaff protection control. 
        moveChaff(chaffList[autoB]);
        for (let autoC in enemyProjectileList){
            const isHitM = testHitRect(chaffList[autoB], enemyProjectileList[autoC]);
            if (isHitM) {
                enemyProjectileList[autoC].y = HEIGHT; 
            }
        }
        for (let auto1 in enemyMissileProjectileList){
            const isHitX = testHitRect(chaffList[autoB], enemyMissileProjectileList[auto1]);
            if (isHitX) {
                enemyMissileProjectileList[auto1].y = HEIGHT; 
            }
        }
        for (let auto2 in enemyMidProjectileList){
            const isHitR = testHitRect(chaffList[autoB], enemyMidProjectileList[auto2]);
            if (isHitR) {
                enemyMidProjectileList[auto2].y = HEIGHT; 
            }
        }
        for (let auto3 in bossProjectileList){
            const isHitBO = testHitRect(chaffList[autoB], bossProjectileList[auto3]);
            if (isHitBO) {
                bossProjectileList[auto3].y = HEIGHT; 
            }
        }
        if(chaffCount === 0) {
                delete chaffList[autoB];
            }
    }
    for (let i in projectileList) { //player laser fire control. 
        projectileMove(projectileList[i]);
        for (let i2 in asteroidList) {
            const isHitD = testHitRect(projectileList[i], asteroidList[i2]);
            if (isHitD) {
                enemyBlow.playIt();
                projectileList[i].y = -100;
                enemyD++; 
                backupAmount += 5; 
                document.getElementById("shield2").value = backupAmount;  
                h.here8 = asteroidList[i2].x - 40; //controls explosion position on small ship from laser. 
                h.there8 = asteroidList[i2].y - 50;
                asteroidList[i2].y = HEIGHT;
                enemyBlowUp8();
            }
        }
        for (let i3 in midEnemyList) {
            const isHitL = testHitRect(projectileList[i], midEnemyList[i3]);
            if (isHitL) {
                midShipHealth++;
                projectileList[i].y = -100;
            }
            if(midShipHealth >= 2){
                enemyBlow.playIt();
                enemyD++;
                backupAmount += 10;
                document.getElementById("shield2").value = backupAmount;
                h.here9 = midEnemyList[i3].x - 20;
                h.there9 = midEnemyList[i3].y - 10;
                midEnemyList[i3].y = HEIGHT;
                midShipHealth = 0;
                enemyBlowUp9(); 
            }
        }
        for (let i4 in missileEnemyList) {
                const isHitQ = testHitRect(projectileList[i], missileEnemyList[i4]);
                if (isHitQ) {
                    missileShipHealth++;
                    projectileList[i].y = -100;
                }
                if(missileShipHealth >= 2){
                    enemyBlow.playIt();
                    enemyD++;
                    backupAmount += 15; 
                    document.getElementById("shield2").value = backupAmount;
                    h.here10 = missileEnemyList[i4].x - 30;
                    h.there10 = missileEnemyList[i4].y - 20;
                    missileEnemyList[i4].y = HEIGHT;
                    missileShipHealth = 0; 
                    enemyBlowUp10();
                }
            }
            for (let i4Boss in bossEnemyList) {
                const isHitQBoss = testHitRect(projectileList[i], bossEnemyList[i4Boss]);
                if (isHitQBoss) {
                    bossShipHealth++;
                    projectileList[i].y = -100;
                }
                if(bossShipHealth >= 4){
                    enemyBlow.playIt();
                    enemyD++;
                    backupAmount += 20; 
                    document.getElementById("shield2").value = backupAmount;
                    h.here11 = bossEnemyList[i4Boss].x - 55;
                    h.there11 = bossEnemyList[i4Boss].y - 40;
                    bossEnemyList[i4Boss].y = HEIGHT;
                    bossShipHealth = 0;
                    missileBlowUp11(); ;
                }
            }
            for (let i4Ass in asteroidActualList) {
                const isHitQBoss = testHitRect(projectileList[i], asteroidActualList[i4Ass]);
                if (isHitQBoss) {
                    asteroidActualHealth++;
                    projectileList[i].y = -100;
                }
                if(asteroidActualHealth >= 2){
                    backupAmount += 10; 
                    document.getElementById("shield2").value = backupAmount;
                    h.here12 = asteroidActualList[i4Ass].x - 25;
                    h.there12 = asteroidActualList[i4Ass].y - 20;
                    asteroidActualList[i4Ass].y = HEIGHT;
                    asteroidActualHealth = 0;
                    enemyBlowUp12(); 
                }
            }
            if (projectileList[i].y <= -100) {
                delete projectileList[i];
            }
    }
        for (let f in explosiveList) { //large missile explosion control. 
            explodeStay(explosiveList[f]);
            const isHitE = testHitRect(ship, explosiveList[f]);
            if (isHitE && ship.img === pd) {
                shield -= 20;
                document.getElementById("shield").value = shield;
            }
            for (let f2 in asteroidList) { //destroys small enemy ships from large missile explosion. 
                const isHitF = testHitRect(explosiveList[f], asteroidList[f2]);
                if (isHitF) {
                    asteroidList[f2].img = bm;
                    shipTwice[Math.floor((Math.random() * 5000) + 1)] = asteroidList[f2];
                    shipTwice[Math.floor((Math.random() * 5000) + 1)] = explosiveList[f];
                }
            }
    }
    for (let j in explosiveList) { //deletes large missile explosion instantly. 
        delete explosiveList[j];
    }
    for (let loadA in helperShipList) { //helper one control. 
        moveHelper1(helperShipList[loadA]);
        helpShipY = helperShipList[loadA].y;
        helpShipX = helperShipList[loadA].x;
        for(let elA in asteroidList) {
            const isHitAA = testHitRect(helperShipList[loadA], asteroidList[elA]);
            if (isHitAA) {
                helperShipList[loadA].img = backupShipT; 
            }
            if (isHitAA === false) {
                helperShipList[loadA].img = backupShip; 
            }
        }
        for(let elA1 in midEnemyList) {
            const isHitAA1 = testHitRect(helperShipList[loadA], midEnemyList[elA1]);
            if (isHitAA1) {
                helperShipList[loadA].img = backupShipT; 
            }
            if (isHitAA1 === false) {
                helperShipList[loadA].img = backupShip; 
            }
        }
        for(let elA2 in missileEnemyList) {
            const isHitAA2 = testHitRect(helperShipList[loadA], missileEnemyList[elA2]);
            if (isHitAA2) {
                helperShipList[loadA].img = backupShipT; 
            }
            if (isHitAA2 === false) {
                helperShipList[loadA].img = backupShip; 
            }
        }
        if (helperShipList[loadA].y === -50){
            delete helperShipList[loadA]; 
        }
    }
    for (let loadB in helperShipListA) { //helper two control.
        moveHelper2(helperShipListA[loadB]);
        helpShipYA = helperShipListA[loadB].y;
        helpShipXA = helperShipListA[loadB].x;
        for(let elB in asteroidList) {
            const isHitBB = testHitRect(helperShipListA[loadB], asteroidList[elB]);
            if (isHitBB) {
                helperShipListA[loadB].img = backupShipT; 
            }
            if (isHitBB === false) {
                helperShipListA[loadB].img = backupShip; 
            }
        }
        for(let elB1 in midEnemyList) {
            const isHitBB1 = testHitRect(helperShipListA[loadB], midEnemyList[elB1]);
            if (isHitBB1) {
                helperShipListA[loadB].img = backupShipT; 
            }
            if (isHitBB1 === false) {
                helperShipListA[loadB].img = backupShip; 
            }
        }
        for(let elB2 in missileEnemyList) {
            const isHitBB2 = testHitRect(helperShipListA[loadB], missileEnemyList[elB2]);
            if (isHitBB2) {
                helperShipListA[loadB].img = backupShipT; 
            }
            if (isHitBB2 === false) {
                helperShipListA[loadB].img = backupShip; 
            }
        }
        if (helperShipListA[loadB].y === -50){
            delete helperShipListA[loadB]; 
        }
    }
    for (let o in shipTwice) { //deletes enemy ship from player projectile hit. 
        shipTwice[o].y = HEIGHT;
        if(shipTwice[o].y >= HEIGHT){
            delete shipTwice[o];
        }
    }
    for (let p in hitEnemyList) { // deletes small enemy from player ship contact. 
        if (hitEnemyList[p].img === bm && enemyContact >= 2) {
            hitEnemyList[p].y = HEIGHT;
        }
        if(hitEnemyList[p].y === HEIGHT) {
            delete hitEnemyList[p]; 
        }
    }
    for (let pH in midHitEnemyList) { // deletes medium enemy from player ship contact.
        if (midHitEnemyList[pH].img === bm && midContact >= 2) {
            midHitEnemyList[pH].y = HEIGHT;
        }
        if(midHitEnemyList[pH].y === HEIGHT) {
            delete midHitEnemyList[pH]; 
        }
    }
    for (let pP in missileHitEnemyList) { // deletes missile enemy from player ship contact.
        if (missileHitEnemyList[pP].img === bm && missileShipContact >= 2) {
            missileHitEnemyList[pP].y = HEIGHT;
        }
        if(missileHitEnemyList[pP].y === HEIGHT) {
            delete missileHitEnemyList[pP]; 
        }
    }
    for (let pD in bossHitEnemyList) { // deletes missile enemy from player ship contact.
        if (bossHitEnemyList[pD].img === bm && bossShipContact >= 2) {
            bossHitEnemyList[pD].y = HEIGHT;
        }
        if(bossHitEnemyList[pD].y === HEIGHT) {
            delete bossHitEnemyList[pD]; 
        }
    }
    if (timer % enemyFrequency === 0) { //makes the if statement trigger once every time the timer counts frequency(in this case enemyFrequency) amount.
        enemyMaker();                
        enemySpawn.playIt();
    }
    if (timer % midEnemyFrequency === 0) {
        midEnemyMaker();
        enemySpawn.playIt();
    }
    if (timer % missileEnemyFrequency === 0) {  
        missileEnemyMaker();
        enemySpawn.playIt();
    }
    if (timer % bossEnemyFrequency === 0) {  
        bossEnemyMaker();
        enemySpawn.playIt();
    }
    if (timer % fireFrequency === 0) {
        fireShip();
        enemyFire.playIt();
    }
    if (timer % midFireFrequency === 0) {
        midFireShip();
        enemyFire.playIt();
    }
    if (timer % bossFireFrequency === 0) {
        bossFireShip();
        enemyFire.playIt();
        shipFire.playIt();
    }
    if (timer % missileFireFrequency === 0) {
        missileShipFire();
        missileFireSound.playIt();
    }
    if (timer % upgradeFrequency === 0) {
        upgradeMaker();
        upgradeSpawn.playIt();
    }
    if (timer % shieldUpgradeFrequency === 0) {
        shieldUpgrade();
        upgradeSpawn.playIt();
    }
    if (timer % fireUpgradeFrequency === 0) {
        autoFireUpgrade();
        upgradeSpawn.playIt();
    }
    if (timer < helpMissileTimer + 700 && timer % 50 === 0) { //fires helper missiles while drones on screen. 
        helpShipFireA();
        helpShipFireB(); 
    }
    if (timer % asteroidFrequency === 0) {
        asteroidLaunch();
        enemySpawn.playIt();
    }
    if (timer > 500) { //increases spawn rates over time.  
        enemyFrequency = 150;
        fireFrequency = 160;
        upgradeFrequency = 900; 
        shieldUpgradeFrequency = 2000;
        fireUpgradeFrequency = 2500;
        midEnemyFrequency = 400;
        midFireFrequency = 450;
        missileEnemyFrequency = 600;
        missileFireFrequency = 650;
        asteroidFrequency = 800; 
        bossFireFrequency = 1600;    
        bossEnemyFrequency = 1500;
    }
    if (timer > 1000) {
        enemyFrequency = 100;
        fireFrequency = 110;
        upgradeFrequency = 800; 
        shieldUpgradeFrequency = 1500;
        fireUpgradeFrequency = 2000;
        midEnemyFrequency = 300;
        midFireFrequency = 350;
        missileEnemyFrequency = 500;
        missileFireFrequency = 550;
        asteroidFrequency = 700; 
        bossFireFrequency = 1100;    
        bossEnemyFrequency = 1000;
    }
    if (timer > 1500) {
        enemyFrequency = 100;
        fireFrequency = 50;
        upgradeFrequency = 500; 
        shieldUpgradeFrequency = 600;
        fireUpgradeFrequency = 400;
        midEnemyFrequency = 200;
        midFireFrequency = 100;
        missileEnemyFrequency = 200;
        missileFireFrequency = 100;
        asteroidFrequency = 500; 
        bossFireFrequency = 300;    
        bossEnemyFrequency = 500;
    }
    if (timer > 2000) {
        enemyFrequency = 50;
        fireFrequency = 25;
        upgradeFrequency = 300; 
        shieldUpgradeFrequency = 400;
        fireUpgradeFrequency = 350;
        midEnemyFrequency = 100;
        midFireFrequency = 80;
        missileEnemyFrequency = 100;
        missileFireFrequency = 50;
        asteroidFrequency = 200; 
        bossFireFrequency = 100;    
        bossEnemyFrequency = 150;
    }
    if (upgradeNoise === 2) { //plays sound and runs command once after first contact. 
        getUpgrade.playIt();
    }
    if (enemyContact >= 2) {
        shield = shield - 10;
        document.getElementById("shield").value = shield;
        enemyBlow.playIt();;
        enemyContact = 0; 
    }
    if (midContact >= 2) {
        shield = shield - 20;
        document.getElementById("shield").value = shield;
        enemyBlow.playIt();
        midContact = 0; 
    }
    if(asteroidCounter >= 2) {
        shield = shield - 40;
        document.getElementById("shield").value = shield;
        enemyBlow.playIt();
        asteroidCounter = 0; 
    }
    if (missileShipContact >= 2) {
        shield = shield - 40;
        document.getElementById("shield").value = shield;
        enemyBlow.playIt();
        missileShipContact = 0; 
    }
    if (bossShipContact >= 2) {
        shield = shield - 40;
        document.getElementById("shield").value = shield;
        enemyBlow.playIt();
        bossShipContact = 0; 
    }
    if (enemyFireContact >= 2) {
        shipHit.playIt();
    }
    if (enemyMissileFireContact >= 2) { //impact control from enemy missile ships. 
        missileExplode.playIt();
        shield = shield - 40;
        document.getElementById("shield").value = shield;
        enemyMissileFireContact = 0; 
    }
    if (missile.y <= missileChangeFromShipCanvasHeight) { //changes missile image after it fires. 
        missile.img = mf;
    } 
    if (missile.y >= missileOnShipHeight) {
        missile.img = mi;
    }
    if (fireAway > 10) {
        fire();
        overchargeUpgrade.playIt();
        fireAway++;
    }
    if (fireAway > 200) {
        fireAway = 0;
    }
    if (shieldUp > 10) {
        opacityUpgrade.playIt();
        ship.img = sc;
        shieldV = shield; 
        shieldUp++;
    }
    if (shieldUp > 200) {
        ship.img = pd; 
        shieldUp = 0;  
    }
    if (shield > 301) { //keeps shield at 300 max. 
        shield = 300;
    }
    if (backupAmount >= 100){ //adds button when helper bar fills. 
        document.getElementById("helpButton").style.display = "inline"; 
    }  
    if (backupAmount < 100){
        document.getElementById("helpButton").style.display = "none";
    }
    if (mainTimerCounter >= 59) {
        mainTimerCounter = 0;
        mainTimerCounterDisplay++;  
    }
    if (mainTimerCounter <= 10) { //sets the counter 0 on and off. 
        mainCounter0 = "0"; 
    }
    if (mainTimerCounter >= 10) {
        mainCounter0 = ""; 
    }
    if (enemyShipHit === 2) {
        missileLaunch.playIt();
        changeMM.setAttribute("onclick", " "); 
        changeMM.style.backgroundImage = "linear-gradient(rgb(50, 50, 50), rgb(70, 70, 70))";
    }
    if (enemyShipHit < 2) {
        changeMM.setAttribute("onclick", "missileFire()");  
        changeMM.style.backgroundImage = "linear-gradient(rgb(255, 123, 0), rgb(88, 43, 0))"; 
    }
    if(shield <= 0){ //ends game.
        endGameSound.playIt(); 
        end(); 
    }
    moveShip(ship);
    missileMove(missile);
}; 
const playsTravelBackgroundSound = () => {
    travel.playIt(); 
    setTimeout(playsTravelBackgroundSound, 20000); 
};  

const backgroundBlur = () => {
    let color1 = "red"; 
    let color2 = "red";
    let randNum = Math.floor((Math.random() * 2) + 1); 
    if(randNum === 1){
    document.querySelector("body").style.backgroundColor = color1; 
    setTimeout(backgroundRestore, 200); 
    }
    if(randNum === 2){
        document.querySelector("body").style.backgroundColor = color2; 
        setTimeout(backgroundRestore, 200); 
    }
}; 
const backgroundRestore = () => {
    document.querySelector("body").style.backgroundColor = "rgb(255, 255, 255)";
};  

// document.querySelector("html").addEventListener("click", backgroundBlur); //changes the background color on page click 


document.getElementById("btnListen1").addEventListener("click", bringUpAreYouSure); 
document.getElementById("btnListen2").addEventListener("click", bringUpAreYouSure);
document.getElementById("btnListen3").addEventListener("click", bringUpAreYouSure);
document.getElementById("btnListen4").addEventListener("click", bringUpAreYouSure);
document.getElementById("btnListen5").addEventListener("click", bringUpAreYouSure);
document.getElementById("btnListen6").addEventListener("click", bringUpAreYouSure);
document.getElementById("btnListen7").addEventListener("click", bringUpAreYouSure);
document.getElementById("F").addEventListener("click", fire); 
document.getElementById("changeM").addEventListener("click", missileFire);
document.getElementById("C").addEventListener("click", chaff);
document.getElementById("helpButton").addEventListener("click", help1);
document.getElementById("helpButton").addEventListener("click", help2);
document.getElementById("D").addEventListener("click", dodge);

window.addEventListener('keypress', event=>{
    if (event.code === 'KeyA'){
        moveL(ship); 
    };
    if (event.code === 'KeyD'){
        moveR(ship); 
    };
    if (event.code === 'Space'){
        event.preventDefault();
        fire(); 
    };
    if (event.code === 'KeyS'){
        missileFire(); 
    };
    if (event.code === 'KeyW'){
        chaff(); 
    };
    if (event.code === 'KeyW'){
        chaff(); 
    };
    if (event.code === 'KeyQ' || event.code === 'KeyE'){
        dodge(); 
    };
    if (event.code === 'KeyB'){
        help1();
        help2();  
    };
})