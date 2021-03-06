'use strict';

const colorArr = ['red', 'green', 'blue', 'yellow'];
let randNum, randColor;
let wholeSeq = [];
let currInd = 0;
let currLevel = 1;

function playAudio(color)
{
    let chosenAudio = new Audio(`sounds/${color}.mp3`);
    chosenAudio.play();
}

function nextSequence()
{
    $('h1').text(`Level ${currLevel}`);
    currLevel += 1;
    $('body').css('backgroundColor', '#011F3F');
    console.log('YOYOO');
    setTimeout(function()
    {
        randNum = Math.trunc(Math.random()*4);
        randColor = String(colorArr[randNum]); 
        wholeSeq.push(randColor);
        console.log(randNum, randColor);
        //tell the user which box is the next one
        let chosenEl = document.querySelector(`.${randColor}`);
        chosenEl.style.opacity = 0.1;
        console.log(randColor);
        playAudio(randColor);
        setTimeout(function()
        {
            chosenEl.style.opacity = 1
        }, 400);
    },1500);
    
}

function checkSeq()
{
    console.log('clicked');
    const classList = this.classList;
    let ok = false;
    for(const item of classList)
    {
        if(item === wholeSeq[currInd])
        {
            ok = true;
        }
    }
    if(!ok)
    {
        console.log('False');
        playAudio('wrong');
        $('h1').text('Game Over, Press any key to restart');
        $('body').css('backgroundColor', 'red');
        document.addEventListener('keydown', nextSequence, {once : true})
        currLevel = 1, currInd = 0;
        wholeSeq = [];
    }
    else
    {
        console.log('True');
        let currentEl = document.querySelector(`.${wholeSeq[currInd]}`);
        currentEl.style.border = 'solid 15px white';
        setTimeout(function()
        {
            currentEl.style.border = '11px solid black';
        }, 200);
        playAudio(wholeSeq[currInd]);

        currInd += 1;
        if(currInd >= wholeSeq.length)
        {
            currInd = 0;
            nextSequence();
        }
    }
}



document.addEventListener('keydown', function()
{
    nextSequence();
    $('.box').click(checkSeq);
}, {once : true})

