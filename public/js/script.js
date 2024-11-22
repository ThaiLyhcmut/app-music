// Aplayer
const aplayer = document.querySelector("#aplayer");
if(aplayer) {
  const dataSong = JSON.parse(aplayer.getAttribute("data-song"));
  const dataSinger = JSON.parse(aplayer.getAttribute("data-singer"));
  const ap = new APlayer({
    container: aplayer,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar
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