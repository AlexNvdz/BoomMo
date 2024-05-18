const body = document.querySelector("body")
const btnHeart = document.querySelector(".btn-heart")


body.addEventListener("dblclick",e=>{
    const eTarget = e.target
    const eClass = eTarget.className
    if (eClass.includes("movie-list-item-img")) aggFavorite(eTarget)
})

async function aggFavorite(eTarget) {
    const id = eTarget.getAttribute("data-id")
    const icon = eTarget.parentElement.children[3]
    icon.style = "display: block;"
    setTimeout(()=>{
        icon.style = "display: none;"
    },2000)
   await fetch("/users/aggfav",{
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({movieId: parseInt(id)})
   })
}

