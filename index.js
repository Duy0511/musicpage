
const $$ = document.querySelectorAll.bind(document)
const $ = document.querySelector.bind(document)
const cd = $('.cd')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toogle-play')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-pre')
const repeatBtn = $('.btn-repeat')
const randomBtn = $('.btn-random')


// const songElements = $$('.song')
// tại nó chưa đc render ra trang nên nó sẽ hiện ra những cài có từ ban đầu 
// phải dùng cái này 
// document.addEventListener('DOMContentLoaded', function() {
//     songElements = document.querySelectorAll('.song');
    // cách trên nó khó dùng nó chỉ dùng cho 1 lần sau khi render chứ thao tác về sau không dùng được nữa
//     // Thực hiện các thao tác với songElements sau khi trang đã được render
// });
// dùng cách dưới
// function activeSong(){
//     const songs = $$('.song')
//     songs.forEach((songElement, index) => {
//         if (index == _this.currentIndex) {
//             songElement.classList.add('active');
//         } else {
//             songElement.classList.remove('active');
//         }
//     });
// }
const title = $('h4')
const player = $('.player')
const imagesPath = [
    'image/BỎ LỠ MỘT NGƯỜI - LÊ BẢO BÌNH.jpg',
    'image/BƯỚC QUA ĐỜI NHAU - LÊ BẢO BÌNH.jpg',
    'image/Em Có Nghe - Kha.jpg',
    'image/LÁ XA LÌA CÀNH - LÊ BẢO BÌNH.jpg',
    'image/MẶT MỘC - Phạm Nguyên Ngọc x VAnh x Ân Nhi.jpg',
    'image/NÍU DUYÊN - LÊ BẢO BÌNH.jpg',
    'image/Phong Max - Hoa Cỏ Lau.jpg',
    'image/THÍCH THÌ ĐẾN - LÊ BẢO BÌNH.jpg',
    'image/Vì Anh Đâu Có Biết - Madihu.jpg',
]
const musicsPath = [
    'music/BỎ LỠ MỘT NGƯỜI - LÊ BẢO BÌNH .mp3',
    'music/BƯỚC QUA ĐỜI NHAU - LÊ BẢO BÌNH .mp3',
    'music/Em Có Nghe - Kha.mp3',
    'music/LÁ XA LÌA CÀNH - LÊ BẢO BÌNH .mp3',
    'music/MẶT MỘC - Phạm Nguyên Ngọc x VAnh x Ân Nhi .mp3',
    'music/NÍU DUYÊN - LÊ BẢO BÌNH .mp3',
    'music/Phong Max - Hoa Cỏ Lau .mp3',
    'music/THÍCH THÌ ĐẾN - LÊ BẢO BÌNH .mp3',
    'music/Vì Anh Đâu Có Biết - Madihu .mp3',
]
let nameAndArt = []
let arrayName = []
let arrayArt = []
function getNameAndArt(path,callback) {
    let array = path.slice(path.indexOf('/') + 1, path.lastIndexOf('.')-1)
    callback(array)
}
function getName(getNameAndArt,callback){
    let array = getNameAndArt.slice(0,getNameAndArt.indexOf('-')-1)
    callback(array)
}
function getArt(getNameAndArt,callback){
    let array = getNameAndArt.slice(getNameAndArt.indexOf('-')+1 , getNameAndArt.length)
    callback(array)
}
function pushNameAndArt(array){
    getName(array,function add(name){
        arrayName.push(name)
    })
    getArt(array,function add(art){
        arrayArt.push(art)
    })
}
musicsPath.forEach(music => {
    getNameAndArt(music,pushNameAndArt)
})
let obj = []
for(let i = 0; i < musicsPath.length; i++){
    let newObj = {
        name : arrayName[i],
        art : arrayArt[i],
        filePath : musicsPath[i],
        image : imagesPath[i],
    }
    obj.push(newObj)
}
const app = {
    songElements : [],
    currentIndex : 0,
    isPlaying : false,
    songs : obj,
    render : function() {
        const html =  this.songs.map((song,index) =>{
            return `<div class="song ${index === this.currentIndex ? 'active' : ''}" >
            <div class="thumb" style="background-image: url('${song.image}');"></div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.art}</p>
            </div>
            <div class="option"><i class="fa-solid fa-list"></i></div>
        </div>`
        
        })
        // hàm map thì nó chỉnh sửa mảng gốc và trả ra kết quả mảng mới 
        // con foreach nó chỉ có lặp qua các phần tử thôi chứ không trả ra mảng mới
        $('.playlist').innerHTML = html.join('')
        // hàm join thì nó chỉnh các phần tử trong mảng thành một chuỗi để '' thì các chuỗi sẽ k cách nhau
    },
    defindProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
        // thiết kế hàm này để cho mình khi lấy currentSong thì lấy đc bài hát đấy luôn k cần this.songs[this.currentIndex] bị dài
    },
    loadCurrentSong: function(){
        title.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.filePath
    },
    
    // lam quay cd 
    handleEvent: function(){
        const _this = this
        const cdWidth = cd.offsetWidth
        //xu ly cd quay / dung
        // const cdAnimate =  cdThumb.animate([
        //     {transform: 'rotate(360deg)'}
        // ],{
        //     duration : 10000, //10s phai quay het mot vong dia
        //     iterations: Infinity // dung de quay vo han 
        // })
        // cdAnimate.play()
        // dùng web api animation

        function spinCD(){
            if (_this.isPlaying) {
                cdThumb.style.animationPlayState = 'running'; // Tiếp tục quay
            } else {
                cdThumb.style.animationPlayState = 'paused'; // Dừng quay
            }
        }

        spinCD()
        document.onscroll = function(){
            
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
        playBtn.onclick = function(){
            if(_this.isPlaying) {
                audio.pause()
            }else{
                audio.play()
            }
        }
        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add('playing')
            spinCD()
            
        }
        audio.onpause = function(){
            player.classList.remove('playing')
            _this.isPlaying = false
            spinCD()
        }
        nextBtn.onclick = function(){
            if(_this.currentIndex < musicsPath.length -1) {
                _this.currentIndex+=1
            }else{
                _this.currentIndex = 0
            }
            activeSong()
            _this.loadCurrentSong()
            audio.play()
        }
        repeatBtn.onclick = function(){
            
        }
        prevBtn.onclick = function(){
            if(_this.currentIndex > 0) {
                _this.currentIndex -=1
            }else{
                _this.currentIndex = musicsPath.length-1
            }
            activeSong()
            _this.loadCurrentSong()
            audio.play()
        }
        function activeSong(){
            const songs = $$('.song')
            songs.forEach((songElement, index) => {
                if (index == _this.currentIndex) {
                    songElement.classList.add('active');
                } else {
                    songElement.classList.remove('active');
                }
            });
        }
    },
    start : function() {
        this.render()
        this.defindProperties()
        this.loadCurrentSong()
        this.handleEvent()
        
    }
}
app.start()
console.log(obj)


