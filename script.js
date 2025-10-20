console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');


let song = [
    {songName: "Sundari - Sanju Rathod", filePath: "song/1.mp3", coverPath: "covers/1.webp"},
    {songName: "Ku lo sa - Camilla Cabello", filePath: "song/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Sithira Puthiri - SaiAbhyankkar", filePath: "song/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Katchi Sera - SaiAbhyankkar", filePath: "song/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "For A Reason - Karan Aujla", filePath: "song/5.mp3", coverPath: "covers/5.jpg"},
]
songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = song[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = song[i].songName;
})


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        document.querySelectorAll('.songItem img')[songIndex].classList.add('rotate');

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        document.querySelectorAll('.songItem img')[songIndex].classList.remove('rotate');

        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=> {
    
       
       progress = parseInt(audioElement.currentTime/audioElement.duration * 100);
    
       myProgressBar.value = progress;
})

myProgressBar.addEventListener  ('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;

})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);
        let allImages = document.querySelectorAll('.songItem img'); // get all images

    
        allImages.forEach(img => img.classList.remove('rotate'));

        
        if (songIndex === clickedIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        } 
        
        else {
            makeAllPlays();
            songIndex = clickedIndex;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `song/${songIndex + 1}.mp3`;
            masterSongName.innerText = song[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');

            
            allImages[songIndex].classList.add('rotate');
        }
    });
});


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex = 0;
    }
    else{
    songIndex += 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 4;
    }
    else{
    songIndex -= 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})


const homePage = document.getElementById('homePage');
const songsPage = document.getElementById('songsPage');
const aboutPage = document.getElementById('aboutPage');

function showPage(page) {
    
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    page.classList.add('active');
}

document.getElementById('homeBtn').addEventListener('click', () => showPage(homePage));
document.getElementById('songsBtn').addEventListener('click', () => showPage(songsPage));
document.getElementById('aboutBtn').addEventListener('click', () => showPage(aboutPage));


document.getElementById('goToSongs').addEventListener('click', () => showPage(songsPage));


