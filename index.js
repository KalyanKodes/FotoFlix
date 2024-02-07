const hoverContainer = document.getElementById('hover-container');

const clientId = "?client_id=_CN6uwOUTHQKi1utXXENVprOa4iE1jQtr31CLs7LoQc";
const mainUrl = "https://api.unsplash.com/photos/";
const searchUrl = 'https://api.unsplash.com/search/photos/?query=dog&client_id=_CN6uwOUTHQKi1utXXENVprOa4iE1jQtr31CLs7LoQc'


function handleMouseOver(element){
    element.children[1].classList.add('show');
}
function handleMouseOut(element){
    element.children[1].classList.remove('show');
}




function createElements(source){
    const parentElement = document.getElementById("images-parent-container");
    const imageDiv = document.createElement('div');
    const imageTag = document.createElement('img');
    const hoverDiv = document.createElement('div');
    const downloadTag = document.createElement('i');
    imageDiv.setAttribute('class' , 'image');
    imageDiv.setAttribute('id' , 'image');
    imageDiv.setAttribute('onmouseover' , 'handleMouseOver(this)');
    imageDiv.setAttribute('onmouseout' , 'handleMouseOut(this)');
    imageTag.setAttribute('src' , source);
    hoverDiv.setAttribute('class' , 'hover-container')
    hoverDiv.setAttribute('id' , 'hover-container');
    downloadTag.setAttribute('class' , 'fa-solid fa-download');
    hoverDiv.appendChild(downloadTag);
    imageDiv.appendChild(imageTag);
    parentElement.appendChild(imageDiv)
    imageDiv.appendChild(hoverDiv)
}



function handleSubmit(event) {
    event.preventDefault();
    const previousElements = [...document.getElementById("images-parent-container").children];
    previousElements.map((element)=>{
        document.getElementById("images-parent-container").removeChild(element)
        
    })
    getData(false , event.target.children[0].value);
    document.getElementById('search-input-name').innerHTML = event.target.children[0].value;
    event.target.children[0].value = "";
    
}
async function fetchURL(status , input = "God"){
    const returnedData =  status ? await fetch(mainUrl+clientId).then(data=>data.json()) : await fetch(`https://api.unsplash.com/search/photos/?query=${input}&client_id=_CN6uwOUTHQKi1utXXENVprOa4iE1jQtr31CLs7LoQc`).then(data=>data.json());
    console.log(returnedData)
    return returnedData;

}

async function getData(search , input="God") {
    const data = await fetchURL(search , input);
    search ? data.map((d)=>{
        createElements(d.urls.full);
    }) : data.results.map((d)=>{
        createElements(d.urls.full);
    }) 

}

document.querySelector('input[type="search"]').focus()

getData(true);