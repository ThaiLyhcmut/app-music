// Aplayer
const aplayer = document.querySelector("#aplayer");
if(aplayer) {
  const dataSong = JSON.parse(aplayer.getAttribute("data-song"));
  const dataSinger = JSON.parse(aplayer.getAttribute("data-singer"));
  const ap = new APlayer({
    container: aplayer,
    lrcType: 1,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        lrc: dataSong.lyrics
      }
    ],
    autoplay: true
  });

  const avatar = document.querySelector(".singer-detail .inner-avatar")

  ap.on('play', () => {
    avatar.style.animationPlayState = "running"
  })
  ap.on('pause', () => {
    avatar.style.animationPlayState = "paused"
  })
  ap.on('ended', () => {
    fetch(`/songs/listen/${dataSong._id}`, {
      method: "PATCH",
    }).then(res => res.json())
      .then(data => {
        if(data.code == "success"){
          document.querySelector(".singer-detail .inner-listen span").innerHTML = data.listen
        }
      })
  })
}
// End Aplayer

// Tính năng like
const buttonLike = document.querySelector("[button-like]")
if(buttonLike) {
  buttonLike.addEventListener("click", () => {
    const id = buttonLike.getAttribute("button-like")
    let status = ""

    if(buttonLike.classList.contains("active")){
      buttonLike.classList.remove("active");
      status = "dislike"
    }else{
      buttonLike.classList.add("active");
      status = "like"
    }
    const data = {
      id: id,
      status: status
    }
    fetch("/songs/like", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {
      if (data.code = "success") {
        buttonLike.querySelector("span").innerHTML = data.like
        console.log(data)
      }
    })
  })
}
// hết tính năng like

// Tinh nang yeu thich
const listButtonFavorite = document.querySelectorAll("[button-favorite]")
if(listButtonFavorite.length > 0) {
  listButtonFavorite.forEach(buttonFavorite => {
    buttonFavorite.addEventListener("click", () => {
      const id = buttonFavorite.getAttribute("button-favorite")
      buttonFavorite.classList.toggle("active")
      fetch("/songs/favorite", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          id: id
        })
      }).then(res => res.json()).then(data => {
        if (data.code = "success") {
          console.log("da them bai hat vao trang yeu thich")
        }
      })
    })
  })
}
// het tinh nang yeu thich

// Gợi ý tìm kiếm
const boxSearch = document.querySelector(".box-search");
if(boxSearch){
  const input = boxSearch.querySelector(`input[name="keyword"]`)
  const innerSuggest = boxSearch.querySelector(".inner-suggest")
  const innerList = boxSearch.querySelector(".inner-list")
  input.addEventListener("keyup", () => {
    const keyword = input.value
    fetch(`/songs/search/suggest?keyword=${keyword}`)
      .then(res => res.json())
      .then(data => {
        if(data.songs.length > 0){
          const htmls = data.songs.map((item, index) => 
            `<a class="inner-item" href="/songs/detail/${item.slug}">
                <div class="inner-image">
                  <img src="${item.avatar}">
                </div>
                <div class="inner-info">
                  <div class="inner-title">${item.title}</div>
                  <div class="inner-singer">
                    <i class="fa-solid fa-microphone-lines"></i> ${item.singerFullName}
                  </div>
                </div>
              </a>
            ` 
          )
          innerSuggest.classList.add("show");
          innerList.innerHTML = htmls.join("");
        }else{
          innerSuggest.classList.remove("show");
          innerList.innerHTML = "";
        }
      })
  })
}
// hết gợi ý tìm kiếm