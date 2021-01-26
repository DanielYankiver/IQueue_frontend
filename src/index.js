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
            console.log(generalArray)
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
              console.log(animeArray)
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
            console.log(famArray)
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
            console.log(dateArray)
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
            console.log(laughArray)
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

function loginEvent() {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const pName = document.createElement("p")
        pName.innerText = e.target.username.value
        
        loginDiv.append(pName)
    })
}

loginEvent()