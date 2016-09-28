(function() {
    'use strict';

    angular.module('elf.view1', ['ui.router'])

    .config(function($stateProvider) {
        
        $stateProvider.state('main.view1', {
            url: '/view1',
            templateUrl: 'views/view1/view1.html'
        });
    })

    .controller('View1Ctrl', [function() {

    }]);
})();