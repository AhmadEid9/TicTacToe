const cell_elements = document.querySelectorAll('[data-cell]')
const x_class = 'x'
const circle_class = 'circle'
const wining_combos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6]
]
let circle_turn = false
const first_player_name = document.getElementById("first_player_input")
let first_player_label = document.getElementById("first_player_label")
let first_player_score = 0

const second_player_name = document.getElementById("second_player_input")
let second_player_label = document.getElementById("second_player_label")
let second_player_score = 0

let board = document.getElementById("board")
const game_btn = document.getElementById("game_started")
let winning_message = document.getElementById("winning-message")

game_btn.addEventListener("click", startGame)

function startGame(e) {
    first_player_label.innerText = first_player_name.value + " " + first_player_score
    second_player_label.innerText = second_player_name.value + " " + second_player_score
    cell_elements.forEach( cell => {
        cell.classList.remove("no-action")
        cell.classList.remove(x_class, circle_class)
    });
    
    board.classList.remove(x_class, circle_class)
    board.classList.add(x_class)
}


cell_elements.forEach( cell => {
    cell.addEventListener('click', handleClick)
});



function handleClick(e) {
    const cell = e.target
    const current_turn = circle_turn ? circle_class : x_class
    placeMark(cell, current_turn)
    swapTurns()
    board.classList.remove(x_class, circle_class)
    board.classList.add(circle_turn ? circle_class : x_class)
    
    if (checkWin(current_turn)) {
        winning_message.innerText = current_turn + " wins the macth"
        circle_turn ?  first_player_score++ : second_player_score++
        first_player_label.innerText = first_player_name.value + " " + first_player_score
        second_player_label.innerText = second_player_name.value + " " + second_player_score
        endGame()
    } else{
        if (checkDraw()) {
            winning_message.innerText = "No one won the match"
            endGame()
        }
    }
}

function placeMark(cell, current_turn) {
    cell.classList.add(current_turn)
}

function swapTurns() {
        circle_turn = !circle_turn
}

function checkWin(current_turn) {
    return wining_combos.some(combos => {
        return combos.every( index => {
            return cell_elements[index].classList.contains(current_turn)
        })
    })
}

function checkDraw() {
    return [...cell_elements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
        })
    }

function endGame(draw) {
    cell_elements.forEach( cell => {
        cell.classList.remove(x_class, circle_class)
    });
    board.classList.remove(x_class, circle_class)
}

