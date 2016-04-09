'use strict';
angular.module('app.component1').controller('BookListController', function ($scope, booksData, $modal, books) {

    $scope.data = {
        books: []
    };

    angular.copy(books, $scope.data.books);

    $scope.selectBook = function (index) {
        if (angular.isUndefined($scope.selectedBookIndex)) {
            $scope.selectedBookIndex = index;
        }
        else {
            $scope.selectedBookIndex = undefined;
        }
    };

    $scope.isButtonDisabled = function () {
        return angular.isUndefined($scope.selectedBookIndex);
    };

    $scope.deleteBook = function () {
        booksData.deleteBook($scope.data.books[$scope.selectedBookIndex].id).then(function () {
            booksData.getBooks().then(function (response) {
                angular.copy(response.data, $scope.data.books);
            });
        });
    };

    $scope.addBook = function () {
        $modal.open({
            templateUrl: 'component-1/create-book/create-book.tpl.html',
            controller: 'CreateBookController',
            size: 'lg'
        }).result.then(function (result) {
                booksData.addBook(result).then(function(){
                    booksData.getBooks().then(function (response) {
                        angular.copy(response.data, $scope.data.books);
                    });
                });
            });
    };

    $scope.editBook = function () {
        $modal.open({
            templateUrl: 'component-1/edit-book/edit-book.tpl.html',
            controller: 'EditBookController',
            size: 'lg',
            resolve: {
                book: function(){
                    return $scope.data.books[$scope.selectedBookIndex];
                }
            }
        }).result.then(function(result){
                booksData.editBook(result).then(function(){
                    booksData.getBooks().then(function (response) {
                        angular.copy(response.data, $scope.data.books);
                    });
                });
            });
    };

}).factory('booksData', function ($http) {

    return {
        getBooks: function () {
            return $http.get('http://localhost:9000/services/books');
        },
        deleteBook: function (id) {
            return $http.delete('http://localhost:9000/services/book', {params: {id: id}});
        },
        addBook: function(book){
            return $http.post('http://localhost:9000/services/book', book);
        },
        editBook: function(book){
            return $http.put('http://localhost:9000/services/book', book);
        }
    }
}).controller('CreateBookController', function ($scope, $modalInstance) {

    $scope.book = {
        version: 0
    };
    $scope.form = {
        myForm: {}
    };

    $scope.ok = function () {
        $modalInstance.close($scope.book);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

}).controller('EditBookController', function ($scope, $modalInstance, book) {

    $scope.book = {};

    $scope.form = {
        myForm: {}
    };
    angular.copy(book, $scope.book);

    $scope.ok = function () {
        $modalInstance.close($scope.book);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

});