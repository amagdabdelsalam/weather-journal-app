/* Global Variables */
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=e94ce98c0912a83a4c2bde3ee8e85292'
const units = '&units=metric'

// User click event
let generate = document.getElementById('generate')
let userZip = document.getElementById('zip')
let userfeelings = document.getElementById('feelings')
let loading = document.getElementById('loading')
let flashMesg = document.getElementById('data-placeholder')

generate.addEventListener('click', () => {
    // Check if User add zip id 
    if (userZip.value) {
        loading.classList.add('loading')

        getData(apiUrl + userZip.value + units + apiKey).then((data) => {
           if (data.cod == 200) {
                // diplay none data placeholder 
                flashMesg.style.display = 'none'

            postProjectData('/postData',
                { temp: data.main.temp, date: newDate, userResponse: userfeelings.value }
            ).then((resData) => {
                // Update UI 
                document.getElementById('temp').innerText = data.main.temp + '°C'
                document.getElementById('date').innerText = newDate
                document.getElementById('user-feelings').innerText = userfeelings.value
            })

            // Clear Loading Animation
            loading.classList.remove('loading')
           } else {
               // Handel error message
                flashMesg.style.color = '#d35400'
                flashMesg.innerText = data.message
           }

        }).catch((error) => {
            console.log(error)
        })

    } else {
        // Handel error message 
        alert('Add your ZipCode')
    }
})

// API's async functions
const getData = async (url = '') => {
    try {
        let request = await fetch(url)
        return await request.json()
    } catch (error) {
        console.log("error", error)
    }
}

// Post Data to local server
const postProjectData = async (url = '', data = { temp: 0, date: '', userResponse: '' }) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    try {
        const resData = await response.json()
        return resData
    } catch (error) {
        console.log("error", error)
    }
}


// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()