const wrapper = document.createElement('div')
document.body.appendChild(wrapper)
wrapper.classList.add('wrapper')

const contentContainer = document.createElement('div')
contentContainer.classList.add('contentContainer')
wrapper.appendChild(contentContainer)

const headerContainer = document.createElement('div')
headerContainer.classList.add('headerContainer')
contentContainer.appendChild(headerContainer)

const logo = document.createElement('div')
logo.classList.add('logo')
headerContainer.appendChild(logo)

const h1 = document.createElement('h1')
h1.classList.add('h1')
logo.appendChild(h1)
h1.textContent = 'Memory Game'

const logoBtns = document.createElement('div')
logoBtns.classList.add('logoBtns')
headerContainer.appendChild(logoBtns)

const leadBtn = document.createElement('button')
const newGameBtn = document.createElement('button')
leadBtn.classList.add('leadBtn')
newGameBtn.classList.add('newGameBtn')
logoBtns.appendChild(leadBtn)
logoBtns.appendChild(newGameBtn)

leadBtn.textContent = 'Leaderboards'
newGameBtn.textContent = 'New Game'

const resultContent = document.createElement('div')
resultContent.classList.add('resultContent')
contentContainer.appendChild(resultContent)

const matched = document.createElement('div')
const matchedP = document.createElement('p')
const matchedSpan = document.createElement('span')

matched.classList.add('mathcedContainer')
matchedP.classList.add('matchedP')
matchedSpan.classList.add('matchedSpan')

resultContent.appendChild(matched)
matched.appendChild(matchedP)
matched.appendChild(matchedSpan)

matchedP.textContent = 'MATCHED'
matchedSpan.textContent = '0 / 8'

const moves = document.createElement('div')
const movesP = document.createElement('p')
const movesSpan = document.createElement('span')
moves.classList.add('movesContainer')
movesP.classList.add('movesP')
movesSpan.classList.add('movesSpan')

resultContent.appendChild(moves)
moves.appendChild(movesP)
moves.appendChild(movesSpan)
movesP.textContent = 'Moves'
movesSpan.textContent = '0'

const time = document.createElement('div')
const timeP = document.createElement('p')
const timeSpan = document.createElement('span')

time.classList.add('timeContainer')
timeP.classList.add('timeP')
timeSpan.classList.add('timeSpan')

resultContent.appendChild(time)
time.appendChild(timeP)
time.appendChild(timeSpan)
timeP.textContent = 'Time'
timeSpan.textContent = '00:00'
