let boxes = document.querySelectorAll(".box");
let resetBt = document.querySelector("#reset");
let newGameBt = document.querySelector("#new-gm");
let msg = document.querySelector("#msg");
let msgCont = document.querySelector(".msg-content");

let turnO = true;

const winPatt = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgCont.classList.add("hide");
    count=0;
};

let count=0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // or we can keep a condition of box.disabled=true; after line 28
            if (turnO) {
                box.classList.add("Ocolor");
                box.classList.remove("Xcolor");
                box.innerText = "O";
                turnO=false;
                //count++;
            }
            else{
                box.classList.add("Xcolor");
                box.classList.remove("Ocolor");
                box.innerText = "X";
                turnO=true;
                //count++;
            }
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count == 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msgCont.classList.remove("hide");
    msg.innerText = "Game was a Draw";
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgCont.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pat of winPatt){
        let pos0 = boxes[pat[0]].innerText;
        let pos1 = boxes[pat[1]].innerText;
        let pos2 = boxes[pat[2]].innerText;

        if( pos0 != "" && pos1 != "" && pos2 != ""){
            if(pos0 == pos1 && pos1 == pos2){

                console.log("Winner",pos0);
                showWinner(pos0);
            }
        }
    }
};

newGameBt.addEventListener("click",resetGame);
resetBt.addEventListener("click",resetGame);





