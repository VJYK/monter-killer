const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE =14;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

let userInput  = prompt('Enter the chosenMax life', '100')
let chosenMaxLife =parseInt(userInput);
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let bonusLife =true;


adjustHealthBars(chosenMaxLife)
function writeToLog(ev,val,){

}
function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife)
}
function endRound(){
    let intialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if(currentPlayerHealth<=0 && bonusLife){
        bonusLife = false;
        removeBonusLife()
        currentPlayerHealth = intialPlayerHealth;
        setPlayerHealth(intialPlayerHealth)
        alert('You would be dead but safe because have bonuslife');
    }
    if(currentMonsterHealth <=0 && currentPlayerHealth>0){
        alert('You Won!')
    } else if(currentPlayerHealth <=0 && currentMonsterHealth>0){
        alert('You Lost');
    }else if(currentMonsterHealth<= 0 && currentPlayerHealth <=0){
        alert('Match Draw')
    }
    if(currentMonsterHealth <=0 || currentPlayerHealth<=0){
        reset()
    }
}


function attackMonster(mode){
    let maxDamage = mode === MODE_ATTACK?ATTACK_VALUE:STRONG_ATTACK_VALUE;
   // if(mode === MODE_ATTACK){
     //   maxDamage = ATTACK_VALUE;
    //}else if(mode=== MODE_STRONG_ATTACK){
      //  maxDamage = STRONG_ATTACK_VALUE;
   // }
   const damage = dealMonsterDamage(maxDamage);
   currentMonsterHealth -= damage;
   endRound()
}
function attackHandler(){
    attackMonster(MODE_ATTACK)
}
function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK)
}
function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE ){
        alert("You can't heal more than your max initial heal value")
        healValue = chosenMaxLife - HEAL_VALUE;
    }else{
        healValue = HEAL_VALUE
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += healValue;
    endRound()
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);