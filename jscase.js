
    let arr = []
    let arr1 = [];
    let flatarr = [];
    let piecesLevel;
    let div1 = document.getElementById("div1");
    let div2 = document.getElementById("div2");
    let moveimage = document.getElementById("moveimage");
    let displaypause = document.getElementById("displaypause");
    let displaymusic = document.getElementById("displaymusic");
    let amthanhwin = document.getElementById("amthanhwin");
    let amthanhnen = document.getElementById("amthanhnen");
    let table2 = document.getElementById("table2");
    let button_pause = document.getElementById("pause");
    let canvas3 = document.getElementById("canvas3");
    let ctx3 = canvas3.getContext("2d");
    let mixpieces;
    let secs = 0;
    let currentSeconds = 0;
    let currentMinutes = 0;
    let timer;
    let start = false;
    let pause = 0;
    let music0;
    let stoptime;

    function checkSelectedImage() {
    let img = document.getElementsByClassName("chooseImage");
    let valueOfSelectedImage;
    for (let i = 0; i < img.length; i++) {
    if (img[i].checked) {
    valueOfSelectedImage = img[i].value;
    break;
}
}
    return valueOfSelectedImage;
}

    function chooseLevel() {
    let levelObject = document.getElementById("level");
    levelObject.style.display = "block";
    if (levelObject.value === "Level 1") {
    piecesLevel = 3;
}
    if (levelObject.value === "Level 2") {
    piecesLevel = 6;
}
    if (levelObject.value === "Level 3") {
    piecesLevel = 8;
}
    return piecesLevel;
}

    function openFile() {
    let youImage = document.getElementById("chooseImage");
    youImage.click()
}

    function drawAndCutAndPushArray() {
    chooseLevel();
    let canvas4 = document.getElementById("canvas4");
    let ctx4 = canvas4.getContext("2d");
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = 240;
    canvas.height = 240;
    let img = new Image()
    let result = checkSelectedImage();
    console.log(result)
    let link;
    let selectedLink;
    if (result === "default") {
    link = 'img/anh-kt-goc.jpg';
} else {
    let youImage = document.getElementById("chooseImage");
    let file = youImage.files[0];
    console.log(file)
    if(file===undefined){
    link='img/anh-kt-goc.jpg';
}else{
    link = URL.createObjectURL(file);

}
}
    img.src = link;
    img.onload = function () {
    ctx4.drawImage(img, 0, 0, canvas4.width, canvas4.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    selectedLink = canvas.toDataURL();
    let canvas2 = document.getElementById("canvas2");
    let ctx2 = canvas2.getContext("2d");
    let piecesWidth = canvas.width / piecesLevel;
    let piecesHeight = canvas.height / piecesLevel;
    let url;
    let i = 0;
    canvas2.width = piecesWidth
    canvas2.height = piecesHeight;
    let imagePieces = new Image();
    imagePieces.src = selectedLink;
    for (let y = 0; y < imagePieces.height; y += piecesHeight) {
    arr1[i] = [];
    let j = 0;
    for (let x = 0; x < imagePieces.width; x += piecesWidth) {
    ctx2.drawImage(imagePieces, x, y, piecesWidth, piecesHeight, 0, 0, piecesWidth, piecesHeight);
    url = canvas2.toDataURL();
    arr1[i][j] = url;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
    j++
}
    i++;
}
    return arr1;
}
}

    function startGame() {
    drawAndCutAndPushArray();
    let count = 0;
    while (arr1.length === 0 && count < 5) {
    drawAndCutAndPushArray();
    count++;
}
    for (let i = 0; i < arr1.length; i++) {
    arr[i] = [];
    for (let j = 0; j < arr1[i].length; j++) {
    arr[i][j] = arr1[i][j]
    if (i === arr1.length - 1 && j === arr1[i].length - 1) {
    arr[i][j] = "";
}
}
}
    flatarr = arr.flat()
    return arr;
}

    function play() {
    startGame();
    shufflepieces(arr);
    display(arr)
    beginTime();
    music0 = 0;
    div1.style.display = "none";
    div2.style.display = "block";
    displaypause.style.display = "none";
    button_pause.style.display = "block";
    displaymusic.style.display = "none";
    start = true;
    amthanhnen.play()
    amthanhnen.addEventListener("ended", function () {
    amthanhnen.play()
})


}

    function beginTime() {
    count = 0;
    secs = 0;
    currentSeconds = 0;
    currentMinutes = 0;
    clearInterval(stoptime)
    intervalTime();

}

    function contineTime() {
    intervalTime()
}

    function intervalTime() {
    if (start) {
    currentMinutes = Math.floor(secs / 60);
    currentSeconds = secs % 60;

    if (currentMinutes <= 9) {
    currentMinutes = "0" + currentMinutes;
}

    if (currentSeconds <= 9) {
    currentSeconds = "0" + currentSeconds;
}

    secs++;
    document.getElementById("time").innerHTML = currentMinutes + ":" + currentSeconds;
    document.getElementById("count").innerHTML = count;
    stoptime = setTimeout('intervalTime()', 1000);
}
}

    function dung() {

    if (pause % 2 === 0) {
    start = false;
    amthanhnen.pause();
    pause++;
    displaypause.style.display = "block"
} else {
    start = true;
    amthanhnen.play()
    pause++;
    displaypause.style.display = "none"
    contineTime()
}
}

    function music() {
    if (music0 % 2 === 0) {
    amthanhnen.pause();
    displaymusic.style.display = "block";
    music0++;
} else {
    amthanhnen.play();
    displaymusic.style.display = "none";
    music0++;
}
}

    function musicmove() {
    if (music0 % 2 === 0) {
    moveimage.play()
}
}

    function shufflepieces(arr) {
    for (let a = 0; a < piecesLevel * 50; a++) {
    let row;
    let col;
    for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
    if (arr[i][j] === "") {
    row = i;
    col = j;
    break;
}
}
}
    let index = Math.floor(Math.random() * 4);
    /*  index=0    lên
    index=1    xuống
    index=2    trái
    index=3    phải
 */
    if (index === 0) {
    if (row > 0) {                      // Move up
    arr[row][col] = arr[row - 1][col];
    arr[row - 1][col] = "";
}
}
    if (index === 1) {
    if (row !== piecesLevel - 1 && row < piecesLevel) {          // Move down
    arr[row][col] = arr[row + 1][col];
    arr[row + 1][col] = "";
}
}
    if (index === 2) {
    if (col > 0) {                   // Move left
    arr[row][col] = arr[row][col - 1];
    arr[row][col - 1] = "";
}
}
    if (index === 3) {
    if (col < piecesLevel - 1) {      // Move right
    arr[row][col] = arr[row][col + 1];
    arr[row][col + 1] = "";
}
}
}
    return arr;
}

    function display(arr) {
    let anh = ""
    for (let i = 0; i < arr.length; i++) {
    anh += "<tr>"
    for (let j = 0; j < arr[i].length; j++) {
    if (arr[i][j] === "") {
    anh += "<td style='padding: 1px'><img class='pieces' src=\"img/nền-trắng-full.jpg\" height=" + 400 / piecesLevel + "px width=" + 400 / piecesLevel + "px></td>";
    continue;
}
    const id = i + "," + j;
    anh += "<td><img onclick='move(arr,event)' class='pieces' id='" + id + "' src='" + arr[i][j] + "' width=" + 400 / piecesLevel + "px height=" + 400 / piecesLevel + "px alt='Load....'></td>"
}
    anh += "</tr>"
}
    document.getElementById("display").innerHTML = anh;
}


    function move(arr, event) {
    console.log(start)
    if (start) {
    let row;
    let col;
    let pieces = event.target;
    let idpieces = pieces.getAttribute("id");
    let arrid = idpieces.split(",");
    row = parseInt(arrid[0]);
    col = parseInt(arrid[1]);

    if (arr[row][col + 1] === "" && col < arr[row].length) {      // Move right
    arr[row][col + 1] = arr[row][col];
    arr[row][col] = "";
    display(arr);
    show_count()
    checkwin();
    musicmove()
    return;
}

    if (arr[row][col - 1] === "" && col > 0) {                   // Move left
    arr[row][col - 1] = arr[row][col];
    arr[row][col] = "";
    display(arr);
    show_count();
    checkwin();
    musicmove();
    return;
}
    if (row !== arr.length - 1 && arr[row + 1][col] === "" && row < arr.length) {          // Move down
    arr[row + 1][col] = arr[row][col];
    arr[row][col] = "";
    display(arr);
    show_count();
    checkwin();
    musicmove();
    return;
}
    if (row > 0 && arr[row - 1][col] === "") {                      // Move up
    arr[row - 1][col] = arr[row][col];
    arr[row][col] = "";
    display(arr);
    show_count();
    checkwin();
    musicmove();
}
}

}

    function checkwin() {
    let check = true;
    let allpieces = document.querySelector("#display").querySelectorAll("img");    //lấy ảnh trong bảng
    let srcArr = [];                     //mảng chứa src của tất cả mảnh ghép
    for (let i = 0; i < allpieces.length; i++) {
    srcArr.push(allpieces[i].src)
}
    for (let i = 0; i < srcArr.length - 1; i++) {
    if (srcArr[i] !== flatarr[i]) {
    check = false;
    break;
}
}
    if (check) {
    clearInterval(stoptime);
    show_win();
    load()
}
}

    function show_win() {
    canvas3.style.zIndex = 1;
    table2.style.zIndex = 0;
    amthanhwin.play();
    amthanhnen.pause();
    button_pause.style.display = "none";
    display(arr1)
    hieuung();
}

    function show_count() {
    count++;
    document.getElementById("count").innerHTML = count;
}


    function hieuung() {
    let gradient = ctx3.createLinearGradient(0, 0, canvas3.width, canvas3.height);
    gradient.addColorStop(0, "#FF0000");
    gradient.addColorStop(0.1, "#FF8C00")
    gradient.addColorStop(0.2, "#7CFC00")
    gradient.addColorStop(0.3, "#00FFFF")
    gradient.addColorStop(0.4, "#00BFFF")
    gradient.addColorStop(0.5, "#BA55D3")
    gradient.addColorStop(0.6, "#FAF0E6")
    gradient.addColorStop(0.7, "#F4A460")
    gradient.addColorStop(0.8, "#000000")
    let x = -250;
    let y = 1500;
    let z1 = -15;
    let z2 = 1475

    function draw() {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    ctx3.font = "100px Arial";
    ctx3.fillStyle = gradient;
    ctx3.fillText("YOU", x, 250);
    ctx3.fillText("WIN!", y, 250);
    ctx3.fillText("Time:", x, 350);
    ctx3.fillText(currentMinutes + ":" + currentSeconds, y, 350)
    ctx3.fillText("Count:", x, 450);
    ctx3.fillText("   " + count, y, 450);
    ctx3.beginPath();
    ctx3.arc(z1, 550, 25, 3 * Math.PI / 2, Math.PI / 2, true);
    ctx3.fillStyle = gradient;
    ctx3.fill();
    ctx3.beginPath();
    ctx3.arc(z2, 550, 25, 3 * Math.PI / 2, Math.PI / 2);
    ctx3.fillStyle = gradient
    ctx3.fill()
    x += 5;
    y -= 5;
    z1 += 5;
    z2 -= 5;
    if (x === 490) {
    clearInterval(stop);
    ctx3.clearRect(695, 525, 70, 70);
    ctx3.fillStyle = "#00FFFF";
    ctx3.fillRect(700, 525, 60, 40);
    ctx3.fillStyle = "black";
    ctx3.font = "20px Arial";
    ctx3.fillText("EXIT", 710, 553)
}

}

    let stop = setInterval(draw, 20);

}

    function load() {
    canvas3.addEventListener("click", function (event) {
        const x = event.clientX - canvas.offsetLeft;
        const y = event.clientY - canvas.offsetTop;
        if (x >= 700 && x <= 760 && y >= 525 && y <= 565) {
            window.location.reload();
        }
    })
}

    function exit() {
    window.location.reload();
}

