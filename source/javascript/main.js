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

const shakeTime = 100 // Shake Transition Time
//shake it when it's wrong input
var modalContainer = document.querySelector('#modal-custom')
function transform(x, y) {
  modalContainer.style.transform = `translate(${x}px, ${y}px)`
}

function repeatShake() {
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0)
    setTimeout(transform, shakeTime * 6, 0, 0)
  }
}

//form Area

const nextButton = document.querySelector('.right__icon')
const prevButton = document.querySelector('.left__icon')
const showInput = document.getElementById('showInput')
const email = document.getElementById('email')
const submitBtn = document.getElementById('submitBtn')

function displayForm() {
  email.style.opacity = '0'
  document.querySelector('.modal__content').style.height = '420px'
  setTimeout(function() {
    showInput.style.opacity = '1'
    prevButton.style.opacity = '1'
    nextButton.style.opacity = '0'
  }, 200)
}

function hideForm() {
  showInput.style.opacity = '0'
  nextButton.style.opacity = '1'
  email.style.opacity = '1'
  prevButton.style.opacity = '0'
  nextButton.style.top = '-105px'
  document.querySelector('.modal__content').style.height = '200px'
}

function showEmail() {
  document.getElementById('first').value = ''
  document.getElementById('last').value = ''
  document.querySelector('.modal__content').style.height = '200px'
  showInput.style.opacity = '0'
  email.style.opacity = '1'
  prevButton.style.opacity = '0'
  nextButton.style.opacity = '1'
  nextButton.addEventListener('click', validateForm)
}

prevButton.addEventListener('click', showEmail)

hideForm()

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
        // document.getElementById('emailForm').focus()
        setTimeout(function() {
          printError('emailErr', '')
        }, 4000)
      } else {
        nextButton.removeEventListener('click', validateForm)
        nextButton.style.opacity = '0'
        displayForm()
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
    displayForm()
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

//submit form
const formOnSubmit = document.querySelector('.c-form')
formOnSubmit.addEventListener('submit', validateForm)

nextButton.addEventListener('click', validateForm)

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
    const div = document.getElementById('message')
    div.classList.remove('hide-msg')
    div.classList.add('show-msg')
    hideForm()
    email.style.opacity = '1'
    nextButton.addEventListener('click', validateForm)
    div.innerHTML = 'Bedankt voor uw aanmelding!🎉'
    setTimeout(function() {
      div.classList.remove('show-msg')
      div.innerHTML = ''
    }, 10000)
  }

  function displayError(output) {
    modalIsShowing.style.opacity = '1'
    const div = document.getElementById('message')
    div.classList.remove('hide-msg')
    div.classList.add('error-msg')
    div.innerHTML = 'Could not reach the API ' + output
    setTimeout(function() {
      div.classList.remove('error-msg')
      div.innerHTML = ''
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
