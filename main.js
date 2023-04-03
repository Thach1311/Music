const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playlist = $(".playlist");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const nextBtn = $(".btn-next");
const preBtn = $(".btn-prev");
const Cdthumb = $(".cd") 
const app = {
  currentIndex: 0,
  isPlaying: false,
  songs: [
    {
      name: "Luôn yêu đời",
      singer: "Den,Cheng",
      path: "./music/music1.mp3",
      image: "./img/img1.jpg",
    },
    {
      name: "để tôi ôm em giai điệu này",
      singer: "Kai Đinh,MIN, GREY D",
      path: "./music/music2.mp3",
      image: "./img/img2.jpg",
    },
    {
      name: "Rồi sẽ ổn thôi mà",
      singer: "Hứa Kim Tuyền",
      path: "./music/music3.mp3",
      image: "./img/img3.jpg",
    },

    // them moi


    {
      name: "Em đồng ý (I Do)",
      singer: "Đức Phúc, 911",
      path: "./music/music5.mp3",
      image: "./img/img5.jpg",
    },

    {
      name: "Bật tình yêu lên",
      singer: "Tăng Duy Tân,Hòa Minzy",
      path: "./music/music6.mp3",
      image: "./img/img6.jpg",
    },
  ],

  render: function () {
    const htmls = this.songs.map((song) => {
      return ` 
                       <div class="song">
                        <div
                          class="thumb"
                          style="
                            background-image: url('${song.image}');
                          "
                        ></div>
                        <div class="body">
                          <h3 class="title">${song.name}</h3>
                          <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                          <i class="fas fa-ellipsis-h"></i>
                        </div>
                      </div>
                  `;
    });
    $(".playlist").innerHTML = htmls.join("\n");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const _this = this;

    
    document.onscroll = function () {
      console.log(document.documentElement.scrollTop);
    };

    // xy ly play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        _this.isPlaying = false;
        audio.pause();
        player.classList.remove("playing");
      } else {
        _this.isPlaying = true;
        audio.play();
        player.classList.add("playing");
      }
    };



    nextBtn.onclick = function () {
      _this.nextSong();
        audio.play()
    };

    preBtn.onclick = function(){
        _this.prevSong();
    };

  },

  // getCurrentsSong:function(){
  //   return this.songs[this.currentIndex]
  // },
  loadCurrentSong: function () {
    const heading = $("header h2");
    const cdThumb = $(".cd-thumb");
    const audio = $("#audio");

    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0 ) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  start: function () {
    this.defineProperties();
    this.render();
    this.handleEvents();

    this.loadCurrentSong();
  },
};
app.start();
