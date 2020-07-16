var songList = [{title:"demin - Fresnel Tears", 
                src: new Audio("assets/audio/demin - Vector Graphics - 04 Fresnel Tears.mp3"),
                img: "assets/images/demin-cover.jpg"},
                {title:"Forhill - Apparition", 
                src: new Audio("assets/audio/Forhill - Apparition.mp3"),
                img: "assets/images/forhill-cover.jpg"},
                {title:"HOME - Flood", 
                src: new Audio("assets/audio/Flood.mp3"),
                img: "assets/images/home-cover.png"},
                {title:"M_O_O_N - Crystals", 
                src: new Audio("assets/audio/M_O_O_N - Crystals.mp3"),
                img: "assets/images/hotline-miami-cover.jpg"}, 
                {title:"PERTURBATOR - Corrupted By Design", 
                src: new Audio("assets/audio/PERTURBATOR - New Model - 05 Corrupted by Design.mp3"),
                img: "assets/images/perturbator-cover.jpg"}];

var playlist = [];
var shuffleState = false;
var songNo = 0;
var volume = 0.5;
var timeDisplay = setInterval(showTime, 1000);

function showTime(){
    if(playlist.length != 0){
        let currentTime = songList[playlist[songNo]].src.currentTime;
        let minutes = Math.floor(currentTime / 60);
        let seconds = Math.floor(currentTime % 60);
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        document.getElementById("songTime").innerHTML = `0${minutes}.${seconds}`;
    }
}

function stepBackward(){
    if(playlist.length != 0){
        if(songNo != 0){
            resetSong();
            songNo--;
            play();
        }
        else{
            resetSong();
            songNo = playlist.length - 1;
            play();
        }
    }
}

function rewind(){
    if(playlist.length != 0)
        songList[playlist[songNo]].src.currentTime -= 5;
}

function stop(){
    if(playlist.length != 0){
        resetPlaylistSelections();
        resetSong();
        resetJukebox();
        playlist = [];
    }
}

function play(){
    if(playlist.length > 0){
        songList[playlist[songNo]].src.addEventListener("ended", () => {
            this.currentTime = 0;
            stepForward();
        });
        resetPlaylistSelections();
        document.getElementById("song-name").innerHTML = songList[playlist[songNo]].title;
        songList[playlist[songNo]].src.play();
        songList[playlist[songNo]].src.volume = volume;
    }
    else
        document.getElementById("song-name").innerHTML = "Select your playlist";

}

function pause(){
    if(playlist.length != 0)
        songList[playlist[songNo]].src.pause();
}

function forward(){
    if(playlist.length != 0)
        songList[playlist[songNo]].src.currentTime += 5;
}

function stepForward(){
    if(playlist.length != 0){
        if(songNo < playlist.length - 1){
            resetSong();
            songNo++;
            play();
        }
        else{
            resetSong();
            if(shuffleState){
                shuffleSongs();
            }
            songNo = 0;
            play();
        }
    }
}

function resetSong(){
    songList[playlist[songNo]].src.pause();
    songList[playlist[songNo]].src.currentTime = 0;
}

function shuffleSongs(){
    //Shuffle playlist
    console.log("Original playlist: " + playlist);
    //Get the original index of the last song playing before shuffle in order to stop
    let songPlaying = playlist[songNo];
    console.log("Original index of songPlaying: " + songPlaying);

    var j, x, i;
    for (i = playlist.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = playlist[i];
        playlist[i] = playlist[j];
        playlist[j] = x;
    }

    songNo = playlist.findIndex(function(song){
        return song == songPlaying;
    });

    //songNo = 0;

    console.log("Song number found: " + songNo);

    console.log("Shuffled playlist: " + playlist);
}

function shuffleClicked(){
    /*When songs are exhausted shuffle again*/

    if(document.getElementById("shuffle").className === "jukebox-button"){
        document.getElementById("shuffle").className = "jukebox-button shuffle-on";
        shuffleState = true;
        if(playlist != 0)
            shuffleSongs(); 
    }
    else{
        document.getElementById("shuffle").className = "jukebox-button";
        shuffleState = false;
    }
}


function resetJukebox(){
    document.getElementById("song-name").innerHTML = "Retrowave Jukebox";
    document.getElementById("songTime").innerHTML = "00.00";
    songNo = 0;
}

function resetPlaylistSelections(){
    let songs = document.querySelectorAll(".song.selected");

    Array.from(songs, function(song){
        song.className = "song";
    })
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
    if(playlist.length > 0){
        songList[playlist[songNo]].src.volume = volume;
    }

}
/*Listens for DOM content loaded then runs*/
document.addEventListener("DOMContentLoaded", function(){
    let markup = "";
    songList.forEach(function (song, index){
        markup+=`<img src=${song.img} height="60" width="60"> <p class="song" data-index="${index}">${song.title}</p>`;
    })

    document.getElementsByClassName('playlist')[0].innerHTML += markup;

    let songs = document.querySelectorAll(".song");

    //Add click events to every song in playlist
    Array.from(songs, function(song){
        song.addEventListener("click", function() {
            if(song.className === "song"){
                song.className = "song selected";

                playlist.push(song.dataset.index);
            }
            else{
                song.className = "song";
                //remove song that has been de-selected
                playlist.splice(playlist.findIndex(index => index === song.dataset.index), 1);
            }

            console.log(playlist);
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
    document.getElementById("shuffle").addEventListener("click", shuffleClicked);
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
