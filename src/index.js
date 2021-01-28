let genArray = [] 
let userId = 1



//****** Queue-list Buttons ******//

let queueList = document.querySelector(".queue-list")
let generalBtn = document.querySelector(".gen")
let animeBtn = document.querySelector(".anime")
let famBtn = document.querySelector(".fam")
let dateBtn = document.querySelector(".date")
let laughBtn = document.querySelector(".laugh")
//let qHeader = document.querySelector(".myQueue")

//****** BUTTON FUNCTIONALITY ******//
function clickQueueListEvent() {
    queueList.addEventListener("click", (e) => {
      if (e.target.className === "gen") {
        //  qHeader.textContent = "General Queue"
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
        //  qHeader.textContent ="Animation Queue"
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
         // qHeaders.textContent = "Family Queue"
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
         // qHeader.textContent = "Date Night Queue"
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
      else if(e.target.className ==="laugh") {
          //qHeaders.textContent = "Laugh Queue"
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
      else {
          alert("Please click on a queue list button!")
      }
    })
}

clickQueueListEvent()

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
            //let movieCard = document.createElement("div")
            image.src = content.image
            image.className = "carousel"
            image.style.maxWidth = "170px"
            image.style.maxHeight = "230px"
            image.alt = "Content ID #" + content.id 
            image.dataset.id = content.id 
            imageLi.append(image)
            browseUl.append(image)

            image.addEventListener("click", (e) => {
                alert(`${e.target.alt}`) 
            })
    })
})
}


renderBrowseMovies()

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
            else {
                alert("Incorrect username, defaulting you to our current user as we are too poor for security!")
                userId = 1 
            }
        }
    })          
}

renderLogin()


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
            let titleName = document.createElement("p")
            titleName.dataset.id = contentObj.id 
            titleName.className = "titleName"
            titleName.innerText = contentObj.title
            if (contentObj.platform == "Netflix") {
                let platformImg = document.createElement("img")
                img.src = NETFLLIX PHOTO
                SIZE THE FUCKIN PHOTO YEEE
                
            }
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
        if(e.target.className == "titleName"){

        renderPoster(e.target.dataset.id)
        renderInfo(e.target.dataset.id)
        renderReview(e.target.dataset.id) }
        else {
            alert("Please click on a title!")
        }
    })
}

clickContentEvent()

//POSTER AND RATING HELPER

function renderPoster(contentId) {
    fetch(`http://localhost:3000/contents/${contentId}`)
    .then(res => res.json())
    .then(contentObj => {
        poster.innerHTML = ""
        rating.innerHTML = ""
        let posterImage = document.createElement("img")
        let contentRating = document.createElement("p")
        // posterImage.style.maxWidth = "300px"
        // posterImage.style.maxHeight = "420px"
        //RATING ABOVE 90
        //RATING 80-90
        //RATING BELOW 80
        if (contentObj.rating >= 90) {
        contentRating.textContent = ("🔥🔥🔥" + contentObj.rating + "%")
    }
    else if (contentObj.rating < 90 && contentObj.rating >= 80) {
        contentRating.textContent = ("🔥🔥" + contentObj.rating + "%")
    }
    else {
        contentRating.textContent = ("🔥" + contentObj.rating + "%")
    }
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
        let titleLi = document.createElement("p")
        let yearLi = document.createElement("p")
        let platformLi = document.createElement("p")
        let descriptionLi = document.createElement("p")
        let categoryLi = document.createElement("p")
        let idNum = document.createElement("p")
        let lineBreaker = document.createElement("br")
        titleLi.innerText = ("TITLE: " + contentObj.title) 
        yearLi.textContent = ("RELEASE DATE: " + contentObj.year) 
        platformLi.innerText =("STREAMING PLATFORM: " + contentObj.platform)
        descriptionLi.innerText = ("DESCRIPTION: " + contentObj.description) 
        categoryLi.innerText = ("TYPE: " + contentObj.category) 
        idNum.textContent = "CONTENT ID #" + contentObj.id
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

updateEvent()
delEvent()


