let cells = document.querySelectorAll('.cell');
const loader = document.querySelector('.loader');
const game = document.querySelector('.game');
let reset = document.getElementsByClassName('btn');
const winnerPerson = document.querySelector('section h5');
const winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];
let human = true;
let count = 0;
cells.forEach((cell) => {

    cell.addEventListener('click',function input(){
        if(cell.innerText===''){
        if(human){
        cell.innerText = "X";
            if(checkWinner()){
                let USER = "You are";
                winner(USER);
                return;
       }
        human = false;
        }
        loader.style.display = "block";
        game.style.filter = "blur(8px)";
        game.style.transition = "filter 0.5s ease";
            // cell.innerText = "O";
        setTimeout(computer,1000);
         if(count===9 && !(checkWinner()))
            winnerPerson.innerText = "TIE !";

        ;
        }
    });

});

const computer = ()=>{
    let remaining = Array.from(cells).filter(cell=>cell.innerText==="");
    if(remaining.length>0){
        let randomIndex = Math.floor(Math.random() * remaining.length);
        let selectedCell = remaining[randomIndex];
        selectedCell.innerText="O";
    }
           if(checkWinner()){
        let USER = "COMPUTER is";
            winner(USER);
            loader.style.display = "none";
            game.style.filter = "none";
            return;
       }
       else{
        human = true;
       }
    // human = true;
    loader.style.display = "none";
    game.style.filter = "";
    game.style.transition = "filter 0.5s ease";
}
  const checkWinner = ()=>{{
            count = count + 1;
            for(let pattern of winningCombinations){
                    let cell1 = cells[pattern[0]].innerText;
                    let cell2 = cells[pattern[1]].innerText;
                    let cell3 = cells[pattern[2]].innerText;

                    if(cell1 != "" && cell2 != "" && cell3 != ""){
                    if(cell1 === cell2 && cell2===cell3){
                        // alert("Winner !");
                        loader.style.display = "none";
                        return true;
                    }
                    }
            }
        }}

const winner=(USER)=>{
    winnerPerson.innerText = `${USER} the winner !`;
    // alert();
    disableButtons();
}
const disableButtons = () => {
    cells.forEach(cell => {
        cell.style.pointerEvents = "none";
        cell.style.opacity = "0.6"; 
    });
};

const enableButtons = () => {
    cells.forEach(cell => {
        cell.disabled = false;
    });
};
reset[0].addEventListener('click', () => {
    cells.forEach(cell => {
        cell.innerText = "";
        cell.style.pointerEvents = "auto"; 
        cell.style.opacity = "1";          
    });
    count = 0;
    human = true; 
    winnerPerson.innerText = "Have the courage to win ?";
    loader.style.display = "none";
    game.style.filter = "none";
});
