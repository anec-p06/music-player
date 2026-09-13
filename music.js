document.addEventListener("DOMContentLoaded", function () {
  const startScreen = document.getElementById("start-screen");
  const playerScreen = document.getElementById("player-screen");
  const albumCover = document.getElementById("album-cover");
  const audioPlayer = document.getElementById("audio-player");
  const audioSource = document.getElementById("audio-source");
  const songTitle = document.getElementById("song-title");
  const artistName = document.getElementById("artist-name");
  const progressBar = document.getElementById("progress-bar");
  const valueDisplay = document.getElementById("value-display");
  const backToHomeButton = document.getElementById("back-to-home");
  const nextSongName = document.getElementById("nextSongName");

  const imgPlayButton = document.getElementById("imgPlay");
  const imgPauseButton = document.getElementById("imgPause");
  const prevButton = document.getElementById("btnPrev");
  const nextButton = document.getElementById("btnBefore");

  const albumData = {
    ren: [
      {
        title: "St. Chroma ft. Daniel Caesar",
        file: "songs/ren/01. St. Chroma ft. Daniel Caesar.mp3",
        artist: "Tyler, The Creator | Daniel Caesar",
      },
      {
        title: "Rah Tah Tah",
        file: "songs/ren/02. Rah Tah Tah.mp3",
        artist: "Tyler, The Creator",
      },
      {
        title: "Noid",
        file: "songs/ren/03. Noid.mp3",
        artist: "Tyler, The Creator",
      },
      {
        title: "Darling, I ft. Tezzo Touchdown",
        file: "songs/ren/04. Darling, I ft. Tezzo Touchdown.mp3",
        artist: "Tyler, The Creator | Tezzo Touchdown",
      },
      {
        title: "Hey Jane",
        file: "songs/ren/05. Hey Jane.mp3",
        artist: "Tyler, The Creator",
      },
      {
        title: "I Killed You",
        file: "songs/ren/06. I Killed You.mp3",
        artist: "Tyler, The Creator",
      },
      {
        title: "Judge Judy",
        file: "songs/ren/07. Judge Judy.mp3",
        artist: "Tyler, The Creator",
      },
      {
        title: "Sticky ft. GloRilla, Sexyy Red & Lil Wayne",
        file: "songs/ren/08. Sticky ft. GloRilla, Sexyy Red & Lil Wayne.mp3",
        artist: "Tyler, The Creator | GloRilla, Sexyy Red | Lil Wayne",
      },
      {
        title: "Take Your Mask Off ft. Daniel Caesar & LaToiya Williams",
        file: "songs/ren/09. Take Your Mask Off ft. Daniel Caesar & LaToiya Williams.mp3",
        artist: "Tyler, The Creator",
      },
      {
        title: "Tomorrow",
        file: "songs/ren/10. Tomorrow.mp3",
        artist: "Tyler, The Creator",
      },
      {
        title: "Thought I Was Dead ft. ScHoolboy Q & Santigold",
        file: "songs/ren/11. Thought I Was Dead ft. ScHoolboy Q & Santigold.mp3",
        artist: "Tyler, The Creator | ScHoolboy Q | Santigold",
      },
      {
        title: "Like Him ft. Lola Young",
        file: "songs/ren/12. Like Him ft. Lola Young.mp3",
        artist: "Tyler, The Creator | Lola Young",
      },
      {
        title: "Balloon ft. Doechii",
        file: "songs/ren/13. Balloon ft. Doechii.mp3",
        artist: "Tyler, The Creator | Doechii",
      },
      {
        title: "I Hope You Find Your Way Home",
        file: "songs/ren/14. I Hope You Find Your Way Home.mp3",
        artist: "Tyler, The Creator",
      },
    ],
    anna: [
      {
        title: "I Write Sins Not Tragedies",
        file: "songs/anna/Panic! At The Disco - I write sins not tragedies.mp3",
        artist: "Panic! At The Disco",
      },
      {
        title: "Jackpot",
        file: "songs/anna/TheFatRat - Jackpot.mp3",
        artist: "TheFatRat",
      },
      {
        title: "Unity",
        file: "songs/anna/TheFatRat - Unity.mp3",
        artist: "TheFatRat",
      },
      {
        title: "Xenogenesis",
        file: "songs/anna/TheFatRat - Xenogenesis.mp3",
        artist: "TheFatRat",
      },
    ],
    kamile: [
      {
        title: "Kamile Song 1",
        file: "songs/kamile/song1.mp3",
        artist: "Kamile",
      },
    ],
    arch: [
      { title: "Arch Anthem",
        file: "songs/arch/song1.mp3",
        artist: "Arch" 
      },
      
    ],
    shauna: [
      {
        title: "Shauna's Intro",
        file: "songs/shauna/song1.mp3",
        artist: "Shauna",
      },
    ],
  };

  const albumImages = {
    ren: "images/REN - TYLER THE CREATOR.png",
    anna: "images/ANNA - PLACEHOLDER.png",
    kamile: "images/kamile_album_img.png",
    arch: "images/ARCH - PLACEHOLDER.png",
    shauna: "images/SHAUNA - PLACEHOLDER.png",
  };

  let currentAlbum = "";
  let songs = [];
  let currentSongIndex = 0;

  document.querySelectorAll(".album-select").forEach((button) => {
    button.addEventListener("click", () => {
      currentAlbum = button.getAttribute("data-album");
      songs = albumData[currentAlbum];
      currentSongIndex = 0;

      startScreen.style.display = "none";
      playerScreen.style.display = "flex";
      backToHomeButton.style.display = "inline-block";

      updatePlayer();
    });
  });

  function updatePlayer() {
    const song = songs[currentSongIndex];
    audioSource.src = song.file;
    audioPlayer.load();
    audioPlayer.onloadedmetadata = () => {
      updateProgressBar();

      const songListWrapper = document.getElementById("song-list-wrapper");
      if (songListWrapper) {
        songListWrapper.className = ""; // reset
        songListWrapper.classList.add(`back-${currentAlbum}`);
      }
    };

    // Album setlist
    function renderSongList() {
      const songListContainer = document.getElementById("song-list");
      songListContainer.innerHTML = "";

      const half = Math.ceil(songs.length / 2);
      const firstColumnSongs = songs.slice(0, half);
      const secondColumnSongs = songs.slice(half);

      const column1 = document.createElement("div");
      const column2 = document.createElement("div");

      column1.classList.add("song-column");
      column2.classList.add("song-column");

      function createSongItem(song, index) {
        const songItem = document.createElement("div");
        songItem.classList.add("song-item", `song-${currentAlbum}`); // 👈 Add album-specific class
        songItem.textContent = `${index + 1}. ${song.title}`;

        if (index === currentSongIndex) {
          songItem.classList.add("active");
        }

        songItem.addEventListener("click", () => {
          currentSongIndex = index;
          updatePlayer();
          audioPlayer.play();
        });

        return songItem;
      }

      firstColumnSongs.forEach((song, index) => {
        column1.appendChild(createSongItem(song, index));
      });

      secondColumnSongs.forEach((song, index) => {
        column2.appendChild(createSongItem(song, index + half));
      });

      songListContainer.appendChild(column1);
      songListContainer.appendChild(column2);
    }

    songTitle.textContent = song.title;
    artistName.textContent = song.artist || "";

    albumCover.onerror = () => {
      albumCover.src = "images/default.jpg";
    };
    albumCover.src = albumImages[currentAlbum] || "images/default.jpg";

    // Remove any old album-specific classes from the back button
    backToHomeButton.className = "";
    backToHomeButton.classList.add(`back-${currentAlbum}`);

    // Add album-specific class to the song list wrapper
    const songListWrapper = document.getElementById("song-list-wrapper");
    if (songListWrapper) {
      songListWrapper.className = "";
      songListWrapper.classList.add(`back-${currentAlbum}`);
    }

    updateNextSongDisplay();
    updatePlayPauseIcons();
    renderSongList();
  }

  function togglePlayPause() {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }

  function updatePlayPauseIcons() {
    if (audioPlayer.paused) {
      imgPlayButton.style.display = "inline";
      imgPauseButton.style.display = "none";
    } else {
      imgPlayButton.style.display = "none";
      imgPauseButton.style.display = "inline";
    }
  }

  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updatePlayer();
    audioPlayer.play();
  }

  function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updatePlayer();
    audioPlayer.play();
  }

  function updateProgressBar() {
    if (audioPlayer.duration) {
      const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.value = percent;
      valueDisplay.textContent = formatTime(audioPlayer.currentTime);
    }
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function updateNextSongDisplay() {
    if (songs.length === 0) return;
    const nextIndex = (currentSongIndex + 1) % songs.length;
    nextSongName.textContent = `Next song: ${songs[nextIndex].title}`;
  }

  // Control event listeners
  imgPlayButton.addEventListener("click", () => {
    audioPlayer.play();
    updatePlayPauseIcons();
  });

  imgPauseButton.addEventListener("click", () => {
    audioPlayer.pause();
    updatePlayPauseIcons();
  });

  prevButton.addEventListener("click", playPrevSong);
  nextButton.addEventListener("click", playNextSong);

  backToHomeButton.addEventListener("click", () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    playerScreen.style.display = "none";
    startScreen.style.display = "block";
    backToHomeButton.style.display = "none";
    backToHomeButton.className = "";
  });

  // Audio event listeners
  audioPlayer.addEventListener("play", updatePlayPauseIcons);
  audioPlayer.addEventListener("pause", updatePlayPauseIcons);
  audioPlayer.addEventListener("ended", playNextSong);

  // --- PROGRESS BAR FUNCTIONS ---

  // Update the progress bar and time display as the song plays
  audioPlayer.addEventListener("timeupdate", () => {
    if (!isNaN(audioPlayer.duration)) {
      const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.value = percent;
      progressBar.style.backgroundSize = `${percent}% 100%`; // Optional visual fill if styled
      valueDisplay.textContent = formatTime(audioPlayer.currentTime);
    }
  });

  // Allow user to scrub through the track
  progressBar.addEventListener("input", () => {
    if (audioPlayer.duration) {
      const newTime = (progressBar.value / 100) * audioPlayer.duration;
      audioPlayer.currentTime = newTime;
    }
  });

  progressBar.style.backgroundSize = `${percent}% 100%`;
});