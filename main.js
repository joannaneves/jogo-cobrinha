function start() {
  $('.btn').hide()

  let canvas = document.getElementById('snake')
  let context = canvas.getContext('2d')
  let box = 32 // tamanho do quadrado
  let grid = 16
  let time = 200
  let pressedDirection = 0

  gameover = new Image()
  gameover.src = 'gameover.png'

  let snake = []

  snake[0] = {
    x: 8 * box,
    y: 8 * box
  }

  let direction = 'right'

  function randomfood() {
    let match = 1
    let food

    while (match == 1) {
      match = 0
      food = {
        // Math.floor(x) = retorna o menor número inteiro dentre o número "x"
        // exemplo: Math.floor(45.95) retorna 45, enquanto Math.floor(-45.95) retorna -46.
        // Math.random() = retorna um número pseudo-aleatório no intervalo [0, 1[
        x: Math.floor(Math.random() * (grid - 1) + 1) * box,
        y: Math.floor(Math.random() * (grid - 1) + 1) * box
      }
      for (i = 0; i < snake.length; i++) {
        if (food.x == snake[i].x && food.y == snake[i].y) {
          match = 1
        }
      }
    }

    return food
  }

  function criarBG() {
    // background
    context.fillStyle = '#74C54C'
    context.fillRect(0, 0, grid * box, grid * box)
  }

  function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
      context.fillStyle = 'darkgreen'
      context.fillRect(snake[i].x, snake[i].y, box, box)
    }
  }

  let food = randomfood()

  function criarComida() {
    context.fillStyle = 'darkgreen'
    context.fillRect(snake[0].x, snake[0].y, box, box)
    context.fillStyle = 'red'
    context.fillRect(food.x, food.y, box, box)
  }

  document.addEventListener('keydown', update) // quando um evento acontece, detecta e chama uma função

  function update(event) {
    if (pressedDirection == 0) {
      if (event.keyCode == 37 && direction != 'right') {
        direction = 'left'
        pressedDirection = 1
      }
      if (event.keyCode == 38 && direction != 'down') {
        direction = 'up'
        pressedDirection = 1
      }
      if (event.keyCode == 39 && direction != 'left') {
        direction = 'right'
        pressedDirection = 1
      }
      if (event.keyCode == 40 && direction != 'up') {
        direction = 'down'
        pressedDirection = 1
      }
    }
  }

  function iniciarJogo() {
    if (snake[0].x > (grid - 1) * box) snake[0].x = 0
    if (snake[0].x < 0) snake[0].x = (grid - 1) * box
    if (snake[0].y > (grid - 1) * box) snake[0].y = 0
    if (snake[0].y < 0) snake[0].y = (grid - 1) * box

    criarBG()
    criarCobrinha()
    criarComida()

    for (i = 1; i < snake.length; i++) {
      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
        time = 0
        context.drawImage(gameover, 0, 0)
        $('.btn').show()
      }
    }

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (direction == 'right') snakeX += box
    if (direction == 'left') snakeX -= box
    if (direction == 'up') snakeY -= box
    if (direction == 'down') snakeY += box
    pressedDirection = 0

    if (snakeX != food.x || snakeY != food.y) {
      snake.pop() // retira o �ltimo elemento
    } else {
      food.x = Math.floor(Math.random() * 15 + 1) * box
      food.y = Math.floor(Math.random() * 15 + 1) * box
      if (time > 80) {
        time -= 10
      }
    }

    let newHead = {
      x: snakeX,
      y: snakeY
    }

    snake.unshift(newHead) // incrementa um novo elemento no começo

    if (time != 0) setTimeout(loop, time)
  }

  function loop() {
    iniciarJogo()
  }

  setTimeout(loop, time)
}
