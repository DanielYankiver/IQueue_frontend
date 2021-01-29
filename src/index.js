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

let editForm = document.querySelector(".edit-form")
console.log(editForm)
editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    debugger 
    let editButton = document.querySelector(".update-button")
    if(editButton.value == "Update Review") {
        let newContentId = (e.target.contentId.value)
        let newReview = (e.target.reviewupdate.value)
        let newReviewObj = {
            id: newContentId,
            review: newReview
        }
        fetch(`http://localhost:3000/ownerships/${newContentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReviewObj)
        })
        .then( res => res.json())
        .then( data => {
            renderReview(newContentId)
        })
        e.target.reset()
    }
})

// editForm.addEventListener("submit", (e) => {
//     debugger
//     e.preventDefault() 
//     let id = e.target.dataset.id
//     // console.log(e.target)
//     let newReview = e.target.review.value 
//     // console.log(newReview)
//     fetch(`http://localhost:3000/ownerships/${id}`, {
//         method: 'PATCH', 
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify( {
//             review: newReview
//         }),
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         renderReview(contentId)
//     })
//    e.target.reset()

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
                 let netflixImg = document.createElement("img")
                 netflixImg.className ="platformImg"
                 netflixImg.src = "https://blackandredgister.com/wp-content/uploads/2018/05/Screen-Shot-2018-05-15-at-8-900x600.jpg"
                 netflixImg.style.maxWidth = "170px"
                 netflixImg.style.maxHeight= "125px"
                 titleName.append(netflixImg)
                queueUl.append(titleName)
                mainQueue.append(queueUl)

            //     let platformImg = document.createElement("img")
            //     platformImg.src = "https://toppng.com/uploads/preview/netflix-logo-png-11593869496jqso5gxgsy.png"
            //     platformImg.style.maxWidth = "50px"
            //     platformImg.style.maxHeight = "50px"
            //     titleName.append(platformImg)
            // }
            // titleName.innerText +=  (" -----" + contentObj.platform)
            // queueUl.append(titleName)
            // mainQueue.append(queueUl)
        }
        else if (contentObj.platform == "Prime Video") {
            let primeImg = document.createElement("img")
                 primeImg.className = "platformImg"
                 primeImg.src = "data:image/png;base64,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"
                 primeImg.style.maxWidth = "170px"
                 primeImg.style.maxHeight= "125px"
                 titleName.append(primeImg)
                queueUl.append(titleName)
                mainQueue.append(queueUl)

        }
        else if (contentObj.platform == "HBO Max") {
            let hboImg = document.createElement("img")
                hboImg.className = "platformImg"
                hboImg.src = "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/zljbr5prwbm5fgp92fd9/hbo-max-black2"
                hboImg.style.maxWidth = "170px"
                hboImg.style.maxHeight= "125px"
                titleName.append(hboImg)
                queueUl.append(titleName)
                mainQueue.append(queueUl)
        }
        else if(contentObj.platform == "Crunchyroll") {
            let crunchyImg = document.createElement("img")
            crunchyImg.className = "platformImg"
            crunchyImg.src = "https://basictech.tips/wp-content/uploads/crunchyroll-logo.png"
            crunchyImg.style.maxWidth = "170px"
            crunchyImg.style.maxHeight= "125px"
            titleName.append(crunchyImg)
            queueUl.append(titleName)
            mainQueue.append(queueUl)

        }
        else if(contentObj.platform == "Hulu") {
            let huluImg = document.createElement("img")
            huluImg.className = "platformImg"
            huluImg.src = "https://assetshuluimcom-a.akamaihd.net/h3o/facebook_share_thumb_default_hulu.jpg"
            huluImg.style.maxWidth = "170px"
            huluImg.style.maxHeight= "125x"
            titleName.append(huluImg)
            queueUl.append(titleName)
            mainQueue.append(queueUl)
        }
        else if(contentObj.platform =="Disney+") {
            let disneyImg = document.createElement("img")
            disneyImg.className = "platformImg"
            disneyImg.src = "https://r3.whistleout.com.au/public/images/articles/2019/08/disney_plus_logo.jpg"
            disneyImg.style.maxWidth = "170px"
            disneyImg.style.maxHeight= "1205x"
            titleName.append(disneyImg)
            queueUl.append(titleName)
            mainQueue.append(queueUl)
        }
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
                let reviewLi = document.createElement("p")
                reviewLi.innerText = ownerObj.review
                reviewLi.dataset.id = ownerObj.id 
                let deleteButton = document.createElement("button")
                //let editButton = document.createElement("button")
                // let lineBreak = document.createElement("br")
                deleteButton.innerText = "Delete this content from your queue"
                deleteButton.dataset.id = reviewLi.dataset.id 
                deleteButton.className = "delete"
                //editButton.innerText = "Edit this review"
                //editButton.dataset.id = reviewLi.dataset.id
                //editButton.className = "edit"
                reviewLi.append(deleteButton)
                reviewUl.append(reviewLi)
             }
        })
    })
}

//PATCH STUFF, this is cool bc we generate a form on edit click

//let editForm = document.querySelector(".edit-form")

// function updateEvent()  {
//     reviewDiv.addEventListener("click", (e) => {
//         if (e.target.className == "edit") {
//             updateReview(e.target.dataset.id)
//         }
//     })
// }
// updateEvent()


// function updateReview (contentId) {
//     editForm.innerHTML = ""
//     editForm.dataset.id = contentId
//     let label = document.createElement("label")
//     label.name = "update-review"
//     label.textContent = "Update Your Review"

//     // let input1 = document.createElement("input")
//     // input1.type = "text"
//     // input1.name = "contentID"
//     // input1.placeholder = "Add the ID# of the Content You want to Edit"

//     let input2 = document.createElement("input")
//     input2.type = "text"
//     input2.name = "review"
//     input2.id = "review"
//     input2.placeholder = "Update Your Review Here"

//     let input3 = document.createElement("input")
//     input3.type = "submit"
//     input3.value = "Submit Update"
    
//     editForm.append(label, input2, input3)

    
// }

// editForm.addEventListener("submit", (e) => {
//     debugger
//     e.preventDefault() 
//     let id = e.target.dataset.id
//     // console.log(e.target)
//     let newReview = e.target.review.value 
//     // console.log(newReview)
//     fetch(`http://localhost:3000/ownerships/${id}`, {
//         method: 'PATCH', 
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify( {
//             review: newReview
//         }),
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         renderReview(contentId)
//     })
//    e.target.reset()

// })

//updateReview()

  

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


delEvent()


