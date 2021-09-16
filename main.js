const cards = document.querySelectorAll('.card')
let hasFlippedCard = false
let firstcard, secondCard
let lockBoard = false

function flipCard() {
  if (lockBoard) return
  if (this === firstcard) return

  this.classList.add('flip')
  if (!hasFlippedCard) {
    hasFlippedCard = true
    firstcard = this
    return
  }

  secondCard = this
  hasFlippedCard = false
  checkForMatch()
}

function checkForMatch() {
  if (firstcard.dataset.card === secondCard.dataset.card) {
    disableCards()
    return
  }

  unflipCards()
}

function disableCards() {
  firstcard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)

  resetBoard()
}

function unflipCards() {
  lockBoard = true

  setTimeout(() => {
    firstcard.classList.remove('flip')
    secondCard.classList.remove('flip')

    resetBoard()
  }, 1000)
}

function resetBoard() {
  ;[hasFlippedCard, lockBoard] = [false, false][(firstcard, secondCard)] = [
    null,
    null
  ]
}

;(function shufled() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 12)
    card.style.order = randomPosition
  })
})()

cards.forEach(card => {
  card.addEventListener('click', flipCard)
})
