const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']
const values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
const suits = ['Spade', 'Heart', 'Clubs', 'Diamond']
const deck = []
const dealerHand = []
const playerOneHand = []

let playerOneTotal = 0
let dealerTotal = 0

class Card {
  constructor(rank, suit, value) {
    this.rank = rank
    this.suit = suit
    this.value = value
  }
}

const startGame = () => {
  makeADeck()
  shuffleDeck()
  deal()
  valueOfPlayerOneHand()
  valueOfDealerHand()
  document.querySelector('.player-one-win').textContent = playerOneTotal
  document.querySelector('.dealer-total').textContent = dealerTotal
}

const makeADeck = () => {
  suits.forEach(suit => {
    ranks.forEach((rank, index) => {
      const value = values[index]
      deck.push(new Card(rank, suit, value))
    })
  })
}

const shuffleDeck = () => {
  for (let i = deck.length - 1; i >= 0; i--) {
    const rando = Math.floor(Math.random() * i)
    const temp = deck[rando]
    deck[rando] = deck[i]
    deck[i] = temp
  }
}

const deal = () => {
  for (let d = 0; d < 2; d++) {
    const playerCard = deck.shift()
    playerOneHand.unshift(playerCard)
    const dealerCard = deck.shift()
    dealerHand.unshift(dealerCard)
    // document.querySelector('.player-one-win').textContent = playerOneHand
    // document.querySelector('.dealer-total').textContent = dealerHand
  }
  // console.log(playerOneHand)
  // console.log(dealerHand)
}

const hitMe = () => {
  for (let d = 0; d < 1; d++) {
    const dealtCard = deck.shift()
    playerOneHand.unshift(dealtCard)
  }
  valueOfPlayerOneHand()
  if (playerOneTotal > 21) {
    document.querySelector('.did-you-win').textContent = 'Bust!'
    document.querySelector('.reset').classList.remove('hide-me')
    document.querySelector('.hit-me').disabled = true
    document.querySelector('.stand').disabled = true
    document.querySelector('.start').disabled = true
  }
  valueOfPlayerOneHand()
  document.querySelector('.player-one-win').textContent = playerOneTotal
}

const valueOfPlayerOneHand = () => {
  playerOneTotal = 0
  for (let v = playerOneHand.length - 1; v >= 0; v--) {
    const Card = playerOneHand[v]
    playerOneTotal += Card.value
  }
  if (playerOneTotal > 21) {
    document.querySelector('.player-one-win').textContent = 'Bust!'
    document.querySelector('.reset').classList.remove('hide-me')
    document.querySelector('.hit-me').disabled = true
    document.querySelector('.stand').disabled = true
    document.querySelector('.start').disabled = true
  }
}

const valueOfDealerHand = () => {
  dealerTotal = 0
  for (let d = dealerHand.length - 1; d >= 0; d--) {
    const Card = dealerHand[d]
    dealerTotal += Card.value
  }
}

const gameEnd = () => {
  // valueOfDealerHand()
  // document.querySelector('.dealer-total').textContent = dealerTotal
  // valueOfPlayerOneHand()
  // document.querySelector('.player-one-win').textContent = playerOneTotal
  if (dealerTotal === 21) {
    document.querySelector('.did-dealer-win').textContent = 'Dealer Wins'
    document.querySelector('.did-you-win').textContent = 'Player One Loses!'
  } else if (dealerTotal > 21) {
    document.querySelector('.did-dealer-win').textContent = 'Dealer Bust, Player One Wins'
    document.querySelector('.did-you-win').textContent = 'House Busted, Player One Wins'
  } else if (dealerTotal === 21 && playerOneTotal === 21) {
    document.querySelector('.did-you-win').textContent = 'Player One Wins!'
    document.querySelector('.did-dealer-win').textContent = 'Dealer Loses'
  } else if (playerOneTotal === 21) {
    document.querySelector('.did-you-win').textContent = 'Player One Wins!'
    document.querySelector('.did-dealer-win').textContent = 'Dealer Loses'
  } else if (playerOneTotal > 21) {
    document.querySelector('.did-you-win').textContent = 'Busted, Player One Wins'
    document.querySelector('dealer-total').textContent = 'Player One Busted, Dealer Wins'
  } else if (dealerTotal >= 12 && playerOneTotal > dealerTotal && playerOneTotal < 21) {
    document.querySelector('.did-you-win').textContent = 'Player One Wins'
    document.querySelector('.did-dealer-win').textContent = 'Dealer Loses'
  } else if (dealerTotal >= 12 && playerOneTotal < dealerTotal && playerOneTotal < 21) {
    document.querySelector('.did-dealer-win').textContent = 'Dealer Wins'
    document.querySelector('.did-you-win').textContent = 'Dealer Wins'
  } else if (dealerTotal >= 12 && playerOneTotal === dealerTotal && playerOneTotal < 21) {
    document.querySelector('.did-dealer-win').textContent = 'Push -- No Winner'
    document.querySelector('.did-you-win').textContent = 'Push -- No Winner'
  }
  document.querySelector('.reset').classList.remove('hide-me')
  document.querySelector('.hit-me').disabled = true
  document.querySelector('.stand').disabled = true
  document.querySelector('.start').disabled = true
}

const hitDealer = () => {
  if (dealerTotal <= 16) {
    const dealtCard = deck.shift()
    dealerHand.unshift(dealtCard)
  }
  document.querySelector('.dealer-total').textContent = dealerTotal
  gameEnd()
  console.log(dealerHand)
}

const resetButton = () => {
  document.querySelector('.reset').classList.add('hide-me')
  document.querySelector('.hit-me').disabled = false
  document.querySelector('.stand').disabled = false
  document.querySelector('.start').disabled = false
  // const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']
  // const values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
  // const suits = ['Spade', 'Heart', 'Clubs', 'Diamond']
  let playerOneTotal = 0
  let dealerTotal = 0
  // startGame()
  document.querySelector('.player-one-win').textContent = playerOneTotal
  document.querySelector('.dealer-total').textContent = dealerTotal
}

document
  .querySelector('.start')
  .addEventListener('click', startGame)
document
  .querySelector('.stand')
  .addEventListener('click', hitDealer)
document
  .querySelector('.hit-me')
  .addEventListener('click', hitMe)
document
  .querySelector('.reset')
  .addEventListener('click', resetButton)