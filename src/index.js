const genArray = [] 
let userId = 1 

//****** Queue-list ******//

const queueList = document.querySelector(".queue-list")
const generalBtn = document.querySelector(".gen")
const animeBtn = document.querySelector(".anime")
const famBtn = document.querySelector(".fam")
const dateBtn = document.querySelector(".date")
const laughBtn = document.querySelector(".laugh")

// FUNCTION FOR ALL 5 BUTTONS
function clickQueueListEvent() {
    queueList.addEventListener("click", (e) => {
      if (e.target.className === "gen") {
        fetch("http://localhost:3000/contents")
        .then(res => res.json())
        .then(contentArr => {
            let generalArray = []
            contentArr.forEach(content => {
                if (content.queue_list_id === 1) {
                    generalArray.push(content)
                }
            })
            getQueue(generalArray)
        })
      } 
      else if (e.target.className === "anime") {
          fetch("http://localhost:3000/contents")
          .then(res => res.json())
          .then(contentArr => {
              let animeArray = []
              contentArr.forEach(content => {
                  if (content.queue_list_id === 2) {
                      animeArray.push(content)
                  }
              })
              getQueue(animeArray)
          })
      }
      else if (e.target.className === "fam") {
        fetch("http://localhost:3000/contents")
        .then(res => res.json())
        .then(contentArr => {
            let famArray = []
            contentArr.forEach(content => {
                if (content.queue_list_id === 3) {
                    famArray.push(content)
                }
            })
            getQueue(famArray)
        })
      }
      else if (e.target.className === "date") {
        fetch("http://localhost:3000/contents")
        .then(res => res.json())
        .then(contentArr => {
            let dateArray = []
            contentArr.forEach(content => {
                if (content.queue_list_id === 4) {
                    dateArray.push(content)
                }
            })
            getQueue(dateArray)
        })
      }
      else {
        fetch("http://localhost:3000/contents")
        .then(res => res.json())
        .then(contentArr => {
            let laughArray = []
            contentArr.forEach(content => {
                if (content.queue_list_id === 5) {
                    laughArray.push(content)
                }
            })
            getQueue(laughArray)
        })   
      }

      
    })
}

clickQueueListEvent()


//****** Browse Movies By Scroll ******//

const browseMovies = document.querySelector(".movie-browse")
const browseUl = document.querySelector(".browse")

function renderBrowseMovies(){

    fetch("http://localhost:3000/contents")
    .then(res => res.json())
    .then(contentArr => {
        contentArr.forEach(content => {
            let imageLi = document.createElement("li")
            let image = document.createElement("img")
            image.src = content.image
            image.dataset.id = content.id 
            imageLi.append(image)
            browseUl.append(imageLi)
        })
    })

}
//need to fix YourName, change seed later

//renderBrowseMovies()

//****** Sign In ******//
const loginForm = document.querySelector(".sign-in")
const loginBtn = document.querySelector(".sign-in-button")
const loginDiv = document.querySelector(".sign-in-div")
const pName = document.createElement("p")
pName.innerText = "erwin"

function loginEvent() {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        pName.innerText = e.target.username.value
        loginDiv.append(pName)
        if (pName.innerText === "erwin") {
            UserId = 1 
        }
        else {
            UserId = 2 
        }
    })
}

loginEvent()

//********Platform buttons ******/
// Netflix, Prime Video, HBO Max, Hulu, Crunchyroll, Disney+

const platformSort = document.querySelector(".platform-sort")
const netflixBtn = document.querySelector(".netflix")
const primeBtn = document.querySelector(".prime")
const hboBtn = document.querySelector(".hbo")
const huluBtn = document.querySelector(".hulu")
const crunchyBtn = document.querySelector(".crunchy")
const disneyBtn = document.querySelector(".disney")


//*******Queue ******/

const mainQueue = document.querySelector(".queue-display")
const queueUl = document.createElement("ul")

//HELPER TO RENDER USER SPECIFIC QUEUE LIST
function getQueue(queueArray) {
    let myQueue = [] 
    queueUl.innerHTML = ""
    // fetch("http://localhost:3000/contents")
    // .then(res => res.json())
    // .then(contentArr => {
    //     contentArr.forEach(contentObj => {
    //         if(contentObj.queue_list_id === 1) {
    //             genArray.push(contentObj)
    //         } 
        //console.log(genArray[0].ownerships[0].user_id)
        //console.log(genArray[0].ownerships.length)
        for (let i = 0; i < queueArray.length; i++) {
            for (let j =0; j< queueArray[i].ownerships.length; j++) {
                if(queueArray[i].ownerships[j].user_id === userId) {
                    myQueue.push(queueArray[i])
                }
            }
        }
        myQueue.forEach(contentObj => {
            let titleName = document.createElement("li")
            titleName.dataset.id = contentObj.id 
            titleName.innerText = contentObj.title
            titleName.innerText +=  (" -----" + contentObj.platform)
            queueUl.append(titleName)
            mainQueue.append(queueUl)
        })
    }

//NEED FUNCTION EVENT LISTENER CLICK THAT WILL RENDER POSTER/RATING/INFO 
function clickContentEvent() {
    mainQueue.addEventListener("click", (e) => {
        renderPoster(e.target.dataset.id)
    })
}

clickContentEvent()

let poster = document.querySelector(".poster")
let rating = document.querySelector(".rating")

function renderPoster(contentId) {
    fetch(`http://localhost:3000/contents/${contentId}`)
    .then(res => res.json())
    .then(contentObj => {
        poster.innerHTML = ""
        rating.innerHTML = ""
        let posterImage = document.createElement("img")
        let contentRating = document.createElement("p")
        contentRating.textContent = contentObj.rating
        rating.append(contentRating)
        posterImage.src = contentObj.image 
        poster.append(posterImage)
    })
}

function renderInfo(){

}

