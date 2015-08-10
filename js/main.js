
$(document).on('ready', function(){

  var Player = function(team, score) {
    this.team = team;
    this.cells = [];
    this.score = score || 0;
  };

  var Board = function() {
    this.$cells = $('.box');
    this.winConditions = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
  };

  var Game = function() {
    // this.turnCounter = 1;
    this.player1;
    this.player2;
    this.board;
    this.currentPlayer;
  };
  Game.prototype.nextPlayer = function() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
      return this.currentPlayer;
    } else {
      this.currentPlayer = this.player1;
      return this.currentPlayer;
    }
  };
  Game.prototype.init = function(player1, player2) {
    if (player1 && player2) {
      this.player1 = new Player('X', player1.score);
      this.player2 = new Player('O', player2.score);
    } else {
      this.player1 = new Player('X');
      this.player2 = new Player('O');
    }
    // this.player1.cells = [];
    // this.player2.cells = [];

    this.currentPlayer = this.player1;
    this.board = new Board();
    this.board.$cells.empty();
    this.board.$cells.off();
    this.board.$cells.one('click', function(){
      // console.log(e);
      console.log(game);
      game.makeMove(game.currentPlayer, this.id);

    });
    $('.player1').html(" Player X : " + this.player1.score);
    $('.player2').html(" Player O : " + this.player2.score);
    $('#your-turn').html("Player " + this.currentPlayer.team)

    // console.log(this.currentPlayer);
    // console.log(this.player1.cells);
    // console.log(this.player2.cells);
    // console.log(game)
  };

  Game.prototype.checkWinner = function() {
    for (var i = 0; i < this.board.winConditions.length; i++) {
      if (this.currentPlayer.cells.indexOf(this.board.winConditions[i][0]) !== -1 &&
          this.currentPlayer.cells.indexOf(this.board.winConditions[i][1]) !== -1 &&
          this.currentPlayer.cells.indexOf(this.board.winConditions[i][2]) !== -1) {
            this.currentPlayer.score++;
            return this.currentPlayer;
          }
    }
    return null;
  }

  Game.prototype.makeMove = function(player, cell) {
    player.cells.push(parseInt(cell));
    $('#'+cell).html(player.team);
    // console.log(player.cells);
    // console.log(game.checkWinner());

    if (this.checkWinner()) {
      alert("Winner, Player " + player.team)
      // var play1 = this.player1
      // var play2 = this.player2
      // game = new Game()
      return this.init(this.player1, this.player2);

    } else {
      $('#your-turn').html("Player " + this.nextPlayer().team);
    }
  };

  var game = new Game();
  game.init();
});
