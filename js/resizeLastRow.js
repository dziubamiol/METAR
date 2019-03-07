function resizeLastRow() {
    let elementSize = Math.round(window.innerWidth / 320) - 2;
    $('#last-element').css('width', elementSize * (320 + 10)  + 'px');
    console.log(elementSize);
}

window.onload = resizeLastRow;
window.onresize = resizeLastRow;