function showImage(elemId, imgSrc){
    console.log("Mouse is over text");
    const elem = docment.getElementById(elemId);
    const popImage = new Image();
    popImage.src = imgSrc;
    popImage = style.position = "absolute";
    popImage.style.zIndex = "1";
    elem.appendChild(popImage); 
}

function hideImage(elemId){
    const elem = document.getElementById(elemId);
    while (elem.childElementCount > 0)
    {
        elem.removeChile(elem.lastChild);
    }
}
