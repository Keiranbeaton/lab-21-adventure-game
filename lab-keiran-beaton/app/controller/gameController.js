'use strict';

const angular = require('angular');
const gameApp = angular.module('gameApp');

gameApp.controller('GameController', [GameController]);

function GameController() {
  this.player = {name: 'Buckaroo Bonzai and the Hong Kong Cavaliers', room: 'roomC'};
  this.history = [{id: 0, text: this.player.name + ' has begun a new adventure.'}];
  this.directions = ['north', 'south', 'east', 'west'];
  this.gameOver = false;

  this.map = require('../lib/map');

  this.logHistory = function(string) {
    this.history.push({id:this.history.length, text: string});
  };

  this.chooseDirection = function(direction) {
    if(this.map[this.player.room]) {
      let currentRoom = this.player.room;
      let nextRoom = currentRoom[direction];
      let count = 0;
      if (nextRoom !== 'wall') {
        this.player.room = nextRoom;
        let roll = (Math.random() * 100);
        if (roll < 10) {
          this.logHistory(this.player.name + ' entered a new room. There was a bear in the room and it mauled him to death. Game Over.');
        }
        if (10 <= roll < 50) {
          this.logHistory(this.player.name + ' entered ' + this.player.room + ', but it was empty...');
        }
        if (50 <= roll < 90) {
          count += 1;
          if (count >= 4) {
            this.gameOver = true;
            this.logHistory('Congratulations! ' + this.player.name + ' entered ' + this.player.room + ' and rescued the last black lectroid, and put a stop to Dr. Emilio Lizardo(played by a young John Lithgow)!');
            return;
          }
          this.logHistory(this.player.name + ' entered ' + this.player.room + ' and found a black lectroid! They have now saved ' + count + ' of  4 black lectroids!');
        }
        if ( roll >= 90) {
          this.gameOver = true;
          this.logHistory(this.player.name + ' entered ' + this.player.room + ' and found a red lectroid, which promptly shot and killed them. Game Over...');
        }
      }
      this.logHistory(this.player.name + ' ran into a wall...');
    }
  };
}
