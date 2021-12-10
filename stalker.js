const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
//inventory set to open array so objects can be put into it with the take function
let inventroy = []


// item class constructor to make items 

class Item {
  constructor (name, description, action, takeable){
  this.name = name;
  this.desc = description;
  this.action = action ||  "nothing"
  this.takeable = takeable 
}
//method to take items for later use
take() {
  if (this.takeable){
    inventroy.push(this.name);
    return `you picked up ${this.name}`
  } else {
    return "please dont touch that!"
}
}

//methods to use items
use(){
  if ( this.name === "door" && inventory.includes("prostheticLimb")) {
return "you smashed door open with a gnarled prosthetic arm"
} else {
return this.action;
}
}
//method to drop item in inventory
drop(){
  if (this.takeable){
    inventory.pop(this.name);
    return `you dropped ${this.name}`
  } else {
    return this.action
  }
}



}

// items found in game

let prostheticLimb = new Item(
  "prosthetic limb",
  "A prosthetic arm covered in dust, looks sturdy enough to smash through that door",
  "you pick up the prosthestic arm and from it rusty joint emits a piercing sound that cuts through the silence in infermary",
true
)
let door = new Item(
  "rickety door",
  "An old door that is begging to be smashed",
  "you splinter the door to pieces"

)
let bed = new Item(
  "hosiptal bed",
  "springs jut from the mattress and it has a massive stain in the center"
  )
//lookup table include some data sanitization if things could be spelled differently
  let lookupTable = {
bed: bed,
door: door,
prostheticLimb: prostheticLimb,
"prosthetic limb": prostheticLimb
}
// ROOOMS: includes connections for a move function at some point
class Room {
  contructor(name, examine, connections,items,locked){
    this.name =name
    this.examine = examine
    this.connections = connections
    this.items = items
    this.locked = locked
  this.move = move  
  }
}

let infermary = new Room(
  "infermary",
  "You awoke here. This room is filled with prosthetic limbs. Too bad theyre all arms! There is a door to the east ",
  "basement",
  "prosthetic limb, door",
  undefined
)
let basement = new Room(
  "basement",
  "What a beautiful basement. Just kidding its absolutely gross",
  "boilerRoom",
  "sign on door to boiler room",
  "locked"
   
)
let boilerRoom = new Room(
  "boilerRoom",
  "The sound of steam escaping pipes erupts into your head, this rooms walls are covered in a maze of pipes. To the south the pipes are peeled back revealing a tunnel, and hanging from one of the peeled back pipes is a golden medallion",
"The grinder",
"golden medallion",
undefined
)
let grinder = new Room(
  "grinder",
  "You enter the grinder and it feels as if something is scraping at the inside of your skull, this tunnel is dark and long better get crawling",
"sandroom",
undefined,
undefined
)
let sandRoom = new Room(
  "sandRoom",
  "You enter the sandRoom a bird flies in through a hole in the roof and a hawk flies in and immediatley explodes into a pile of bones and feathers",
  "WishRoom",
  "birdbone",
  undefined
)
let wishRoom = new Room(

)
let RoomLookupTable = {
  infermary : infermary,
  basement : basement,
  boilerRoom : boilerRoom,
  grinder : grinder,
  sandRoom : sandRoom,
  wishRoom : wishRoom
}













async function play(){
  let userAction = await ask("I know you are short two limbs but you should get moving! What is your next move?")

  let inputArray = userAction.toLowerCase().split(" ")
  
  let action = inputArray[0]

  let target = inputArray.slice(1).join(" ")
//desccribes what the use method calls on
  if (action === "use") {
    console.log(lookupTable[target].use())
//describes what the take function calls on and what to do if the item cannot be added to inventory
  } else if(action === "take"){
    if (lookupTable[target]instanceof Item){
      console.log(lookupTable[target].take())
    } else {
      console.log(lookupTable[target]instanceof Item)
      console.log("thats not an item")
}
//describes examine method and calls on the lookup table and description of object
} else if (action === "examine") {
  console.log(lookupTable[target].desc)
//lets you use door if you have the prosthetic limb in your inventory
} else if (action === "use"){
  if (inventory.includes("prostheticLimb")){
    console.log("you smash the rickety door to pieces\nGaining access to the basement")
    } else {
      console.log("the door is locked")
    }
  } else {
console.log("Invalid input please try again!")
}
return play()
}
console.log(
  "You awake in a filth covered hospital bed.\n strewn about this room are prosthetic limbs.\n You feel a twinge just below your knee and look down to see that both of your legs have been removed, but sutured up quite nicely, i might add."
)

play()
  