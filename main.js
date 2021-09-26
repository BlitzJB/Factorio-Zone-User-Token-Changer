// ==UserScript==
// @name         Factorio Zone Token Setter UI
// @version      0.1
// @description  tool to change the saved token in factorio zone
// @author       Blitz#1928
// @match        https://factorio.zone/
// ==/UserScript==

(function() {
  'use strict';

  const on_mount = () => {
    const info_box = document.querySelector('.info')
    let div = document.createElement('div')
    div.setAttribute('id', 'tokens_box')
    div.setAttribute('class', 'control-item control-label')
    div.innerHTML = '<button id="reveal_token"> Reveal Token </button>'
    info_box.appendChild(div)

    const reveal_button = document.querySelector('#reveal_token')
    reveal_button.addEventListener('click', () => {
      on_reveal()
    })
  }

  const reveal_token_box = () => {
    let saved_tokens = localStorage.savedTokens || '["Empty"]'
    saved_tokens = JSON.parse(saved_tokens)

    let savedtokens_selector = ''
    saved_tokens.forEach((token) => {savedtokens_selector += `<option value="${token}">${token}</option>`})
    savedtokens_selector = `<select id="saved_token">${savedtokens_selector}</select>`

    const tokens_box = document.querySelector('#tokens_box')
    tokens_box.innerHTML = `<p>Your token: ${localStorage.userToken}</p>${savedtokens_selector}<button id="select_token" class="pure-button">Select token</button><br/><input id="token_input"><button id="add_token" class="pure-button">Add and select token</button>`
  }

  const on_reveal = () => {
    reveal_token_box()

    const add_token_button = document.querySelector('#add_token')
    const token_input = document.querySelector('#token_input')
    add_token_button.addEventListener('click', () => {
      const value = token_input.value
      add_token(trim(value))
      document.location.reload()
      token_input.value =' Added!'
    })
    
    const select_token_button = document.querySelector('#select_token')
    const selected_token = document.querySelector('#saved_token')
    select_token_button.addEventListener('click', () => {
      const value = selected_token.value
      set_token(value)
      document.location.reload()
      select_token_button.innerHTML = `Selected ${value}`
    })
  }

  const add_token = (token) => {
    if (!token) {return}
    if (localStorage.savedTokens) {
      let tokens = JSON.parse(localStorage.savedTokens)
      tokens.push(token)
      localStorage.savedTokens = JSON.stringify(tokens)
    } else {
      localStorage.savedTokens = JSON.stringify([token])
    }
    set_token(token)
  }

  const set_token = (token) => {
    if ( JSON.parse(localStorage.savedTokens).includes(localStorage.userToken) ) {
      localStorage.userToken = token
    } else {
      let tokens = JSON.parse(localStorage.savedTokens) || [,,]
      tokens.push(localStorage.userToken)
      localStorage.savedTokens = JSON.stringify(tokens)
      localStorage.userToken = token
    }
  }

  on_mount()

  const trim = (token) => {
    return token.replace(/^\s+|\s+$/g, "")
  }

})();


