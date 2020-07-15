var songList = [{title:"M_O_O_N - Crystals", 
                src: new Audio("assets/audio/M_O_O_N - Crystals.mp3"),
                img: "assets/images/hotline-miami-cover.jpg"}, 
                {title:"demin - Fresnel Tears", 
                src: new Audio("assets/audio/demin - Vector Graphics - 04 Fresnel Tears.mp3"),
                img: "assets/images/demin-cover.png"},
                {title:"HOME - Flood", 
                src: new Audio("assets/audio/Flood.mp3"),
                img: "assets/images/home-cover.png"},
                {title:"Forhill - Apparition", 
                src: new Audio("assets/audio/Forhill - Apparition.mp3"),
                img: "assets/images/forhill-cover.jpg"}];

var playlist = [];
var songNo = 0;
var volume = 0.5;
var timeDisplay = setInterval(showTime, 1000);

function showTime(){
    let currentTime = songList[songNo].src.currentTime;
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    document.getElementById("songTime").innerHTML = `0${minutes}:${seconds}`;
}

function stepBackward(){
    if(songNo != 0){
        resetSong();
        songNo--;
        play();
    }
    else{
        resetSong();
        songNo = songList.length - 1;
        play();
    }
       
}

function rewind(){
    songList[songNo].src.currentTime -= 5;
}

function stop(){
    resetSong();
    resetJukebox();
}

function play(){
    songList[songNo].src.addEventListener("ended", () => {
        this.currentTime = 0;
        stepForward();
    });
    document.getElementById("song-name").innerHTML = songList[songNo].title;
    songList[songNo].src.play();
    songList[songNo].src.volume = volume;
}

function pause(){
    songList[songNo].src.pause();
}

function forward(){
    songList[songNo].src.currentTime += 5;
}

function stepForward(){
    if(songNo < songList.length - 1){
        resetSong();
        songNo++;
        play();
    }
    else{
        resetSong();
        songNo = 0;
        play();
    }
}

function resetSong(){
    songList[songNo].src.pause();
    songList[songNo].src.currentTime = 0;
}

function shuffle(){
    index = Math.floor(Math.random()  * 10);
    console.log(index);
}

function resetJukebox(){
    document.getElementById("song-name").innerHTML = "Retrowave Jukebox";
    songNo = 0;
}

function settingsDisplay(){
    var toggle = document.querySelector("#toggle");
    if(toggle.className === "toggle-hidden" || toggle.className === "toggle-initial"){
        toggle.className = "toggle-visible";
    }
    else{
        toggle.className = "toggle-hidden";
    }
}

function changeVolume(){
    var volSlider = document.getElementById("volume").value;
    document.getElementById("volumeNo").innerHTML = volSlider.toString();
    volume = (volSlider) / 100;
    songList[songNo].src.volume = volume;
}
/*Listens for DOM content loaded then runs*/
document.addEventListener("DOMContentLoaded", function(){
    let markup = "";
    songList.forEach(function (song){
        markup+=`<img src=${song.img} height="48" width="48"> <p class="song">${song.title}</p>`;
    })

    document.getElementsByClassName('playlist')[0].innerHTML += markup;

    let songs = document.querySelectorAll(".song");

    Array.from(songs, function(song){
        song.addEventListener("click", function() {
            if(song.className === "song"){
                song.className = "song selected";

                let songTitles = [];
                //add each song from songList array to a list of titles
                songList.forEach(function(song){
                    songTitles.push(song.title)}
                    );
                //add index of song to playlist array
                playlist.push(songTitles.findIndex(title => title === song.textContent));
            }
            else{
                song.className = "song";
            }
                
        })
    });
    
    document.getElementById("play").addEventListener("click", play);
    document.getElementById("stop").addEventListener("click", stop);
    document.getElementById("pause").addEventListener("click", pause);
    document.getElementById("step-backward").addEventListener("click", stepBackward);
    document.getElementById("rewind").addEventListener("click", rewind);
    document.getElementById("forward").addEventListener("click", forward);
    document.getElementById("step-forward").addEventListener("click", stepForward);
    document.getElementById("settings").addEventListener("click", settingsDisplay);
    document.getElementById("volume").addEventListener("input", changeVolume);
});


/*HTMLMediaElement.currentTime
A double-precision floating-point value indicating the current playback time in seconds*/
/*HTMLMediaElement.currentTime
A double-precision floating-point value indicating the current playback time in seconds */
/*HTMLMediaElement.ended Read only
Returns a Boolean that indicates whether the media element has finished playing. */
/*HTMLMediaElement.loop
A Boolean that reflects the loop HTML attribute, which indicates whether the media element should start over when it reaches the end. */
