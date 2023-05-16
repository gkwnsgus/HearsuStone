var CardMaker = function(){
  this.makeCardEffect = undefined;
}//factorymethod의 creater추상클래스 역할
CardMaker.prototype.makeCard = function(effectNum){
  var card = (this.makeCardEffect(effectNum));
  card.setCardDefaultProperty()
  return card;
}

var MobCardMaker = function(){}//factorymethod의 concreteCreator클래스
MobCardMaker.prototype.EffectCreate = function(effectNum){
  switch(effectNum){
    case 1:
      return new MobCard_BuffOtherCard_MobEffect(getRandomNumber(1,3));
    case 2:
      return new MobCard_SummonOtherCard_MobEffect(1);
    case 3:
      return new MobCard_DirectHit_MobEffect(getRandomNumber(1,5));
    default:
      return new MobCard_NonEffect_MobEffect();
  }
}

var ExtraCardMaker = function(){}//factorymethod의 concreteCreator클래스
ExtraCardMaker.prototype.EffectCreate = function(effectNum){
  switch(effectNum){
    case 1:
      return new ExtraCard_Heal_ExtraEffect(getRandomNumber(3,5));
    case 2:
      return new ExtraCard_DirectHit_ExtraEffect(getRandomNumber(3,5));
    case 3:
      return new ExtraCard_Defence_ExtraEffect(getRandomNumber(1,2));
    case 4:
      return new ExtraCard_AttackBuff_ExtraEffect(getRandomNumber(1,3));
  }
}

var MobCard = function(){}
MobCard.prototype.setCardDefaultProperty = function(){
  (this.cost) = getRandomNumber(1,6);
  (this.hp) = getRandomNumber(1,9);
  (this.atk)= getRandomNumber(3,7);
}
var ExtraCard = function(){
  this.effectAlgorithm = undefined;
}
ExtraCard.prototype.setCardDefaultProperty = function(){
  (this.cost) = getRandomNumber(3,5);
}

var MobCard_NonEffect_MobEffect = function(){
  this.cost;
  this.hp;
  this.atk;
}//factorymethod의 product클래스

var MobCard_BuffOtherCard_MobEffect = function(amount){
  this.effectType = 1;
  this.amount = amount;
  this.cost;
  this.hp;
  this.atk;
}//factorymethod의 product클래스

var MobCard_SummonOtherCard_MobEffect = function(amount){
  this.effectType = 2;
  this.amount = amount;
  this.cost;
  this.hp;
  this.atk;
}//factorymethod의 product클래스

var MobCard_DirectHit_MobEffect = function(amount){
  this.effectType = 3;
  this.amount = amount;
  this.cost;
  this.hp ;
  this.atk;
}//factorymethod의 product클래스

var ExtraCard_Heal_ExtraEffect = function(amount){
  this.amount = amount;
  this.cost ;
  this.effectType = 4;
}//factorymethod의 product클래스
ExtraCard_Heal_ExtraEffect.prototype.effectAlgorithm = function(){
  Player.instance.hp+=(this.amount);
  Player.instance.UpdateHPImg();
}

var ExtraCard_DirectHit_ExtraEffect = function(amount){
  this.amount = amount;
  this.cost;
  this.effectType = 5;
}//factorymethod의 product클래스
ExtraCard_DirectHit_ExtraEffect.prototype.effectAlgorithm = function(){
  NPC.instance.DecreaseHP((this.amount));
}

var ExtraCard_Defence_ExtraEffect = function(amount){
  this.amount = amount;
  this.cost;
  this.effectType = 6;
}//factorymethod의 product클래스
ExtraCard_Defence_ExtraEffect.prototype.effectAlgorithm = function(){
  Player.instance.sheld = true;
}

var ExtraCard_AttackBuff_ExtraEffect = function(amount){
  this.amount = amount;
  this.cost ;
  this.effectType = 7;
}//factorymethod의 product클래스
ExtraCard_AttackBuff_ExtraEffect.prototype.effectAlgorithm = function(){
  MainGame.instance.effectPhase_buffBoolean = true;
  MainGame.instance.effectPhase_buffAmount = (this.amount);
}

var mobCard = new MobCard();
var extraCard_heal = new ExtraCard();
extraCard_heal.effectAlgorithm = ExtraCard_Heal_ExtraEffect.prototype.effectAlgorithm;
var extraCard_direct = new ExtraCard();
extraCard_direct.effectAlgorithm = ExtraCard_DirectHit_ExtraEffect.prototype.effectAlgorithm;
var extraCard_defence = new ExtraCard();
extraCard_defence.effectAlgorithm = ExtraCard_Defence_ExtraEffect.prototype.effectAlgorithm;
var extraCard_buff = new ExtraCard();
extraCard_buff.effectAlgorithm = ExtraCard_AttackBuff_ExtraEffect.prototype.effectAlgorithm;

MobCard_NonEffect_MobEffect.prototype = mobCard//상속
MobCard_BuffOtherCard_MobEffect.prototype = mobCard;//상속
MobCard_SummonOtherCard_MobEffect.prototype = mobCard;//상속
MobCard_DirectHit_MobEffect.prototype = mobCard;//상속

ExtraCard_Heal_ExtraEffect.prototype = extraCard_heal;//상속
ExtraCard_DirectHit_ExtraEffect.prototype = extraCard_direct;//상속
ExtraCard_Defence_ExtraEffect.prototype = extraCard_defence;//상속
ExtraCard_AttackBuff_ExtraEffect.prototype = extraCard_buff;//상속

var getRandomNumber = function(min,max){
var randNum = Math.floor(Math.random()*max)+1;
if(randNum<min){
  randNum = getRandomNumber(min,max);
}
return randNum;
}

var cardMaker_mob = new CardMaker();
cardMaker_mob.makeCardEffect = MobCardMaker.prototype.EffectCreate;//팩토리메소드 할당
var cardMaker_extra = new CardMaker();
cardMaker_extra.makeCardEffect = ExtraCardMaker.prototype.EffectCreate;//팩토리메소드 할당
MobCardMaker.prototype = cardMaker_mob;//상속
ExtraCardMaker.prototype =cardMaker_extra;//상속
var mobCardMaker = new MobCardMaker();
var extraCardMaker = new ExtraCardMaker();

var Deck = function(){
this.deck = [];
}//덱 클래스
Deck.prototype.PushCardToDeck = function(card){//덱에 카드 삽입
  if(this.deck.length<=30){
    this.deck.push(card);
  }else{
    console.log("fullList")
  }
}
Deck.prototype.ResetDeck = function(){//덱 초기화
  this.deck.splice(0);
}

var playerDeck = new Deck()
var npcDeck = new Deck;

var setDeck = function(deck){//덱에 카드생성후 셔플
  deck.ResetDeck();
  for(var i =0; i<20; i++){
    deck.deck[i] = mobCardMaker.makeCard(getRandomNumber(1,6));//factoryMethod 사용
  }
  for(var i =0; i<10; i++){
    deck.deck[i+20] = extraCardMaker.makeCard(getRandomNumber(1,4));//factoryMethod 사용
  }
  deck.deck.sort(() => Math.random() - 0.5);
}
var setDeckNPC= function(deck){//덱에 카드생성후 셔플
  deck.ResetDeck();
  for(var i =0; i<30; i++){
    deck.deck[i] = mobCardMaker.makeCard(0);//factoryMethod 사용
  }
  deck.deck.sort(() => Math.random() - 0.5);
}

setDeck(playerDeck);
console.log(playerDeck);
setDeckNPC(npcDeck);

var Character = function(){//캐릭터 부모클래스
}
Character.prototype.DecreaseHP = function(damage){//캐릭터HP 감소
  if((this.sheld)){
    (this.sheld)=false;
  }else{
    this.hp -= damage;
  }
  if(Player.instance.hp<=0){
    document.getElementById("front").src = "n0.png";
    document.getElementById("rear").src = "n0.png";
    alert('YOU LOSE!!');
  }else if(NPC.instance.hp<=0){
    document.getElementById("nfront").src = "n0.png";
    document.getElementById("nrear").src = "n0.png";
    alert('YOU WIN!!');
  }else
    (this.instance).UpdateHPImg();
}
Character.prototype.UpdateHPImg = function(){
  var ten = Math.floor(Player.instance.hp/10);
  document.getElementById("front").src = "n"+(ten).toString()+".png";
  document.getElementById("rear").src = "n"+(Player.instance.hp-(ten*10)).toString()+".png";
  ten = Math.floor(NPC.instance.hp/10);
  document.getElementById("nfront").src = "n"+(ten).toString()+".png";
  document.getElementById("nrear").src = "n"+(NPC.instance.hp-(ten*10)).toString()+".png";
}
Character.prototype.CostUp = function(){//사용가능 코스트 상향
  if(this.cost<9)
    this.cost+=1;
  (this.availableCost) = this.cost;
}

var Player = function(){//플레이어 클래스
  this.instance = undefined;
  this.hp = 30;
  this.sheld = false;
  this.cost = 3;//
  this.availableCost = this.cost;
  this.deck = [];
  this.hand = [];
}
Player.getInstance = function(){//싱글톤화
  if(this.instance === undefined){
    (this.instance)= new Player();
    (this.instance).instance = (this.instance);
  }
return (this.instance);
}

var NPC = function(){//NPC클래스
this.instance = undefined;
this.hp = 30;
this.deck = undefined;
}
NPC.getInstance = function(){//싱글톤화
  if(this.instance === undefined){
    (this.instance) = new NPC();
    (this.instance).instance = (this.instance);
  }
  return (this.instance);
}

var character = new Character();
Player.prototype = character;//상속
NPC.prototype = character;//상속
Player.getInstance();//싱글톤화
Player.instance.deck = playerDeck.deck;//덱 배정
NPC.getInstance();//싱글톤화
NPC.instance.deck = npcDeck.deck;//덱 배정
console.log(Player.instance.deck);
console.log(Player.instance.deck[1]);
//preGame.ReRollPlayerDeck();
console.log(Player.instance.deck);
console.log(Player.instance.hand);
var btn = document.getElementsByClassName("btn")[0];

btn.addEventListener("click",function(){
  switch(MainGame.instance.nowTurn){
    case "draw":
      console.log(Field.instance.playerField);
      MainGame.instance.StartSummonPhase();
      break;
    case "summon":
      MainGame.instance.StartAttackPhase();
      break;
    case "attack":
      MainGame.instance.StartEffectPhase();
      break;
    case "effect":
      MainGame.instance.StartNPCPhase();
      break;
    case "gamestart":
      MainGame.instance.GameStart();
      break;
  }
})

var ExtraCardEffect = function(){
  this.extraCard = undefined;
}
ExtraCardEffect.prototype.setExtraCard = function(extraCard){
  (this.extraCard) = extraCard;
}
ExtraCardEffect.prototype.doEffect = function(){
  (this.extraCard).effectAlgorithm();
}

var ScreenUpdate = function(){}
ScreenUpdate.prototype.UpDateEvery = function(){
  Field.instance.UpdateFieldImg();
  MainGame.instance.UpdateHandImg();
  MainGame.instance.UpdateCostImg();
}
ScreenUpdate.prototype.UpdateField = function(){
  Field.instance.UpdateFieldImg();
}


var Field = function(){//필드클래스(몹소환장소)
  this.instance = undefined;
  this.npcField = [];
  this.npcField.length = 4;
  this.playerField = [];
  this.playerField.length =4;
  this.effectingCard = undefined;
}
Field.getInstance = function(){//싱글톤화
  if(this.instance === undefined){
    (this.instance) = new Field();
    (this.instance).instance = (this.instance);
  }
}
Field.getInstance();//싱글톤화
Field.prototype.SummonCard = function(place){
  if(MainGame.instance.summonCardBoolean){
    (this.instance).playerField[place] = Player.instance.hand[MainGame.instance.selectedCard];
    Player.instance.hand[MainGame.instance.selectedCard] = undefined;
    if((this.instance).playerField[place].effectType!=0){
      if((this.instance).playerField[place].effectType==1){//buffothercard
        MainGame.instance.summondMobHasEffect = 1;
        (this.instance).effectingCard = place;
      }else if((this.instance).playerField[place].effectType==2){//summonothercard
        MainGame.instance.summondMobHasEffect = 2;
        (this.instance).effectingCard = place;
      }
    }
  }
  var screanUpdate = new ScreenUpdate();
  screanUpdate.UpdateField();
  MainGame.instance.summonCardBoolean = false;
}
Field.prototype.NPCSummonCard = function(){
  var place = getRandomNumber(1,4)-1;
  if(!(this.instance).npcField[place]){
    (this.instance).npcField[getRandomNumber(1,4)-1] = NPC.instance.deck[MainGame.instance.npcDeckNum];
    MainGame.instance.npcDeckNum+=1;
  }else{
    var summonOk = false;
    for(var i =0;i<4;i++){
      if(!(this.instance).npcField[i])summonOk =true;
    }
    if(summonOk)
      (this.instance).NPCSummonCard();
  }
  setTimeout(function() {
    Field.instance.UpdateNPCFieldImg();
  }, 2000);
}
Field.prototype.BuffByExtraCard = function(cardnum){
  if((this.instance).playerField[cardnum]){
    (this.instance).playerField[cardnum].atk+=MainGame.instance.effectPhase_buffAmount;
  }
  if((this.instance).playerField[cardnum].atk>10)(this.instance).playerField[cardnum].atk=10;
  (this.instance).UpdateFieldImg();
}
Field.prototype.BuffOtherCard = function(cardnum){
  if((this.instance).playerField[cardnum])
  (this.instance).playerField[cardnum].atk+=(this.instance).playerField[(this.instance).effectingCard].amount;
  if((this.instance).playerField[cardnum].atk>10)(this.instance).playerField[cardnum].atk=10;
  (this.instance).playerField[(this.instance).effectingCard].effectType=0;
  (this.instance).UpdateFieldImg();
  MainGame.instance.summondMobHasEffect=0;
}
Field.prototype.SummonOthercard = function(cardnum){
  if(!(this.instance).playerField[cardnum]){
    (this.instance).playerField[cardnum] = mobCardMaker.makeCard(0);
    (this.instance).UpdateFieldImg();
    console.log((this.instance).playerField);
    (this.instance).playerField[(this.instance).effectingCard].effectType=0;
    (this.instance).UpdateFieldImg();
    MainGame.instance.summondMobHasEffect=0;
  }
}
Field.prototype.AttackCard = function(){
  if(MainGame.instance.attackPhase_alreadyAttacked[MainGame.instance.attackPhase_P_FieldNum]==false&&
    Field.instance.playerField[MainGame.instance.attackPhase_P_FieldNum]!=undefined){
    if(Field.instance.npcField[MainGame.instance.attackPhase_N_FieldNum]&&
      Field.instance.playerField[MainGame.instance.attackPhase_P_FieldNum].effectType!=3){
      Field.instance.npcField[MainGame.instance.attackPhase_N_FieldNum].hp-=Field.instance.playerField[MainGame.instance.attackPhase_P_FieldNum].atk;
      if(Field.instance.npcField[MainGame.instance.attackPhase_N_FieldNum].hp<=0){
        Field.instance.npcField[MainGame.instance.attackPhase_N_FieldNum] = undefined;
      }
    }else{
      NPC.instance.DecreaseHP(Field.instance.playerField[MainGame.instance.attackPhase_P_FieldNum].atk);
    }
  }else{
    console.log("alreadyAttacked");
  }
  console.log(NPC.instance.hp);
}
Field.prototype.CheckMobCardEffect = function(){
  for(var i =0; i<4;i++){
    if(Field.instance.playerField[i].amount!=undefined){
      if(Field.instance.playerField[i].effectType==1){//buffothercard
        MainGame.instance.summondMobHasEffect[i] = true;
      }else if(Field.instance.playerField[i].effectType==2){//summonothercard
        MainGame.instance.summondMobHasEffect[i] = true;
      }
    }
  }
}
Field.prototype.npcAttackCard = function(){
  var playerCard = [];
  var j=0;
  for(var i=0;i<4;i++){
    if((this.instance).playerField[i]){
      playerCard[j]=i;
      j++;
    }
  }
  for(var i=0;i<4;i++){
    if((this.instance).npcField[i]){
      console.log(playerCard);
      if(j==0){
        Player.instance.DecreaseHP(Field.instance.npcField[i].atk);
        console.log(Player.instance.hp);
      }else{
        var place =(getRandomNumber(1,j)-1);
        if(playerCard[place]!=undefined){
          (this.instance).playerField[playerCard[place]].hp-=(this.instance).npcField[i].atk;
          if((this.instance).playerField[playerCard[place]].hp<=0){
            (this.instance).playerField[playerCard[place]]=undefined;
            playerCard[place]=undefined;
            j--;
          }
        }else{
          Player.instance.DecreaseHP(Field.instance.npcField[i].atk);
        console.log(Player.instance.hp);
        }
      }
    }
  }
  (this.instance).UpdateFieldImg();
}
Field.prototype.UpdateFieldImg = function(){
  for(var i=0;i<4;i++){
    if((this.instance).playerField[i]===undefined){
      document.getElementById("FieldCard"+(i+1).toString()+"ImgID").src = "Field_Empty.png";
      document.getElementById("fc"+(i+1).toString()+"cost").src = "non.png";
      document.getElementById("fc"+(i+1).toString()+"hp").src = "non.png";
      document.getElementById("fc"+(i+1).toString()+"atk").src = "non.png";
      document.getElementById("fc"+(i+1).toString()+"effect").src = "non.png";
    }else{
      switch((this.instance).playerField[i].cost)
      {
        case 1:
          document.getElementById("FieldCard"+(i+1).toString()+"ImgID").src = "mob1.png";
          document.getElementById("fc"+(i+1).toString()+"cost").src = "n1.png";
          break;
        case 2:
          document.getElementById("FieldCard"+(i+1).toString()+"ImgID").src = "mob2.png";
          document.getElementById("fc"+(i+1).toString()+"cost").src = "n2.png";
          break;
        case 3:
          document.getElementById("FieldCard"+(i+1).toString()+"ImgID").src = "mob3.png";
          document.getElementById("fc"+(i+1).toString()+"cost").src = "n3.png";
          break;
        case 4:
          document.getElementById("FieldCard"+(i+1).toString()+"ImgID").src = "mob4.png";
          document.getElementById("fc"+(i+1).toString()+"cost").src = "n4.png";
          break;
        case 5:
          document.getElementById("FieldCard"+(i+1).toString()+"ImgID").src = "mob5.png";
          document.getElementById("fc"+(i+1).toString()+"cost").src = "n5.png";
          break;
        case 6:
          document.getElementById("FieldCard"+(i+1).toString()+"ImgID").src = "mob6.png";
          document.getElementById("fc"+(i+1).toString()+"cost").src = "n6.png";
          break;
        default:
          document.getElementById("FieldCard"+(i+1).toString()+"ImgID").src = "non.png";
          document.getElementById("fc"+(i+1).toString()+"cost").src = "non.png";
          break;
      }
      switch((this.instance).playerField[i].hp){
        case 1:
          document.getElementById("fc"+(i+1).toString()+"hp").src = "n1.png";
          break;
        case 2:
          document.getElementById("fc"+(i+1).toString()+"hp").src = "n2.png";
          break;
        case 3:
          document.getElementById("fc"+(i+1).toString()+"hp").src = "n3.png";
          break;
        case 4:
          document.getElementById("fc"+(i+1).toString()+"hp").src = "n4.png";
          break;
        case 5:
          document.getElementById("fc"+(i+1).toString()+"hp").src = "n5.png";
          break;
        case 6:
          document.getElementById("fc"+(i+1).toString()+"hp").src = "n6.png";
          break;
        case 7:
          document.getElementById("fc"+(i+1).toString()+"hp").src = "n7.png";
          break;
        case 8:
          document.getElementById("fc"+(i+1).toString()+"hp").src = "n8.png";
          break;
        case 9:
          document.getElementById("fc"+(i+1).toString()+"hp").src = "n9.png";
          break;
        case 10:
          document.getElementById("fc"+(i+1).toString()+"hp").src = "n10.png";
          break;
        default:
          document.getElementById("fc"+(i+1).toString()+"hp").src = "non.png";
          break;
      }
      switch((this.instance).playerField[i].atk){
        case 3:
          document.getElementById("fc"+(i+1).toString()+"atk").src = "n3.png";
          break;
        case 4:
          document.getElementById("fc"+(i+1).toString()+"atk").src = "n4.png";
          break;
        case 5:
          document.getElementById("fc"+(i+1).toString()+"atk").src = "n5.png";
          break;
        case 6:
          document.getElementById("fc"+(i+1).toString()+"atk").src = "n6.png";
          break;
        case 7:
          document.getElementById("fc"+(i+1).toString()+"atk").src = "n7.png";
          break;
          case 8:
          document.getElementById("fc"+(i+1).toString()+"atk").src = "n8.png";
          break;
        case 9:
          document.getElementById("fc"+(i+1).toString()+"atk").src = "n9.png";
          break;
        case 10:
          document.getElementById("fc"+(i+1).toString()+"atk").src = "n10.png";
          break;
        default:
          document.getElementById("fc"+(i+1).toString()+"atk").src = "non.png";
          break;
      }
      switch((this.instance).playerField[i].effectType){
        case 1:
          document.getElementById("fc"+(i+1).toString()+"effect").src = "blue_magic.png";
          break;
        case 2:
          document.getElementById("fc"+(i+1).toString()+"effect").src = "yellow_magic.png";
          break;
        case 3:
          document.getElementById("fc"+(i+1).toString()+"effect").src = "red_magic.png";
          break;
        default:
          document.getElementById("fc"+(i+1).toString()+"effect").src = "non.png";
          break;
      }
    }
  }
}
Field.prototype.UpdateNPCFieldImg = function(){
  for(var i=0;i<4;i++){
    if((this.instance).npcField[i]===undefined){
      document.getElementById("NPCFieldCard"+(i+1).toString()+"ImgID").src = "Field_Empty.png";
      document.getElementById("nfc"+(i+1).toString()+"cost").src = "non.png";
      document.getElementById("nfc"+(i+1).toString()+"hp").src = "non.png";
      document.getElementById("nfc"+(i+1).toString()+"atk").src = "non.png";
      document.getElementById("nfc"+(i+1).toString()+"effect").src = "non.png";
    }else{
      switch((this.instance).npcField[i].cost)
      {
        case 1:
          document.getElementById("NPCFieldCard"+(i+1).toString()+"ImgID").src = "mob1.png";
          document.getElementById("nfc"+(i+1).toString()+"cost").src = "n1.png";
          break;
        case 2:
          document.getElementById("NPCFieldCard"+(i+1).toString()+"ImgID").src = "mob2.png";
          document.getElementById("nfc"+(i+1).toString()+"cost").src = "n2.png";
          break;
        case 3:
          document.getElementById("NPCFieldCard"+(i+1).toString()+"ImgID").src = "mob3.png";
          document.getElementById("nfc"+(i+1).toString()+"cost").src = "n3.png";
          break;
        case 4:
          document.getElementById("NPCFieldCard"+(i+1).toString()+"ImgID").src = "mob4.png";
          document.getElementById("nfc"+(i+1).toString()+"cost").src = "n4.png";
          break;
        case 5:
          document.getElementById("NPCFieldCard"+(i+1).toString()+"ImgID").src = "mob5.png";
          document.getElementById("nfc"+(i+1).toString()+"cost").src = "n5.png";
          break;
        case 6:
          document.getElementById("NPCFieldCard"+(i+1).toString()+"ImgID").src = "mob6.png";
          document.getElementById("nfc"+(i+1).toString()+"cost").src = "n6.png";
          break;
        default:
          document.getElementById("NPCFieldCard"+(i+1).toString()+"ImgID").src = "non.png";
          document.getElementById("nfc"+(i+1).toString()+"cost").src = "non.png";
          break;
      }
      switch((this.instance).npcField[i].hp){
        case 1:
          document.getElementById("nfc"+(i+1).toString()+"hp").src = "n1.png";
          break;
        case 2:
          document.getElementById("nfc"+(i+1).toString()+"hp").src = "n2.png";
          break;
        case 3:
          document.getElementById("nfc"+(i+1).toString()+"hp").src = "n3.png";
          break;
        case 4:
          document.getElementById("nfc"+(i+1).toString()+"hp").src = "n4.png";
          break;
        case 5:
          document.getElementById("nfc"+(i+1).toString()+"hp").src = "n5.png";
          break;
        case 6:
          document.getElementById("nfc"+(i+1).toString()+"hp").src = "n6.png";
          break;
        case 7:
          document.getElementById("nfc"+(i+1).toString()+"hp").src = "n7.png";
          break;
        case 8:
          document.getElementById("nfc"+(i+1).toString()+"hp").src = "n8.png";
          break;
        case 9:
          document.getElementById("nfc"+(i+1).toString()+"hp").src = "n9.png";
          break;
        case 10:
          document.getElementById("nfc"+(i+1).toString()+"hp").src = "n10.png";
          break;
        default:
          document.getElementById("nfc"+(i+1).toString()+"hp").src = "non.png";
          break;
      }
      switch((this.instance).npcField[i].atk){
        case 3:
          document.getElementById("nfc"+(i+1).toString()+"atk").src = "n3.png";
          break;
        case 4:
          document.getElementById("nfc"+(i+1).toString()+"atk").src = "n4.png";
          break;
        case 5:
          document.getElementById("nfc"+(i+1).toString()+"atk").src = "n5.png";
          break;
        case 6:
          document.getElementById("nfc"+(i+1).toString()+"atk").src = "n6.png";
          break;
        case 7:
          document.getElementById("nfc"+(i+1).toString()+"atk").src = "n7.png";
          break;
        case 8:
          document.getElementById("nfc"+(i+1).toString()+"atk").src = "n8.png";
          break;
        case 9:
          document.getElementById("nfc"+(i+1).toString()+"atk").src = "n9.png";
          break;
        case 10:
          document.getElementById("nfc"+(i+1).toString()+"atk").src = "n10.png";
          break;
        default:
          document.getElementById("nfc"+(i+1).toString()+"atk").src = "non.png";
          break;
      }
    }
  }
}

var MainGame = function(){
  this.instance = undefined;//자신 인스턴스
  this.turn = undefined;// 현재 턴
  this.drawCardBoolean = false;//드로우 가능 여부
  this.selectCardBoolean = false;//카드선택 가능 여부
  this.selectedCard = undefined;//선택된 카드
  //this.summonCardBoolean = false;//카드 소환 가능 여부
  //this.keepTurn = true;
  this.npcDeckNum = 0; //npc덱사용 내역
  this.nowTurn = "gamestart";
  this.attackPhase_N_FieldNum = undefined;//공격페이즈 선택npc필드 위치
  this.attackPhase_P_FieldNum = undefined;//공격페이즈 선택 플레이어몹 위치
  this.attackPhase_alreadyAttacked =[false,false,false,false];//공격페이즈 공격횟수 제한
  this.summondMobHasEffect = 0;
  this.nextDrawingCardNum = 5;
  this.effectPhase_buffBoolean = false;//이펙트페이즈 필드터치 가능여부
  this.effectPhase_buffAmount=0;//이펙트페이즈 버프량 저장
}
MainGame.getInstance = function(){
  if(this.instance === undefined){
    (this.instance)= new MainGame();
    (this.instance).instance = (this.instance);
  }
return (this.instance);
}
MainGame.getInstance();
MainGame.prototype.getHandCard= function(){//첫패 생성
  for(var i=0; i<5;i++){
    Player.instance.hand[i] = Player.instance.deck[i]
    Player.instance.deck[i] = undefined;
    console.log(Player.instance.hand[i].effectType);
  }
}
MainGame.prototype.UpdateHand = function(){//패 왼쪽으로 몰기
  for(var j =0;j<4;j++){
    for(var i =0;i<4;i++){
      if(Player.instance.hand[i]===undefined){
        Player.instance.hand[i] = Player.instance.hand[i+1]
        Player.instance.hand[i+1] = undefined;
      }
    }
  }
}
MainGame.prototype.UpdateHandImg = function(){
  for(var i=0; i<5;i++){
     if(Player.instance.hand[i] instanceof ExtraCard){
      switch(Player.instance.hand[i].cost)
      {
        case 3:
          document.getElementById("c"+(i+1).toString()+"cost").src = "n3.png";
          document.getElementById("c"+(i+1).toString()+"hp").src = "non.png";
          document.getElementById("c"+(i+1).toString()+"atk").src = "non.png";
          document.getElementById("c"+(i+1).toString()+"effect").src = "non.png";
          break;
        case 4:
          document.getElementById("c"+(i+1).toString()+"cost").src = "n4.png";
          document.getElementById("c"+(i+1).toString()+"hp").src = "non.png";
          document.getElementById("c"+(i+1).toString()+"atk").src = "non.png";
          document.getElementById("c"+(i+1).toString()+"effect").src = "non.png";
          break;
        case 5:
          document.getElementById("c"+(i+1).toString()+"cost").src = "n5.png";
          document.getElementById("c"+(i+1).toString()+"hp").src = "non.png";
          document.getElementById("c"+(i+1).toString()+"atk").src = "non.png";
          document.getElementById("c"+(i+1).toString()+"effect").src = "non.png";
          break;
        default:
          document.getElementById("c"+(i+1).toString()+"cost").src = "non.png";
          document.getElementById("c"+(i+1).toString()+"hp").src = "non.png";
          document.getElementById("c"+(i+1).toString()+"atk").src = "non.png";
          document.getElementById("c"+(i+1).toString()+"effect").src = "non.png";
          break;
      }
      if(Player.instance.hand[i].effectType == 4){
        document.getElementById("handCard"+(i+1).toString()+"ImgID").src = "heal.png";
      }else if(Player.instance.hand[i].effectType == 5){
        document.getElementById("handCard"+(i+1).toString()+"ImgID").src = "attack.png";
      }else if(Player.instance.hand[i].effectType == 7){
        document.getElementById("handCard"+(i+1).toString()+"ImgID").src = "buff.png";
      }else if(Player.instance.hand[i].effectType == 6){
        document.getElementById("handCard"+(i+1).toString()+"ImgID").src = "defend.png";
      }
    }else if(Player.instance.hand[i]===undefined){
      document.getElementById("handCard"+(i+1).toString()+"ImgID").src = "non.png";
      document.getElementById("c"+(i+1).toString()+"cost").src = "non.png";
      document.getElementById("c"+(i+1).toString()+"hp").src = "non.png";
      document.getElementById("c"+(i+1).toString()+"atk").src = "non.png";
      document.getElementById("c"+(i+1).toString()+"effect").src = "non.png";
    }else{
      switch(Player.instance.hand[i].cost)
      {
        case 1:
        document.getElementById("handCard"+(i+1).toString()+"ImgID").src = "mob1.png";
        document.getElementById("c"+(i+1).toString()+"cost").src = "n1.png";
        break;
        case 2:
        document.getElementById("handCard"+(i+1).toString()+"ImgID").src = "mob2.png";
        document.getElementById("c"+(i+1).toString()+"cost").src = "n2.png";
        break;
        case 3:
        document.getElementById("handCard"+(i+1).toString()+"ImgID").src = "mob3.png";
        document.getElementById("c"+(i+1).toString()+"cost").src = "n3.png";
        break;
        case 4:
        document.getElementById("handCard"+(i+1).toString()+"ImgID").src = "mob4.png";
        document.getElementById("c"+(i+1).toString()+"cost").src = "n4.png";
        break;
        case 5:
        document.getElementById("handCard"+(i+1).toString()+"ImgID").src = "mob5.png";
        document.getElementById("c"+(i+1).toString()+"cost").src = "n5.png";
        break;
        case 6:
        document.getElementById("handCard"+(i+1).toString()+"ImgID").src = "mob6.png";
        document.getElementById("c"+(i+1).toString()+"cost").src = "n6.png";
        break;
        default:
        document.getElementById("handCard"+(i+1).toString()+"ImgID").src = "non.png";
        document.getElementById("c"+(i+1).toString()+"cost").src = "non.png";
        break;
      }
      switch(Player.instance.hand[i].hp){
        case 1:
          document.getElementById("c"+(i+1).toString()+"hp").src = "n1.png";
          break;
        case 2:
          document.getElementById("c"+(i+1).toString()+"hp").src = "n2.png";
          break;
        case 3:
          document.getElementById("c"+(i+1).toString()+"hp").src = "n3.png";
          break;
        case 4:
          document.getElementById("c"+(i+1).toString()+"hp").src = "n4.png";
          break;
        case 5:
          document.getElementById("c"+(i+1).toString()+"hp").src = "n5.png";
          break;
        case 6:
          document.getElementById("c"+(i+1).toString()+"hp").src = "n6.png";
          break;
        case 7:
          document.getElementById("c"+(i+1).toString()+"hp").src = "n7.png";
          break;
        case 8:
          document.getElementById("c"+(i+1).toString()+"hp").src = "n8.png";
          break;
        case 9:
          document.getElementById("c"+(i+1).toString()+"hp").src = "n9.png";
          break;
        case 10:
          document.getElementById("c"+(i+1).toString()+"hp").src = "n10.png";
          break;
        default:
          document.getElementById("c"+(i+1).toString()+"hp").src = "non.png";
          break;
      }
      switch(Player.instance.hand[i].atk){
        case 3:
          document.getElementById("c"+(i+1).toString()+"atk").src = "n3.png";
          break;
        case 4:
          document.getElementById("c"+(i+1).toString()+"atk").src = "n4.png";
          break;
        case 5:
          document.getElementById("c"+(i+1).toString()+"atk").src = "n5.png";
          break;
        case 6:
          document.getElementById("c"+(i+1).toString()+"atk").src = "n6.png";
          break;
        case 7:
          document.getElementById("c"+(i+1).toString()+"atk").src = "n7.png";
          break;
        default:
          document.getElementById("c"+(i+1).toString()+"atk").src = "non.png";
          break;
      }
      switch(Player.instance.hand[i].effectType){
        case 1:
          document.getElementById("c"+(i+1).toString()+"effect").src = "blue_magic.png";
          break;
        case 2:
          document.getElementById("c"+(i+1).toString()+"effect").src = "yellow_magic.png";
          break;
        case 3:
          document.getElementById("c"+(i+1).toString()+"effect").src = "red_magic.png";
          break;
        default:
          document.getElementById("c"+(i+1).toString()+"effect").src = "non.png";
          break;
      }
    }
  }
}
MainGame.prototype.Updatecost = function(){
  Player.instance.CostUp();
}
MainGame.prototype.UpdateCostImg = function(){
  for(var i = 1; i<10;i++){
    if(i<=Player.instance.availableCost){
      document.getElementById("b"+(i).toString()+"_img").src = "0"+(i).toString()+"_background1.png";
    }else{
      document.getElementById("b"+(i).toString()+"_img").src = "non_background.png";
    }
  }
}
MainGame.prototype.GameStart = function(){
  var turn = new SummonPhaseDecorator(new DefaultTurn());
  turn.doTurn();
}
MainGame.prototype.StartSummonPhase = function(){
  var turn = new SummonPhaseDecorator(new DefaultTurn());
  turn.doTurn();
  MainGame.instance.attackPhase_alreadyAttacked =[false,false,false,false];
}
MainGame.prototype.StartAttackPhase = function(){
  var turn = new AttackPhaseDecorator(new DefaultTurn());
  turn.doTurn();
}
MainGame.prototype.StartEffectPhase = function(){
  var turn = new EffectPhaseDecorator(new DefaultTurn());
  turn.doTurn();
}
MainGame.prototype.StartNPCPhase = function(){
  var turn = new NPCAttackPhaseDecorator(new NPCSummonPhaseDecorator(new DefaultTurn()));
  turn.doTurn();
  MainGame.instance.UpdateHand();
  MainGame.instance.UpdateHandImg();
  MainGame.instance.Updatecost();
  MainGame.instance.UpdateCostImg();
  setTimeout(function() {
    var turn = new DrawPhaseDecorator(new DefaultTurn());
    turn.doTurn();
  }, 3000);
}

var ButtonDown = function(){
  this.instance =undefined;
}
ButtonDown.getInstance = function(){
  if(this.instance === undefined){
    (this.instance)= new ButtonDown();
    (this.instance).instance = (this.instance);
  }
return (this.instance);
}
ButtonDown.prototype.FieldCardSelect = function(cardNum){//플레이어필드 클릭시 실행함수
  if(MainGame.instance.summondMobHasEffect==1){
    Field.instance.BuffOtherCard(cardNum);
  }
  if(MainGame.instance.summondMobHasEffect==2){
    Field.instance.SummonOthercard(cardNum);
  }
  if(MainGame.instance.nowTurn=="summon"){
    Field.instance.SummonCard(cardNum);
  }
  if(MainGame.instance.nowTurn=="attack"){
    console.log(cardNum);
    MainGame.instance.attackPhase_P_FieldNum = cardNum;
  }
  if(MainGame.instance.nowTurn=="effect"){
    if(MainGame.instance.effectPhase_buffBoolean){
      Field.instance.BuffByExtraCard(cardNum);
    }
  }
}
ButtonDown.prototype.NFieldCardSelect = function(cardNum){//NPC필드 클릭시 실행함수
  if(MainGame.instance.nowTurn=="attack"){
    MainGame.instance.attackPhase_N_FieldNum = cardNum;
    Field.instance.AttackCard();
    MainGame.instance.attackPhase_alreadyAttacked[MainGame.instance.attackPhase_P_FieldNum] = true;
    Field.instance.UpdateNPCFieldImg();
    console.log(cardNum);
  }
}
ButtonDown.prototype.DeckSelect = function(){//덱 클릭시 실행함수
  if(MainGame.instance.nowTurn=="draw"){
    var handStart;
    for(var i=0;i<5;i++){
      if(Player.instance.hand[i]==undefined){
        handStart=i;
        break;
      }
    }
    Player.instance.hand[handStart] = Player.instance.deck[MainGame.instance.nextDrawingCardNum]
    MainGame.instance.nextDrawingCardNum+=1;
    var screenUpdate = new ScreenUpdate();
    screenUpdate.UpDateEvery();
    console.log(Field.instance.playerField);
    MainGame.instance.StartSummonPhase();
  }
}
ButtonDown.prototype.changeImg = function(imgNum){//패 클릭시 실행함수
  if(MainGame.instance.summondMobHasEffect==0){
    if(Player.instance.hand[imgNum-1] instanceof MobCard&&
      MainGame.instance.nowTurn=="summon")
    {
      if(Player.instance.hand[imgNum-1].cost<=Player.instance.availableCost){
        Player.instance.availableCost -= Player.instance.hand[imgNum-1].cost;
        MainGame.instance.selectedCard =imgNum-1;
        MainGame.instance.UpdateCostImg();
        document.getElementById("handCard"+(imgNum).toString()+"ImgID").src = "non.png";
        document.getElementById("c"+(imgNum).toString()+"cost").src = "non.png";
        document.getElementById("c"+(imgNum).toString()+"hp").src = "non.png";
        document.getElementById("c"+(imgNum).toString()+"atk").src = "non.png";
        document.getElementById("c"+(imgNum).toString()+"effect").src = "non.png";
        console.log(MainGame.instance.selectedCard);
        MainGame.instance.summonCardBoolean = true;
        MainGame.instance.selectCardBoolean = false;
      }
    }else if(Player.instance.hand[imgNum-1] instanceof ExtraCard&&
      MainGame.instance.nowTurn=="effect")
    {
      if(Player.instance.hand[imgNum-1].cost<=Player.instance.availableCost){
        Player.instance.availableCost -= Player.instance.hand[imgNum-1].cost;
        MainGame.instance.UpdateCostImg();
        var extraEffectStrategy = new ExtraCardEffect();//전략context
        extraEffectStrategy.setExtraCard(Player.instance.hand[imgNum-1]);//전략 할당
        extraEffectStrategy.doEffect();//전략 실행
        Player.instance.hand[imgNum-1] = undefined;
        var screanUpdate = new ScreenUpdate();
        screanUpdate.UpDateEvery();
      }
    }
  }
}
ButtonDown.getInstance();


var DefaultTurn = function(trunDecorator){
  this.trunDecorator = trunDecorator;
}
DefaultTurn.prototype.doTurn = function(){
  var screenUpdate = new ScreenUpdate();
  screenUpdate.UpDateEvery();
}
var TurnDecorator = function(){
  this.trunDecorator = undefined;
}
TurnDecorator.prototype.doTurn = function(){}
var DrawPhaseDecorator = function(trunDecorator){
  (this.trunDecorator) = trunDecorator;
}
DrawPhaseDecorator.prototype.doTurn = function(){
  btn.disabled =false;
  btn.innerText = "드로우 넘기기"
  if(this.trunDecorator===undefined){
    MainGame.instance.nowTurn = "draw";
  }else{
    this.trunDecorator.doTurn();
    MainGame.instance.nowTurn = "draw";
  }
}
var SummonPhaseDecorator = function(trunDecorator){
  (this.trunDecorator) = trunDecorator;
}
SummonPhaseDecorator.prototype.doTurn = function(){
  btn.innerText = "소환 넘기기"//버튼 이름바꿔줌
  if(this.trunDecorator===undefined){
    MainGame.instance.selectCardBoolean =true;
    MainGame.instance.nowTurn = "summon";
  }else{
    this.trunDecorator.doTurn();
    MainGame.instance.selectCardBoolean =true;
    MainGame.instance.nowTurn = "summon";
  }
}
var AttackPhaseDecorator = function(trunDecorator){
  (this.trunDecorator) = trunDecorator;
}
AttackPhaseDecorator.prototype.doTurn = function(){
  btn.innerText = "공격 넘기기"
  if(this.trunDecorator===undefined){
    MainGame.instance.nowTurn = "attack";
  }else{
    this.trunDecorator.doTurn();
    MainGame.instance.nowTurn = "attack";
  }
}
var EffectPhaseDecorator = function(trunDecorator){
  (this.trunDecorator) = trunDecorator;
}
EffectPhaseDecorator.prototype.doTurn = function(){
  btn.innerText = "턴 종료"
  if(this.trunDecorator===undefined){
    MainGame.instance.nowTurn = "effect";
  }else{
    this.trunDecorator.doTurn();
    MainGame.instance.nowTurn = "effect";
  }
}
var NPCSummonPhaseDecorator = function(trunDecorator){
  (this.trunDecorator) = trunDecorator;
}
NPCSummonPhaseDecorator.prototype.doTurn = function(){
  btn.innerText = "상대턴 진행중"
  btn.disabled =true;
  if(this.trunDecorator===undefined){
    MainGame.instance.nowTurn = "npc";
    for(var i=0;i<getRandomNumber(1,3);i++){
      Field.instance.NPCSummonCard();
    }
  }else{
    this.trunDecorator.doTurn();
    MainGame.instance.nowTurn = "npc";
    for(var i=0;i<getRandomNumber(1,3);i++){
      Field.instance.NPCSummonCard();
    }
  }
}
var NPCAttackPhaseDecorator= function(trunDecorator){
  (this.trunDecorator) = trunDecorator;
}
NPCAttackPhaseDecorator.prototype.doTurn = function(){
  if(this.trunDecorator===undefined){
    Field.instance.npcAttackCard();
  }else{
    this.trunDecorator.doTurn();
    Field.instance.npcAttackCard();
  }
}

var turnDecorator_Attack = new TurnDecorator;
var turnDecorator_Effect = new TurnDecorator;
var turnDecorator_Summon = new TurnDecorator;
var turnDecorator_Draw = new TurnDecorator;
var turnDecorator_NPCAttack = new TurnDecorator;
var turnDecorator_NPCSummon = new TurnDecorator;
turnDecorator_Attack.doTurn = AttackPhaseDecorator.prototype.doTurn;
turnDecorator_Effect.doTurn = EffectPhaseDecorator.prototype.doTurn;
turnDecorator_Summon.doTurn = SummonPhaseDecorator.prototype.doTurn;
turnDecorator_Draw.doTurn = DrawPhaseDecorator.prototype.doTurn;
turnDecorator_NPCAttack.doTurn = NPCAttackPhaseDecorator.prototype.doTurn;
turnDecorator_NPCSummon.doTurn = NPCSummonPhaseDecorator.prototype.doTurn;
AttackPhaseDecorator.prototype = turnDecorator_Attack;
EffectPhaseDecorator.prototype = turnDecorator_Effect;
SummonPhaseDecorator.prototype = turnDecorator_Summon;
DrawPhaseDecorator.prototype = turnDecorator_Draw;
NPCAttackPhaseDecorator.prototype = turnDecorator_NPCAttack;
NPCSummonPhaseDecorator.prototype = turnDecorator_NPCSummon;

MainGame.instance.getHandCard();
MainGame.instance.UpdateHandImg();