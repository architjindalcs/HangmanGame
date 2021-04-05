var programming_languages = [
	"python",
	"javascript",
	"mongodb",
	"json",
	"java",
	"html",
	"css",
	"c",
	"csharp",
	"golang",
	"kotlin",
	"php",
	"sql",
	"ruby"
]
const mistake=document.querySelector('#mistakes');
const currWord=document.querySelector("#currWord");
let src = '';
let maxWrong = 6;
let cntWrong = 0;
let cntRight=0;
let guessedCorrect = [];
const img=document.querySelector('img');
let loss=false;
function updateCurrWord()
{
  let newCurrWord="";
  for(let s of guessedCorrect) newCurrWord+=(s+" ");
  currWord.textContent=newCurrWord;
}
let dest= programming_languages[Math.floor(Math.random() * programming_languages.length)];
console.log("Destination: ",dest);
let usedButtons={

};
for(let i=0;i<dest.length;i++){
  guessedCorrect.push("__");
}
updateCurrWord();


function generateButtons(){
  const v="abcdefghijklmnopqrstuvwxyz".split('');
  let keyboard=document.getElementById('keyboard');
  for(let ch of v){
    let newButton=document.createElement('button');
    newButton.textContent=ch;
    newButton.classList.add('styleButton');
    newButton.addEventListener("click",function()
    {
      if(usedButtons[ch] || loss==true) return;
      let guessChar=ch;
      console.log("Clicked",ch);
      usedButtons[ch]=true;
      console.log("here..");
      newButton.classList.add("dbtn");
      if(dest.includes(guessChar)){
        //we have done a right guess...in both of the cases the key needed to be disabled
        for(let i=0;i<dest.length;i++){
          if(dest[i]==guessChar)
          {
            cntRight++;
            guessedCorrect[i]=guessChar;
          }
        }
        updateCurrWord();
        if(cntRight===dest.length){
          img.setAttribute("src","https://media.giphy.com/media/lpmY5wp3mvtW2ds74R/giphy.gif");
          console.log("You win!!")
        }
      }
      else{
        //done a wrong guess..in both of the cases the key needed to be disabled
        cntWrong++;
        mistake.textContent=cntWrong;
        console.log(mistake);
        let newImg=`./images/${cntWrong}.jpg`;
        img.setAttribute("src",newImg);
        if(cntWrong>=6){
         
          img.setAttribute("src","https://thumbs.gfycat.com/UnequaledBruisedAffenpinscher-max-1mb.gif");
          loss=true;
          currWord.textContent="Ans- "+dest;
        }
      }
    });
    keyboard.appendChild(newButton);
    //abcdef ghijkl mnopqr stuvwx yzreset
    if(ch==="f" || ch==="l" || ch==="r" || ch==="x"){
      let nl=document.createElement("br");
      keyboard.appendChild(nl);
    }
  }
}

generateButtons();
