let genArray = [] 
let userId = 1

//****** FUNCTION INVOCATIONS *****//

clickQueueListEvent()

//renderBrowseMovies()

renderLogin()
clickContentEvent()

addToQueue()

//****** Update Review *****//
updateEvent()

//***** Deleting a Movie from a Queue *****//
delEvent()



//****** Queue-list Buttons ******//

let queueList = document.querySelector(".queue-list")
let generalBtn = document.querySelector(".gen")
let animeBtn = document.querySelector(".anime")
let famBtn = document.querySelector(".fam")
let dateBtn = document.querySelector(".date")
let laughBtn = document.querySelector(".laugh")


//****** BUTTON FUNCTIONALITY ******//
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

//****** Browse Movies By Scroll ******//

let browseMovies = document.querySelector(".movie-browse")
let browseUl = document.querySelector(".browse")

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

//****** Sign In ******//


let loginDiv = document.querySelector(".sign-in-div")
let pName = document.createElement("p")
pName.innerText = "erwin"

function renderLogin(){
    loginDiv.addEventListener("submit", event => {
        event.preventDefault()
        let lgnBtn = document.querySelector(".login-button")
        if(lgnBtn.value === "Login") {
            if(event.target.username.value.toLowerCase() == "erwin") {
                loginDiv.append(pName)
                userId = 1 
            }
            else if (event.target.username.value.toLowerCase() == "daniel") {
                pName.innerText = "daniel"
                loginDiv.append(pName)
                userId = 2 
            }
        }
    })          
}


//*******Queue ******/
const mainQueue = document.querySelector(".queue-display")
const queueUl = document.createElement("ul")

//HELPER FUNCTION TO GET SPECIFIC QUEUE ON THE BUTTON CLICKS
function getQueue(queueArray) {
    let myQueue = [] 
    queueUl.innerHTML = ""
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
    
//CLICKING ON MOVIE lis that will call on render helpers

let poster = document.querySelector(".poster")
let rating = document.querySelector(".rating")
let info = document.querySelector(".content-info")
let reviewUl = document.querySelector(".display-reviews")
let reviewDiv = document.querySelector(".reviews")


function clickContentEvent() {
    mainQueue.addEventListener("click", (e) => {
        renderPoster(e.target.dataset.id)
        renderInfo(e.target.dataset.id)
        renderReview(e.target.dataset.id)
    })
}

//POSTER AND RATING HELPER

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

//INFO HELPER

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

//REVIEW HELPER

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

//PATCH STUFF, this is cool bc we generate a form on edit click

let editForm = document.querySelector(".edit-form")

function updateEvent()  {
    reviewDiv.addEventListener("click", (e) => {
        if (e.target.className == "edit") {
            updateReview(e.target.dataset.id)
        }
    })
}


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

//DELETE STUFF

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


//POST STUFF and add to queue form

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


