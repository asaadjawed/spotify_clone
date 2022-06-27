console.log("Welcome");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let master_play = document.getElementById('master_play');
let progress_bar = document.getElementById('progess-bar');
let gif = document.getElementById('spotify-gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: 'Salam-e-Ishq', filePath:"songs/1.mp3", coverPath:"images/1.jpg"},
    {songName: 'Tu Jaane na', filePath:"songs/2.mp3", coverPath:"images/2.jpg"},
    {songName: 'Rafta Rafta', filePath:"songs/3.mp3", coverPath:"images/3.jpg"},
    {songName: 'Dil Lagi', filePath:"songs/4.mp3", coverPath:"images/4.jpg"},
    {songName: 'Barish', filePath:"songs/5.mp3", coverPath:"images/5.jpg"},
    {songName: 'Khaab-Akhil', filePath:"songs/6.mp3", coverPath:"images/6.jpg"},
    {songName: 'Zindagi', filePath:"songs/7.mp3", coverPath:"images/7.jpg"},
    {songName: 'Aajao', filePath:"songs/8.mp3", coverPath:"images/8.jpg"},
    {songName: 'Adnan Sami', filePath:"songs/9.mp3", coverPath:"images/9.jpg"},
    {songName: 'Badal', filePath:"songs/10.mp3", coverPath:"images/10.jpg"},
]

master_play.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<0) {
        audioElement.play();
        master_play.classList.remove('fa-play-circle');
        master_play.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }else {
        audioElement.pause();
        master_play.classList.remove('fa-pause-circle');
        master_play.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate', ()=> {
    console.log("timeUpdatte")

    //update percent bar

    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progress_bar.value = progress
})

progress_bar.addEventListener('change', ()=> {
    audioElement.currentTime = progress_bar.value*audioElement.duration/100;
})


songItems.forEach((element,i)=> {
    console.log(element,i)
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName
})


const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName('play-btn')).forEach((ele)=> {
    ele.classList.remove('fa-pause-circle');
    ele.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('play-btn')).forEach((element)=> {
    element.addEventListener('click', (e)=> {
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        master_play.classList.remove('fa-play-circle');
        master_play.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=> {
    if(songIndex >= 9) {
        songIndex = 0;
    }else {
        songIndex= songIndex+1;

    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    master_play.classList.remove('fa-play-circle');
    master_play.classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songIndex].songName;
})

document.getElementById('previous').addEventListener('click',()=> {
    if(songIndex <=0) {
        songIndex = 0;
    }else {
        songIndex= songIndex-1;

    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    master_play.classList.remove('fa-play-circle');
    master_play.classList.add('fa-pause-circle');
 
})