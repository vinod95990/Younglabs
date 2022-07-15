let infoArray;
const deck=document.querySelector('.deck');
const mainCard=document.querySelector('.main_card');
let cardT=-1;
deck.addEventListener('click',function(e){
    if(e.target.classList.contains('deck'))
    {
        return;
    }
    if(e.target.childNodes.length==7)
    {
        if(cardT!=-1)
        {
            cardT.classList.remove('clickC');
            cardT=e.target;
            cardT.classList.add('clickC');
        }
        else{
            cardT=e.target;
            cardT.classList.add('clickC');
        }
        console.log(e,e.target);
        mainCard.innerHTML=bigCardMaker(e.target.getAttribute('data-id'));
        
    }
    else if(e.target.childNodes.length==1){
        mainCard.innerHTML=bigCardMaker(e.target.parentNode.parentNode.getAttribute('data-id'));
        console.log(e,e.target.parentNode.parentNode.getAttribute('data-id'));
        
        if(cardT!=-1)
        {
            cardT.classList.remove('clickC');
            cardT=e.target.parentNode.parentNode;
            cardT.classList.add('clickC');
        }
        else{
            cardT=e.target.parentNode.parentNode;
            cardT.classList.add('clickC');
        }
    }
    else{
        mainCard.innerHTML=bigCardMaker(e.target.parentNode.getAttribute('data-id'));
        console.log(e,e.target);
        
        if(cardT!=-1)
        {
            cardT.classList.remove('clickC');
            cardT=e.target.parentNode;
            cardT.classList.add('clickC');
        }
        else{
            cardT=e.target.parentNode;
            cardT.classList.add('clickC');
        }
    }
})

const x=fetch('https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=%2020').then((x)=>{
    return x.json();
}).then((x)=>{
   info=x.results;

    x.results.forEach((e,i) => {
        deck.innerHTML+=(cardMaking(e,i));
    });
});





function cardMaking(obj,i)
{
    return `
    <div class="card" id=${i} data-id="${i}">
            <div class="cardHead">
                <p>${obj.gender[0].toUpperCase()}${obj.gender.slice(1)} . ${obj.nat}</p>
            </div>
            <div class="cardBody">
                <h2>${obj.name.title} ${obj.name.first} ${obj.name.last}</h2>
            </div>
            <div class="cardFoot">
                <p>${obj.email}</p>
            </div>
    </div>
`
}


function bigCardMaker(index)
{
    console.log(index);

    if(!index)
    {
        return;
    }
    return `<div class="main_mg">
    <img src="${info[index].picture.large}" alt="">
</div>
<div class="main_about">
    <div>
    <h1>
    ${info[index].name.title} ${info[index].name.first} ${info[index].name.last}
    </h1>
</div>
<div>
    <p>
    <span class="streetNo">${info[index].location.street.number}</span>, ${info[index].location.street.name}, ${info[index].location.city}, ${info[index].location.state}, <span class="country">${info[index].location.country}</span>, ${info[index].location.postcode} <br>${info[index].location.timezone.offset} - ${info[index].location.timezone.description}
        <div class="gender">
        ${info[index].gender[0].toUpperCase()}${info[index].gender.slice(1)}
        </div>
    </p>
</div>
</div>`;
}