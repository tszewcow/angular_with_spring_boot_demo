describe('book list controller test', function () {
    'use strict';

    var $scope, booksDataMock = {
        deleteBook: jasmine.createSpy('spy').and.returnValue({then: angular.noop})
    }, modalMock = {};

    beforeEach(module('app.component1'));
    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        $controller('BookListController', {$scope: $scope, booksData: booksDataMock, $modal: modalMock, books: []});
    }));

    it('should set selectedBookIndex to undefined when it is defined', function () {
        //given
        $scope.selectedBookIndex = 3;
        // when
        $scope.selectBook(3);
        // then
        expect($scope.selectedBookIndex).toBeUndefined()
    });

    it('should set selectedBookIndex to selected index when it is undefined', function () {
        //given
        $scope.selectedBookIndex = undefined;
        // when
        $scope.selectBook(3);
        // then
        expect($scope.selectedBookIndex).toBe(3)
    });

    it('should call booksData.delete when delete button is clicked', function(){
       // given
        $scope.data = {
            books: [{id: 1}]
        };
        $scope.selectedBookIndex = 0;
       // when
        $scope.deleteBook();
        // then
        expect(booksDataMock.deleteBook).toHaveBeenCalledWith($scope.data.books[$scope.selectedBookIndex].id);

    });

});