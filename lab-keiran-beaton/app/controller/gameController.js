'use strict';

const angular = require('angular');
const gameApp = angular.module('gameApp');

gameApp.controller('GameController', ['$log', GameController]);

function GameController($log) {
  this.player = {name: 'Buckaroo Bonzai and the Hong Kong Cavaliers', room: 'roomC', count: 0};
  this.history = [{id: 0, text: this.player.name + ' has begun a new adventure.'}];
  $log.debug('gameCtrl.moveDirection');
  this.directions = ['north', 'south', 'east', 'west'];
  this.gameOver = false;
  this.fightOrFlight = false;

  this.map = require('../lib/map.js');

  this.logHistory = function(string) {
    this.history.push({id:this.history.length, text: string});
  };

  this.chooseDirection = function(direction) {
    if(this.map[this.player.room]) {
      let currentRoom = this.map[this.player.room];
      let nextRoom = currentRoom[direction];
      if (nextRoom !== 'wall') {
        this.player.room = nextRoom;
        let roll = (Math.random() * 100);
        if (roll < 10) {
          this.logHistory(this.player.name + ' entered a new room. There was a bear in the room and it mauled him to death. Game Over.');
          return;
        }
        if (10 <= roll < 50) {
          this.logHistory(this.player.name + ' entered ' + this.player.room + ', but it was empty...');
          return;
        }
        if (50 <= roll < 90) {
          this.player.count += 1;
          if (this.player.count >= 6) {
            this.gameOver = true;
            this.logHistory('Congratulations! ' + this.player.name + ' entered ' + this.player.room + ' and rescued the last black lectroid, and put a stop to Dr. Emilio Lizardo(played by a young John Lithgow)!');
            return;
          }
          this.logHistory(this.player.name + ' entered ' + this.player.room + ' and found a black lectroid! They have now saved ' + this.count + ' of 6 black lectroids!');
        }
        if ( roll >= 90) {
          this.logHistory(this.player.name + ' entered ' + this.player.room + ' and was attacked by a Red Lectroid! Will ' + this.player.name + ' fight the Red Lectroid, or try to run?');
          this.fightOrFlight = true;
          return;
        }
      }
      this.logHistory(this.player.name + ' ran into a wall...');
    }
  };
  this.fight = function() {
    let saveRoll = (Math.random() * 100);
    if (saveRoll < 50) {
      this.gameOver = true;
      this.logHistory(this.player.name + ' fought the red lectroid, but sadly, it shot and killed them. Game Over...');
      this.fightOrFlight = false;
      return;
    }
    if (saveRoll >= 50) {
      this.player.count +=1;
      if (this.player.count >= 6) {
        this.gameOver = true;
        this.logHistory('Congratulations! ' + this.player.name + ' defeated the red lectroid and sent it back to the 8th dimension. The last black lectroid was hiding in the room and was rescued. ' + this.player.name + ' put a stop to Dr. Emilio Lizardo(played by a young John Lithgow)!');
        this.fightOrFlight = false;
        return;
      }
      this.logHistory(this.player.name + ' fought the red lectroid, and sent it back to the 8th Dimension. A black lectroid hiding in the room was rescued. ' + this.player.name + ' has now saved ' + this.player.count + ' of 6 black lectroids!');
    }
  };
  this.flight = function() {
    let saveRoll = (Math.random() * 100);
    if (saveRoll <= 20) {
      this.gameOver = true;
      this.logHistory(this.player.name + ' tried to run but the red lectroid was too fast and killed them. Game Over....');
      this.fightOrFlight = false;
      return;
    }
    if (saveRoll > 20) {
      this.logHistory(this.player.name + ' fled, and lived to fight another day.');
      this.fightOrFlight = false;
      return;
    }
  };
}
