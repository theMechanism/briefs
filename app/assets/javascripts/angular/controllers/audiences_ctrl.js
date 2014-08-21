App.controller("AudiencesCtrl", function($scope, $resource, $http, $location){
	$scope.users = [{id: 1}];
	$scope.addNewUser = function() {
	  var newItemNo = $scope.users.length+1;
	  $scope.users.push({ 'id':newItemNo });
	};
	$scope.saveUsers = function(){
		angular.forEach($scope.users, function(value, key) {
	       	$scope.saveUser(value);
	    });
	}
	$scope.saveUser = function(newUser){
		if (angular.isDefined(newUser.description)){
			var fd = new FormData(); 
			fd.append('audience[description]', newUser.description);
			fd.append('audience[brief_id]', $scope.currentBrief.id);
			$http.post('/api/audience', fd, {
				transformRequest: angular.identity,
				headers:{'Content-Type': undefined}
			}).success(function(d){
				
					$scope.currentBrief.audiences.push(d);
					$scope.updateAudienceVars();
			}).error(function(){});		
		}else{
			$scope.updateAudienceVars();
		}
	}

});