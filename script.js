//this is just the elements that will be used in the javascript

let textarea = document.getElementById('textarea');
let choiceContainer = document.querySelector('.choice-container');
let choices = document.querySelector('.choices');
let par = document.querySelector('.paragraph');
let body = document.querySelector('body').style;
let instruction = document.querySelector('.instruction');
let chosen = document.querySelector('.chosen');

//this will show the container of choices when the textarea is clicked

textarea.addEventListener('click', ()=>{
    choiceContainer.style.display= "flex";
    par.style.display = "block";
    textarea.placeholder = "Add the choices here!!!";
    textarea.style.height = "150px";
    body.background = "white";
    body.color = "rgb(46, 45, 45)";
    textarea.style.background = "white";
    textarea.style.color = "rgb(46, 45, 45)";
    instruction.innerText ='Click "Enter" to start randomizing';
})

//this will create and update the elements in the container of choices everytime you input something in the textarea

textarea.addEventListener('keyup', (input)=>{
    createChoices(input.target.value);

//this is what will happen when you click enter in the textarea
    if(input.key === "Enter"){
        if((choices.querySelectorAll('.choice').length) < 2){
           instruction.innerText="Include atleast Two choices";
           return;
        }
        let randomchoice; 
        var interval = setInterval(randomSelect,100); 
        textarea.setAttribute("disabled","disabled");
        setTimeout(()=>{//after 3s this this will stop the interval and select the final element that is chosen
            clearInterval(interval);
            randomchoice = randomizer();
            textarea.removeAttribute("disabled");
            setTimeout(()=>{
                highlight(randomchoice);
            },100) 
        },3000);

        setTimeout(()=>{//an animation that will show the selected random element in the full container
            chosen.style.animation = "showresult 2s";
            chosen.innerText = randomchoice.innerText;
        },3500);

        setTimeout(()=>{
            chosen.innerText = '';
        },4900);

        setTimeout(()=>{
            chosen.style.animation = "none";
        },5380);
    }
   
})
 
let createChoices= (input) =>{//create the element tag and display it in the document
    let arr = input.split(',');
        arr = arr.filter(entry => entry !== "" && entry !== " ");
        arr = arr.map(entry => entry.trim());
    choices.innerHTML = '';
    arr.forEach(indexvalue => {
        let element = document.createElement('span');
        element.innerHTML = `${indexvalue}`;
        element.classList = "choice";
        choices.appendChild(element);
    });

}
function randomSelect(){//a compilation of function that is for selecting, highlighting and unhighlighting

    let randomchoice = randomizer();
    highlight(randomchoice);
    setTimeout(() =>{
        unhighlight(randomchoice);
    },100)
}
let randomizer = ()=>{//select a random element from the choices
    let arr = choices.querySelectorAll('.choice');
    let randomchoice = arr[Math.floor(Math.random() * arr.length)];
    return randomchoice;
}
let highlight = (selected)=>{//highlight the chosen element
    selected.className = "choice highlight";
}
let unhighlight = (selected) =>{//unhighlight the previously chosen
        selected.className = "choice";
}
