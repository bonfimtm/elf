(function() {
    'use strict';

    angular.module('elf.view2', ['ui.router'])

    .config(function($stateProvider) {
        
        $stateProvider.state('app.view2', {
            url: '/view2',
            templateUrl: 'views/view2/view2.html'
        });
    })

    .controller('View2Ctrl', [function() {

    }]);
})();