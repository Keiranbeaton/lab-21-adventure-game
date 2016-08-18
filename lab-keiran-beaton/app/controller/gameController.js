'use strict';

const angular = require('angular');
const gameApp = angular.module('gameApp');

gameApp.controller('GameController', [GameController]);

function GameController() {
  this.player = {
    name: 'Buckaroo Bonzai',
    room: 'roomC'
  };
  this.history = [{id: 0, text: this.player.name + ' has begun a new adventure.'}];
  this.logHistory = function(string) {
    this.history.push({id:this.history.length, text: string});
  };
  this.directions = ['north', 'south', 'east', 'west'];
  this.map = require('../lib/map');
  this.chooseDirection = function(direction) {
    if(this.map[this.player.room]) {
      let currentRoom = this.player.room;
      let nextRoom = currentRoom[direction];
      let gameOver = false;
      if (nextRoom !== 'wall') {
        this.player.room = nextRoom;
        let roll = (Math.random() * 100);
        if (roll < 10) {
          this.logHistory(this.player.name + ' entered a new room. There was a bear in the room and it mauled him to death. Game Over.');
        }
        if (10 <= roll <= 50) {
          this.logHistory(this.player.name )
        }
      }
    }
  };
}
