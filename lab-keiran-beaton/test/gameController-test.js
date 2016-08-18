'use strict';

describe('Testing GameController', function() {
  beforeEach(() => {
    angular.mock.module('gameApp');
    angular.mock.inject(($controller) => {
      this.gameCtrl = $controller('GameController');
    });
  });
  beforeEach(() => {
    this.gameCtrl.history = [];
    this.gameCtrl.player = {name: 'keiran', room: 'roomD', count: 0};
  });

  it('the player should change rooms', () => {
    this.gameCtrl.chooseDirection('north');
    expect(this.gameCtrl.player.room).toBe('roomB');
  });

  it('the player should hit a wall', () => {
    this.gameCtrl.chooseDirection('east');
    expect(this.gameCtrl.player.room).toBe('roomD');
    expect(this.gameCtrl.history[0].text).toBe('keiran ran into a wall...');
  });

  it('the player should lose', () => {
    this.gameCtrl.roll = function() {
      return 3;
    };
    this.gameCtrl.chooseDirection('north');
    expect(this.gameCtrl.gameOver).toBe(true);
  });

  it('the player should enter an empty room', () => {
    this.gameCtrl.roll = function(){
      return 15;
    };
    this.gameCtrl.chooseDirection('north');
    expect(this.gameCtrl.history[0].text).toBe(this.gameCtrl.player.name + ' entered ' + this.gameCtrl.player.room + ', but it was empty...');
  });

  it('the player should find a black lectroid', () => {
    this.gameCtrl.roll = function() {
      return 50;
    };
    this.gameCtrl.chooseDirection('north');
    expect(this.gameCtrl.history[0].text).toBe(this.gameCtrl.player.name + ' entered ' + this.gameCtrl.player.room + ' and found a black lectroid! They have now saved ' + this.gameCtrl.player.count + ' of 6 black lectroids!');
    expect(this.gameCtrl.player.count).toBe(1);
  });
});
