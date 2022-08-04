let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



//fetch all toys
// document.addEventListener("DOMContentLoaded", () =>{
// fetch("http://localhost:3000/toys") //make sure cd into file before runing the server
// .then(res => res.json())
// .then(res => { console.log("response2", res)
//   res.forEach(toy => addToys(toy))

// })
// })

function fetchToys() {
  fetch("http://localhost:3000/toys") //make sure cd into file before runing the server
    .then((res) => res.json())
    .then((res) => {
      console.log("response2", res);
      res.forEach((toy) => addToys(toy));
    });
}
function addToys(toy){
  let div = document.getElementById("toy-collection")
  let card = document.createElement("div")
  div.appendChild(card)
  card.className = "card"

  let h2 = document.createElement("h2")
  card.appendChild(h2)
  let name = toy.name
  h2.innerText = name

  let image = document.createElement("img")
  card.appendChild(image)
  image.className ="toy-avatar"
  //let imgURL = toy.image
  image.src = toy.image
  console.log("toy", toy)
  console.log("toy image", toy.image)
  

  let p = document.createElement("p")
  p.innerText =`${toy.likes} likes` 
  card.append(p)

  let button = document.createElement("button")
  card.append(button)
  button.className = "like-btn"
  button.id = toy.id
  button.innerText = "Like"
  button.addEventListener('click',(e) => { increment(e)})
  //button.addEventListener('click',(e) => {console.log(e)})
}

// const input =Array.from( document.querySelectorAll(".input-text"))
// console.log("input", input)


// const postRequest = {
//   method: "Post",
//   headers:{
//     "Content-Type": "application/json", 
//     "Accept" : "application/json"
//   },
//   body: JSON.stringify({
//     "name": input[0].value,
//     "image": input[1].value,
//     "likes": 0,
 
//   })
// }

// fetch("http://localhost:3000/toys", postRequest)


// const getButton = document.querySelector(".add-toy-form")
// console.log("button",getButton)
// getButton.addEventListener("submit",(event) =>{
//   event.preventDefault()
//   console.log(input[0].value)
//   console.log( input[1].value)
// } )


 
function increment(event) {
  console.log("toy like is clicked")
  console.log(parseInt(event.target.previousElementSibling.innerText));
  let count = parseInt(event.target.previousElementSibling.innerText) + 1;
console.log("count", count)
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: count,
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}