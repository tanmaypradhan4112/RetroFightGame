let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;

let fighting;
let monsterHealth;
let inventory = ["stick"];

// button
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');

// info text
const text = document.querySelector('#text');
const xptext = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');

// monster info
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');

const monsters=[
  {
    name: "Slime",
    level: 2,
    health: 15
  },

  {
    name: "Fanged Beast",
    level: 8,
    health: 60
  },

  {
    name:"Dragon",
    level: 20,
    health: 300
  },
  
];

const weapons = [
  {
    name:"stick",
    power:5
  },

  {
    name:"dagger",
    power:30
  },

  {
    name:"hammer",
    power:50
  },

  {
    name:"sword",
    power:100
  }
];

const locations=[
  {
    name: "Town Square",
    "button text" : ["Go to Store","Go to Cave","Fight Dragon"],
    "button function" : [goStore,goCave,fightDragon],
    text:"You are in the Town Square,You see the sign that's says \"Store\""
  },

  {
    name: "Store",
    "button text" : ["Buy 10 Health (10 Gold)","Buy a Weapon (30 Gold)","Go to the Town Square"],
    "button function" : [buyHealth,buyWeapon,goTown],
    text:"You have enter the Store"
  },

  {
    name: "Cave",
    "button text" : ["Fight Slime","Fight Fanged Beast","Go to the Town Square"],
    "button function" : [fightSlime,fightBeast,goTown],
    text:"You have entered the cave, you may see some monsters"
  },

  {
    name: "Fight",
    "button text" : ["Attack","Dodge","Run"],
    "button function" : [attack,dodge,goTown],
    text:"You are fighting a monster"
  },

  {
    name: "Kill Monster",
    "button text" : ["Got to Town Square","Got to Town Square","Got to Town Square"],
    "button function" : [goTown,goTown,easterEgg],
    text:"You have defeated the monster, Well done Warrior. You gain XP and Gold"
  },

  {
    name: "lose",
    "button text" : ["Replay?","Replay?","Replay?"],
    "button function" : [restart,restart,restart],
    text:"You died."
  },

  {
    name: "win",
    "button text" : ["Replay?","Replay?","Replay?"],
    "button function" : [restart,restart,restart],
    text:"You defeat the Dragon. You have Won. GAME OVER."
  },

  {
    name: "easter egg",
    "button text" : ["2?","8?","Go to Town Square"],
    "button function" : [pickTwo,pickEight,goTown],
    text:"Suprise You have found an Easter Egg. Ten Numbers will be randomly selected between 0 and 10. Try your luck and win the game.\n"
  }

];

// onclick function
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button function"][0];
  button2.onclick = location["button function"][1];
  button3.onclick = location["button function"][2];
  text.innerText = location.text;
}

function goTown(){
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth(){
  if(gold >= 10){    
  gold -= 10;
  health += 10;
  goldText.innerText = gold;
  healthText.innerText = health;
  } 
  else{
    text.innertext = "You do not have enough gold to buy health";
  }
  
}

function buyWeapon(){
  if(currentWeapon < weapons.length - 1){
    if(gold >= 30){
      gold -= 30;
      currentWeapon += 1;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You have unlocked a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " Your Inventory " + inventory;
    }
    else{
      text.innertext += "You do not have enough gold to buy a Weapon";
    }
  }
  else{
    text.innertext += "You already have the most powerfull weapon";
    button2.innerText = "Sell the weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
  
}

function sellWeapon(){
  if(inventory.length > 1){
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innertext = "You have sold " + currentWeapon + " for " + gold + " gold.";
    text.innerText += " Your Inventory" + inventory;
  }
  else{
    text.innerText = "Don't sell your only weapon";
  }
}


// Fighting Monsters
function fightSlime(){
  fighting = 0;
  goFight();
}

function fightBeast(){
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight(){
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}


function attack(){
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " Use your " + weapons[currentWeapon].name + " to fight.";
  if(isMonsterHit()){
    health -=  getMonsterAttackValue(monsters[fighting].level);
  }
  else{
    text.innerText += "You Miss";
  }
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if(health<=0){
    lose();
  }
  else if(monsterHealth <= 0){
      if(fighting === 2){
        winGame();
      }
      else{
        defeatMonster();
      }
  }

  if(Math.random() <= .1 && inventory.length !== 1){
    text.innerText += " Your " + inventory.pop() + " breaks. ";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level){
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit;
}

function isMonsterHit(){
  return Math.random () > .2 || health < 20;
}


function dodge(){
  text.innerText = "You the dodged the attack from "+ monsters[fighting].name + ".";
}

function lose(){
  update(locations[5]);
}

function defeatMonster(){
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xptext.innerText = xp;
  update(locations[4]);
}

function winGame(){
  update(locations[6]);
}

function restart(){
  xp =0;
  gold = 50;
  health = 100;
  currentWeapon = 0
  inventory= ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xptext.innerText = xp;
  goTown();
}

function easterEgg(){
  update(locations[7]);
}

function pickTwo(){
    pick(2);
}

function pickEight(){
    pick(8);
}

function pick(guess){
  let numbers = []
  while(numbers.length < 10){
      numbers.push(Math.floor(Math.random() * 11));
  }
  text.innertext = " You picked "+ guess + ". here are the numbers: \n";

  for(let i=0;i<10;i++){
    text.innerText += numbers[i] + "\n";
  }

  if(numbers.indexOf(guess) !== -1){
    text.innerText += "Yay!! you win. You are Awarded wiht 20 gold.";
    gold += 20;
    goldText.innerText = gold
  }
  else{
    text.innerText += "I'm Sorry, you lose 10 Health";
    health -= 10;
    healthText.innerText = health;
    if(health<=0){
      lose();
    }
  }
}
  
