'use strict';

require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

const angular = require('angular');
const gameApp = angular.module('gameApp', []);

require('./controller/gameController.js');
