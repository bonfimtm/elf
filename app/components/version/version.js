(function() {
    'use strict';

    angular.module('elf.version', [
        'elf.version.interpolate-filter',
        'elf.version.version-directive'
    ])

    .value('version', '0.0.1');
})();