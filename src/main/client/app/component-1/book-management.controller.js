'use strict';
angular.module('app.component1').controller('BookManagementController', function ($scope, booksData, $modal, books) {

    var refreshData = function () {
        booksData.getBooks().then(function (response) {
            angular.copy(response.data, $scope.data.books);
        });
    };

    $scope.data = {
        name: 'test',
        books: []
    };


    angular.copy(books.data, $scope.data.books);



    $scope.myForm = {};

    $scope.reset = function () {
        $scope.data.name = '';
    };


    $scope.selectRow = function ($index) {
        if (angular.isDefined($scope.selectedIndex)) {
            $scope.selectedIndex = undefined;
        }
        else {
            $scope.selectedIndex = $index;
        }
    };

    $scope.isRowSelected = function () {
        return angular.isDefined($scope.selectedIndex);
    };

    $scope.deleteBook = function () {
        booksData.deleteBook($scope.data.books[$scope.selectedIndex].id).then(function () {
            refreshData();
        });
    };

    $scope.addBook = function () {
        $modal.open({
            templateUrl: 'component-1/add-book/add-book.tpl.html',
            controller: 'AddBookController',
            size: 'lg'
        }).result.then(function (response) {
                booksData.createBook(response).then(refreshData);
            });
    };

    $scope.editBook = function () {
        $modal.open({
            templateUrl: 'component-1/edit-book/edit-book.tpl.html',
            controller: 'EditBookController',
            size: 'lg',
            resolve: {
                bookToBeEdited: function () {
                    return $scope.data.books[$scope.selectedIndex];
                }
            }
        }).result.then(function (response) {
                booksData.updateBook(response).then(refreshData);
            });
    };

}).factory('booksData', function ($http) {

    return {
        getBooks: function () {
            return $http.get('http://localhost:9000/services/books');
        },
        deleteBook: function (id) {
            return $http.delete('http://localhost:9000/services/book', {params: {
                id: id
            }})
        },
        createBook: function (book) {
            return $http.post('http://localhost:9000/services/book', book);
        },
        updateBook: function(book){
            return $http.put('http://localhost:9000/services/book', book);
        }
    };

}).controller('AddBookController', function ($scope, $modalInstance) {

    $scope.bookData = {
        version: 0
    };

    $scope.add = function () {
        $modalInstance.close($scope.bookData);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

}).controller('EditBookController', function ($scope, $modalInstance, bookToBeEdited) {


    $scope.bookData = {};

    angular.copy(bookToBeEdited, $scope.bookData);

    $scope.edit = function () {
        $modalInstance.close($scope.bookData);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

});