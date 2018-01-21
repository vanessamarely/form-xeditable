var app = angular.module('mixmax', ['xeditable', 'ngAnimate']);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});


app.controller('SaveCtrl', function($scope, $http) {
	$scope.user = {
    	name: 'Testing name',
    	email: 'testing@email.com',
    	status: 2,
    	address: 'Street 23 # 5 - 55',
    	phone: '3456789'
  	};

  	$scope.statuses = [
	    {value: 1, text: 'status1'},
	    {value: 2, text: 'status2'},
	    {value: 3, text: 'status3'},
	    {value: 4, text: 'status4'}
	]; 

	$scope.hoverIn = function(){
        $scope.hoverEdit = true;
    };

    $scope.hoverOut = function(){
        $scope.hoverEdit = false;
    };

	$scope.saveUser = function() {
	    // $scope.user already updated!
	    alert('saved successfully');
	    return $http.post('/saveUser', $scope.user).error(function(err) {
	      if(err.field && err.msg) {
	        // err like {field: "name", msg: "Server-side error for this username!"} 
	        $scope.editableForm.$setError(err.field, err.msg);
	      } else { 
	        // unknown error
	        $scope.editableForm.$setError('name', 'Unknown error!');
	      }
	    });
  	};
});