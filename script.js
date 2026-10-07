const cards = [
	{
		pairId: 1,
		image: './pics/1.png',
	},
	{
		pairId: 2,
		image: './pics/2.png',
	},
	{
		pairId: 3,
		image: './pics/3.png',
	},
	{
		pairId: 4,
		image: './pics/4.png',
	},
	{
		pairId: 5,
		image: './pics/5.png',
	},
	{
		pairId: 6,
		image: './pics/6.png',
	},
	{
		pairId: 7,
		image: './pics/7.png',
	},
	{
		pairId: 8,
		image: './pics/8.png',
	},
]

let firstCard = null
let secondCard = null
let lockBoard = false

let movesCount = 0
let mathcedCount = 0

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

matched.classList.add('matchedContainer')
matchedP.classList.add('matchedP')
matchedSpan.classList.add('matchedSpan')

matchedP.textContent = 'Matched'
matchedSpan.textContent = `${mathcedCount} / 8`
matched.appendChild(matchedP)
matched.appendChild(matchedSpan)
resultContent.appendChild(matched)

const moves = document.createElement('div')
const movesP = document.createElement('p')
const movesSpan = document.createElement('span')
moves.classList.add('movesContainer')
movesP.classList.add('movesP')
movesSpan.classList.add('movesSpan')

movesP.textContent = 'Moves'
movesSpan.textContent = movesCount
moves.appendChild(movesP)
moves.appendChild(movesSpan)
resultContent.appendChild(moves)

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

const deck = [...cards, ...cards].sort(() => Math.random() - 0.5)
const stateCard = []

const cardContainer = document.createElement('div')
cardContainer.classList.add('cardContainer')
contentContainer.appendChild(cardContainer)

deck.forEach((cardData, index) => {
	const card = document.createElement('div')
	card.classList.add('card')

	card.dataset.id = index
	card.dataset.pair = cardData.pairId

	const img = document.createElement('img')
	img.src = cardData.image
	img.width = '70'
	img.height = '70'

	card.appendChild(img)
	cardContainer.appendChild(card)

	card.addEventListener('click', () => {
		openCard(card)
	})
	stateCard.push(card)
})

function openCard(card) {
	if (lockBoard) return

	if (card === firstCard) return

	if (card.classList.contains('matched')) return

	card.classList.add('open')

	if (!firstCard) {
		firstCard = card
		return
	}

	secondCard = card

	movesCount++
	movesSpan.textContent = movesCount

	checkMatch()
}

function checkMatch() {
	const isMatch = firstCard.dataset.pair === secondCard.dataset.pair

	if (isMatch) {
		firstCard.classList.add('matched')
		secondCard.classList.add('matched')

		mathcedCount++
		matchedSpan.textContent = `${mathcedCount} / 8`

		resetCards()

		if (mathcedCount === 8) {
			endGame()
		}
		return
	}
	lockBoard = true

	setTimeout(() => {
		firstCard.classList.remove('open')
		secondCard.classList.remove('open')

		resetCards()
	}, 1000)
}

function resetCards() {
	firstCard = null
	secondCard = null
	lockBoard = false
}

function newGame() {
	movesCount = 0
	mathcedCount = 0
	movesSpan.textContent = movesCount
	matchedSpan.textContent = `${mathcedCount} / 8`
	resetCards()
	deck.sort(() => Math.random() - 0.5)

	stateCard.forEach((card, index) => {
		const cardData = deck[index]

		card.dataset.pair = cardData.pairId

		const img = card.querySelector('img')
		img.src = cardData.image

		card.classList.remove('open')
		card.classList.remove('matched')
	})
}

newGameBtn.addEventListener('click', () => {
	newGame()
})

function endGame() {
	const modal = document.createElement('div')
	contentContainer.appendChild(modal)
	modal.classList.add('modal')

	const modalContent = document.createElement('div')
	modalContent.classList.add('modalContent')
	modal.appendChild(modalContent)

	const h2 = document.createElement('h2')
	h2.classList.add('h2')
	h2.textContent = 'Congratulations. You Win! 1000$'
	modalContent.appendChild(h2)

	const resultDiv = document.createElement('div')
	resultDiv.classList.add('resultDiv')
	modalContent.appendChild(resultDiv)
	const resultText = document.createElement('h2')
	resultText.classList.add('resultText')
	resultDiv.appendChild(resultText)
	resultText.textContent = 'Your Moves to Win:'
	const resultP = document.createElement('h2')
	resultP.classList.add('resultP')
	resultDiv.appendChild(resultP)
	resultP.textContent = movesCount

	const modalBtns = document.createElement('div')
	modalBtns.classList.add('modalBtns')
	modalContent.appendChild(modalBtns)

	const newGameModal = document.createElement('button')
	newGameModal.classList.add('newGameModal')
	modalBtns.appendChild(newGameModal)
	newGameModal.textContent = 'New Game'

	const closeBtn = document.createElement('button')
	closeBtn.classList.add('closeBtn')
	modalBtns.appendChild(closeBtn)
	closeBtn.textContent = 'Close'

	closeBtn.addEventListener('click', () => {
		closeModal(modal)
	})
	newGameModal.addEventListener('click', () => {
		closeModal(modal)
		newGame()
	})

	saveResult()
}

function saveResult() {
	const results = JSON.parse(localStorage.getItem('leaderboard')) || []

	results.push({
		moves: movesCount,
		date: new Date().toISOString(),
	})

	results.sort((a, b) => a.moves - b.moves)

	const top10 = results.slice(0, 10)

	localStorage.setItem('leaderboard', JSON.stringify(top10))
}

function showLeaderoard() {
	const modal = document.createElement('div')
	contentContainer.appendChild(modal)
	modal.classList.add('modal')

	const modalContent = document.createElement('div')
	modalContent.classList.add('modalContent')
	modal.appendChild(modalContent)

	const modalTitle = document.createElement('h2')
	modalTitle.classList.add('modalTitle')
	modalContent.appendChild(modalTitle)
	modalTitle.textContent = 'Leaderboards'

	const modalTable = document.createElement('div')
	modalTable.classList.add('modalTable')
	modalContent.appendChild(modalTable)

	const modalRank = document.createElement('span')
	modalRank.classList.add('modalRank')
	modalRank.textContent = 'RANK'
	modalTable.appendChild(modalRank)
	const modalMoves = document.createElement('span')
	modalMoves.classList.add('modalMoves')
	modalMoves.textContent = 'MOVES'
	modalTable.appendChild(modalMoves)
	const modalDate = document.createElement('span')
	modalDate.classList.add('modalDate')
	modalDate.textContent = 'DATE'
	modalTable.appendChild(modalDate)

	const notYet = document.createElement('h3')
	notYet.classList.add('notYet')
	modalContent.appendChild(notYet)
	notYet.textContent = 'Пока нет результатов'

	const results = JSON.parse(localStorage.getItem('leaderboard')) || []

	if (results.length === 0) {
		notYet.classList.add('active')
	}

	results.forEach((result, index) => {
		const modalLeaders = document.createElement('div')
		modalLeaders.classList.add('modalLeaders')
		modalContent.appendChild(modalLeaders)

		const modalLeadersR = document.createElement('span')
		modalLeadersR.classList.add('modalRank')
		modalLeadersR.textContent = `#${index + 1}`
		modalLeaders.appendChild(modalLeadersR)
		const modalLeadersM = document.createElement('span')
		modalLeadersM.classList.add('modalMoves')
		modalLeadersM.textContent = result.moves
		modalLeaders.appendChild(modalLeadersM)
		const modalLeadersD = document.createElement('span')
		modalLeadersD.classList.add('modalDate')
		modalLeadersD.textContent = new Date(result.date).toLocaleDateString()
		modalLeaders.appendChild(modalLeadersD)
	})

	const closeBtn = document.createElement('button')
	closeBtn.classList.add('modalClose')
	modalContent.appendChild(closeBtn)
	closeBtn.textContent = 'Close'

	closeBtn.addEventListener('click', () => {
		closeModal(modal)
	})
}

leadBtn.addEventListener('click', () => {
	showLeaderoard()
})

function closeModal(modal) {
	modal.remove()
}
