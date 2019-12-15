'use strict'

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/
import './config'
import '@utilities/detect-touch'
import '@utilities/detect-keyboard-focus'
import '@utilities/in-view'
import '@components/image'
import VideoLoader from '@components/video/loader'
import '@components/modal'
import '@utilities/focus-trap'
import '@components/form-elements'
// moduleInit.sync('[js-hook-input-file]', CustomFile);
// MODAL_HOOK.async('[js-hook-modal]', () =>
//   import(/* webpackChunkName: 'Modal' */ '@components/modal'),
// )
// Sync example
// import Example from '@components/example' // Sync
// moduleInit.sync('[js-hook-module-example]', Example) // Sync

VideoLoader.then(([Platforms, Video]) => {
  Video.default.registerPlatforms({
    native: Platforms.Native,
    youtube: Platforms.Youtube,
    vimeo: Platforms.Vimeo,
  })
}).catch(() => {})


// global variables
const contactUs = document.querySelector('.contact_us')
const nextButton = document.querySelector('.right__icon')
const prevButton = document.querySelector('.left__icon')
const showInput = document.getElementById('showInput')
const email = document.getElementById('email')
const first = document.getElementById('first')
const last = document.getElementById('last')
const submitBtn = document.getElementById('submitBtn')
const modalContent = document.querySelector('.modal__content')
const shakeTime = 100 // Shake Transition Time
var modalContainer = document.querySelector('#modal-custom')
const formOnSubmit = document.querySelector('.c-form')

window.onload = function() {
  modalContent.style.height = '200px'
}

function transform(x, y) {
  modalContainer.style.transform = `translate(${x}px, ${y}px)`
}

//animation
function repeatShake() {
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0)
    setTimeout(transform, shakeTime * 6, 0, 0)
  }
}

//shows only the name part
function displayNameForm() {
  email.style.opacity = '0'
  modalContent.style.height = '420px'
  setTimeout(function() {
    showInput.style.opacity = '1'
    showInput.style.top = '50px'
    prevButton.style.opacity = '1'
    nextButton.style.opacity = '0'
    contactUs.style.display = 'block'
    prevButton.style.top = '-66px'
  }, 200)
}

//shows only the email part
function onlyEmail() {
  contactUs.style.display = 'none'
  showInput.style.opacity = '0'
  nextButton.style.opacity = '1'
  email.style.opacity = '1'
  prevButton.style.opacity = '0'
  nextButton.style.top = '-105px'
  modalContent.style.height = '200px'
}

//hide names form when email is showing
function showEmail() {
  onlyEmail()
  contactUs.style.display = 'none'
  first.value = ''
  last.value = ''
  modalContent.style.height = '200px'
  showInput.style.opacity = '0'
  email.style.opacity = '1'
  prevButton.style.opacity = '0'
  nextButton.style.opacity = '1'
  nextButton.addEventListener('click', validateForm)
}

//events
  prevButton.addEventListener('click', showEmail)
  //submit form
formOnSubmit.addEventListener('submit', validateForm)
//switch events listener based on what's displayed
nextButton.addEventListener('click', validateForm)


// Defining a function to display error message
function printError(elemId, hintMsg) {
  document.getElementById(elemId).innerHTML = hintMsg
}

// Defining a function to validate form
function validateForm(e) {
  e.preventDefault()
  // Retrieving the values of form elements
  let emailForm = document.getElementById('email').value
  let firstForm = document.getElementById('first').value
  let lastForm = document.getElementById('last').value

  // Defining error constiables with a default value
  let emailErr = true
  let firstErr = true
  let lastErr = true

  // Validate name
  function checkFirstName() {
    if (firstForm == '') {
      printError('firstErr ', 'Please enter your first name')
    } else {
      const regex = /^[a-zA-Z\s]+$/
      if (regex.test(firstForm) === false || firstForm.length < 3) {
        printError('firstErr', 'Please enter a valid name')
      } else {
        printError('firstErr', '')
        firstErr = false
      }
    }
  }

  // Validate email address
  function checkEmail() {
    if (emailForm == '') {
      printError('emailErr', 'Please enter your email address')
    } else {
      // Regular expression for basic email validation
      const regex = /^\S+@\S+\.\S+$/
      if (regex.test(emailForm) === false || emailForm.length < 6) {
        printError('emailErr', 'Please enter a valid email address')
        repeatShake()
        setTimeout(function() {
          printError('emailErr', '')
        }, 4000)
      } else {
        nextButton.removeEventListener('click', validateForm)
        nextButton.style.opacity = '0'
        displayNameForm()
        submitBtn.style.opacity = '1'
        printError('emailErr', '')
        emailErr = false
      }
    }
  }

  // Validate last name
  function checkLastName() {
    if (lastForm == '') {
      printError('lastErr', 'Please enter your first name')
    } else {
      const regex = /^[a-zA-Z\s]+$/
      if (regex.test(lastForm) === false || lastForm.length < 3) {
        printError('lastErr', 'Please enter a valid name')
      } else {
        printError('lastErr', '')
        lastErr = false
      }
    }
  }

  checkEmail()
  checkFirstName()
  checkLastName()
  transform()

  // Prevent the form from being submitted if there are any errors
  if ((firstErr || emailErr || lastErr) === true) {
    return false
  } else {
    displayNameForm()
    if (emailErr === false && firstErr === false && lastErr === false) {
      nextButton.removeEventListener('click', validateForm)
      nextButton.style.opacity = '0'
      check()
      const modalIsShowing = document.querySelector('.c-modal')
      modalIsShowing.style.opacity = '0'
      // document.querySelector('.c-modal').classList.remove('modal--is-showing')
      setTimeout(function() {
        modalIsShowing.classList.remove('modal--is-showing')
      }, 600)
    }
  }
}

// window.onload = function() {
function check() {
  const modalIsShowing = document.querySelector('.c-modal')

  const url = 'https://jsonplaceholder.typicode.com/users'
  const data = {
    email: document.getElementById('email').value,
    first: document.getElementById('first').value,
    last: document.getElementById('last').value,
  }

  const newData = JSON.stringify(data)
  console.log(newData)

  const other_params = {
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: newData,
    method: 'POST',
    mode: 'cors',
  }

  function checkVideo() {
    const playVideo = document.querySelector('video')
    if (playVideo.paused) {
      playVideo.play()
    }
  }

  function clearInput() {
    document.getElementById('email').value = ''
    document.getElementById('first').value = ''
    document.getElementById('last').value = ''
  }

  function displaySuccMsg() {
    modalIsShowing.style.opacity = '1'
    checkVideo()
    const divMessage = document.getElementById('message')
    divMessage.classList.remove('hide-msg')
    divMessage.classList.add('show-msg')
    onlyEmail()
    email.style.opacity = '1'
    nextButton.addEventListener('click', validateForm)
    divMessage.innerHTML = 'Bedankt voor uw aanmelding!🎉'
    setTimeout(function() {
      divMessage.classList.remove('show-msg')
      divMessage.innerHTML = ''
    }, 10000)
  }

  function displayError(output) {
    modalIsShowing.style.opacity = '1'
    const divMessage = document.getElementById('message')
    divMessage.classList.remove('hide-msg')
    divMessage.classList.add('error-msg')
    divMessage.innerHTML = 'Could not reach the API ' + output
    setTimeout(function() {
      divMessage.classList.remove('error-msg')
      divMessage.innerHTML = ''
    }, 10000)
  }

  console.log(other_params)

  fetch(url, other_params)
    .then(function(response) {
      if (response.ok) {
        return response.json()
      } else {
        displayError()
        modalIsShowing.classList.remove('modal--is-showing')
        throw new Error('Could not reach the API: ' + response.statusText)
      }
    })
    .then(function(data) {
      console.log(data)
      setTimeout(function() {}, 10)
      checkVideo()
      displaySuccMsg()
      clearInput()
    })
    .catch(function(error) {
      console.log(error.message)
    })
  return true
}
// }
