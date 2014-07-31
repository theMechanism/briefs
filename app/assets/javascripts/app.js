window.App = angular.module('Briefs', ['ngResource', 'ngRoute', 'ngAnimate', 'xeditable', "ui.bootstrap"]);

window.App.config(function($routeProvider){
	$routeProvider
	.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'BriefsCtrl'
			})
	.when('/create', {
				templateUrl : 'pages/create.html',
				controller  : 'BriefsCtrl'
			})
	.when('/:id/view', {
				templateUrl : 'pages/view.html',
				controller  : 'BriefsCtrl'
			})

});
