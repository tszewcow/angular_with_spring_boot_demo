describe('books management controller tests', function () {
    'use strict';

    var $scope, modalMock = {}, booksDataMock = {}, booksMock = {};

    beforeEach(module('app.component1'));
    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        $controller('BookManagementController', {$scope: $scope, $modal: modalMock, books: booksMock, booksData: booksDataMock})
    }));


    it('should return something on something', function () {
        // given
        var a = 4;
        var b = 4;

        // when

        // then
        expect(a).toBe(b);
    });

    it('should select a new row index value when it is undefined', function () {
        // given
        var newIndex = 5;
        $scope.selectedIndex = undefined;
        // when
        $scope.selectRow(newIndex);
        // then
        expect($scope.selectedIndex).toBe(newIndex);
    });

    it('it should delete selected row index when it is clicked two times', function () {
        // given
        $scope.selectedIndex = 5;
        // when
        $scope.selectRow(5);
        // then
        expect($scope.selectedIndex).toBeUndefined();
    });

});