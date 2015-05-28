angular.module('app').controller('HomeController', [
  '$scope',
  '$http',
  '$interval',

  function($scope,$http, $interval){

    $scope.sent = "WORKS!";
}

]);