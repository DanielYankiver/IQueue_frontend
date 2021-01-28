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
            image.alt = "Content ID #" + content.id 
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

// const platformSort = document.querySelector(".platform-sort")
// const netflixBtn = document.querySelector(".netflix")
// const primeBtn = document.querySelector(".prime")
// const hboBtn = document.querySelector(".hbo")
// const huluBtn = document.querySelector(".hulu")
// const crunchyBtn = document.querySelector(".crunchy")
// const disneyBtn = document.querySelector(".disney")


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
        renderInfo(e.target.dataset.id)
        renderReview(e.target.dataset.id)
    })
}

clickContentEvent()
//bottom half stuff
let poster = document.querySelector(".poster")
let rating = document.querySelector(".rating")
let info = document.querySelector(".content-info")
let reviewUl = document.querySelector(".display-reviews")
let reviewDiv = document.querySelector(".reviews")

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

function renderInfo(contentId){
    fetch(`http://localhost:3000/contents/${contentId}`)
    .then(res => res.json())
    .then(contentObj => {
        info.innerHTML = ""
        let titleLi = document.createElement("li")
        let yearLi = document.createElement("li")
        let platformLi = document.createElement("li")
        let descriptionLi = document.createElement("li")
        let categoryLi = document.createElement("li")
        let idNum = document.createElement("li")
        let lineBreaker = document.createElement("br")
        titleLi.innerText = contentObj.title 
        yearLi.textContent = contentObj.year 
        platformLi.innerText = contentObj.platform
        descriptionLi.innerText = contentObj.description 
        categoryLi.innerText = contentObj.category 
        idNum.textContent = "Content ID #" + contentObj.id
        titleLi.append(lineBreaker)
        yearLi.append(lineBreaker)
        platformLi.append(lineBreaker)
        descriptionLi.append(lineBreaker)
        categoryLi.append(lineBreaker)
        idNum.append(lineBreaker)
        info.append(titleLi, yearLi, platformLi, categoryLi, descriptionLi, idNum)
    })

}

function renderReview(contentId) {
    let myReviews = []
    fetch(`http://localhost:3000/contents/${contentId}`)
    .then(res => res.json())
    .then(contentObj => {
        reviewUl.innerHTML = ""
        myOwnerships = []
        myOwnerships = contentObj.ownerships
        myOwnerships.forEach(ownerObj => {
            if(ownerObj.content_id == contentId) {
                myReviews.push(ownerObj)
                let reviewLi = document.createElement("li")
                reviewLi.innerText = ownerObj.review
                reviewLi.dataset.id = ownerObj.id 
                let deleteButton = document.createElement("button")
                let editButton = document.createElement("button")
                let lineBreak = document.createElement("br")
                deleteButton.innerText = "Delete"
                deleteButton.dataset.id = reviewLi.dataset.id 
                deleteButton.className = "delete"
                editButton.innerText = "Edit"
                editButton.dataset.id = reviewLi.dataset.id
                editButton.className = "edit"
                reviewLi.append(editButton, deleteButton)
                reviewUl.append(reviewLi)
             }

        })
       
        })
    }

function updateEvent()  {
    reviewDiv.addEventListener("click", (e) => {
        if (e.target.className == "edit") {
            updateReview(e.target.dataset.id)
        }

    })

}

let editForm = document.querySelector(".edit-form")

function updateReview (contentId) {
    editForm.innerHTML = ""
    let label = document.createElement("label")
    label.name = "update-review"
    label.textContent = "Update Your Review"

    let input1 = document.createElement("input")
    input1.type = "text"
    input1.name = "review"
    input1.placeholder = "Update Your Review Here"

    let input2 = document.createElement("input")
    input2.type = "submit"
    input2.value = "Submit Update"
    
    editForm.append(label, input1, input2)

    editForm.addEventListener("submit", (e) => {
        e.preventDefault() 
        let newReview = e.target.review.value 
        fetch(`http://localhost:3000/ownerships/${contentId}`, {
            method: 'PATCH', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify( {
                review: newReview
            }),
        })
        .then(res => res.json())
        .then(ownerObj => {
            renderReview(contentId)
        })
       e.target.reset()

    })
}

function delEvent() {
    reviewDiv.addEventListener("click", (e) => {
        e.preventDefault()
        if (e.target.className == "delete") {
            deleteReview(e.target.dataset.id)
        }

    })
    
}


function deleteReview(contentId) {
   fetch(`http://localhost:3000/ownerships/${contentId}`, {
       method: 'DELETE', 
    }) 
       .then(res => res.json())
       .then(data => {
        renderReview(contentId)
       })
}

updateEvent()
delEvent()


let addQueueForm = document.querySelector(".queue-form") 

function addToQueue() {
    addQueueForm.innerHTML = ""
    
    let label = document.createElement("label")
    label.name = "add-to-queue"
    label.textContent = "What Do You Want Add?"

    let input1 = document.createElement("input")
    input1.type = "text"
    input1.name = "contentID"
    input1.placeholder = "Add the ID# of the Content You want to Add"

    let input2 = document.createElement("input")
    input2.type = "text"
    input2.name = "review"
    input2.placeholder = "Write Your Review Here"

    let breaker = document.createElement("br")

    let AddQueueButton = document.createElement("button")
    AddQueueButton.innerText = "Add to Queue"
    AddQueueButton.className = "add"

    addQueueForm.append(label, input1, input2, breaker, AddQueueButton) 

}
addToQueue()

addQueueForm.addEventListener("submit", (e) => {
    e.preventDefault() 

    let newOwnershipObj = {
        review: e.target.review.value,
        user_id: userId,
        content_id: e.target.contentID.value
    }
    
    console.log(e.target.contentID.value)
    console.log(e.target.review.value) 

    fetch("http://localhost:3000/ownerships", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json" 
        }, 
        body: JSON.stringify(newOwnershipObj)
    })
    .then(res => res.json())
    .then(newObj => {
        console.log("Added successfully!")
    })
    e.target.reset()

} ) 


