angular.module('app', ['ngRoute',  'app.main', 'app.component1', 'app.component2', 'ui.bootstrap'])
    .config(function ($locationProvider) {
        'use strict';
        $locationProvider.html5Mode(false);
    });
