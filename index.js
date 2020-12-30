//global variables
const spaces = [null,null,null,null,null,null,null,null,null,];
const O_TEXT = 'O';
const X_TEXT = 'X';
let empty;
let currentPlayer = O_TEXT;


//getting elements list and converting that into array..
let boxes = Array.from(document.querySelectorAll('.box'));
let playText = document.getElementById('playText')
let restart = document.getElementById('restart')


//Adding border to boxes of board..
const drawBoxes = () => {
    boxes.forEach((box,index) => {
        let styleString = '';
        // checking wheather boxes are of top row
        if(index < 3){
            styleString += 'border-bottom: 3px solid var(--purple);'
        }
        //Checking box is on the left
        if(index%3 === 0){
            styleString += 'border-right: 3px solid var(--purple);'
        }
        //Checking box is on right 
        if(index%3 === 2){
            styleString += 'border-left: 3px solid var(--purple);'
        }
        //Checking boxes are of last row
        if(index > 5){
            styleString += 'border-top: 3px solid var(--purple);'
        }
        //Adding style to boxes
        box.style = styleString
        //Adding Event to each box
        box.addEventListener('click',boxClicked)
    })
}

//When box element clicked 
const boxClicked = (e) => {
   //Get box id
   const id = e.target.id;
   //Checking anything is in the box 
   if(!spaces[id]){
       spaces[id] = currentPlayer;
       e.target.innerText = currentPlayer;
       //Checking every element in spaces array
       const check = spaces.every(space => space !== null)
       if(playerHasWon()){
           playText.innerText = `${currentPlayer} has Won!!`
           return;
       }else if(check === true){
           playText.innerText = `Draw!!`
       }
       //Altering the Player Chance
       currentPlayer = currentPlayer === O_TEXT? X_TEXT : O_TEXT;
   }
}


const playerHasWon = () => {

    if(spaces[0]===currentPlayer){
        // Check win top row
        if(spaces[1]===currentPlayer && spaces[2]===currentPlayer){
            return true;
        }
        // check win on left row
        if(spaces[3]===currentPlayer && spaces[6]===currentPlayer){
            return true;
        }
        // check win on diagonally
        if(spaces[4]===currentPlayer && spaces[8]===currentPlayer){
            return true;
        }
    }

    if(spaces[2]===currentPlayer){
        // Check win right row
        if(spaces[5]===currentPlayer && spaces[8]===currentPlayer){
            return true;
        }
        // check win on top row
        if(spaces[0]===currentPlayer && spaces[1]===currentPlayer){
            return true;
        }
        // check win on diagonally
        if(spaces[4]===currentPlayer && spaces[6]===currentPlayer){
            return true;
        }
    }
    
    if(spaces[8]===currentPlayer){
        // Check win left row
        if(spaces[2]===currentPlayer && spaces[5]===currentPlayer){
            return true;
        }
        // check win on left row
        if(spaces[6]===currentPlayer && spaces[7]===currentPlayer){
            return true;
        }
    }
    
    if(spaces[4]===currentPlayer){
        // Check win left row
        if(spaces[1]===currentPlayer && spaces[7]===currentPlayer){
            return true;
        }
        // check win on middle row
        if(spaces[3]===currentPlayer && spaces[5]===currentPlayer){
            return true;
        }
    }

}


//Restart function
const restartFunc = () => {
    spaces.forEach((space,index) => {
        spaces[index] = null;
    })
    
    boxes.forEach(box => {
        box.innerText = '';
    })

    playText.innerText = `Let's Play`
    currentPlayer = O_TEXT;
}


restart.addEventListener('click',restartFunc)

restartFunc()//envoking restartFunc
drawBoxes() //envoking drawBoxes