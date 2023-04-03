const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const app = {
  currentIndex: 0,
  isPlayer: true,

  // du lieu bai hat
  songs: [
    {
      name: "Chờ ngày tình yêu nở hoa",
      singer: "Nguyên Hà",
      path: "./music/music7.mp3",
      image: "./img/img7.jpg",
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
    const htmls = this.songs.map(function (song) {
      return ` <div class="song">
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
          </div>`;
    });

    $(".playlist").innerHTML = htmls.join("\n");
  },

  play: function () {},

  getSong: function () {
    return this.songs[this.currentIndex];
  },

  event: function () {
    // Xu ly cuon anh
    const _this = this;
    const cd = $(".cd");
    const cdWidth = cd.offsetWidth;
    const playBtn = $(".btn-toggle-play");
    const player = $(".player");
    const pauseBtn = $(".btn-pause");
    const nextBtn = $(".btn-next");
    const preBtn = $(".btn-prev");
    const song = $(".song");
    const progress = $("#progress");
    const listSong = $$(".song");
    console.log(listSong);
    
    listSong[0].onclick = function(){
        _this.isPlayer = true;
        const audio = $("#audio");
        audio.play();
        player.classList.add("playing");
        cdAnimate.play();
        listSong[0].classList.add('active')
        listSong[1].classList.remove('active')

    }

    // Xu ly ohong to thu nho cd
    document.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      const newCdWidth = cdWidth - scrollTop;
      console.log(newCdWidth);
      cd.style.width = newCdWidth + "px";
      if (newCdWidth > 58) {
        cd.style.width = newCdWidth + "px";
      } else {
        cd.style.width = 0;
      }
    };

    // Xu ly play nhac
    playBtn.onclick = function () {
      if (_this.isPlayer) {
        _this.isPlayer = false;
        audio.pause();
        player.classList.remove("playing");
        cdAnimate.pause();
      } else {
        _this.isPlayer = true;
        const audio = $("#audio");
        audio.play();
        player.classList.add("playing");
        cdAnimate.play();
      }
    };

    // Xu ly chuyen tiep bai hat
    nextBtn.onclick = function () {
      _this.nextSong();
      audio.play();
    };

    // Xu ly quay ve bai hat
    preBtn.onclick = function () {
      _this.prevSong();
      audio.play();
    };

    //Xu ly tua bai hat
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPersent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPersent;
      }
    };

    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    //Xu ly CD quay
    const cdAnimate = cd.animate(
      [{ transform: "rotate(360deg)" }],

      {
        duration: 10000, // 10s
        iterations: Infinity,
      }
    );
    cdAnimate.pause();

    // Xu ly song
  },

  loadCurrentSong: function () {
    const heading = $("header h2");
    const cd = $(".cd-thumb");
    const audio = $("#audio");
    heading.textContent = this.getSong().name;
    cd.style.backgroundImage = `url('${this.getSong().image}')`;
    audio.src = this.getSong().path;
  },

  // next bai hat
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  // prev bai hat

  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  //

  // start
  start: function () {
    this.render();
    this.event();
    this.getSong();
    this.loadCurrentSong();
  },
};
app.start();
