App.controller("EditableAudienceCtrl", function($scope, $resource, $http, $location){
	
	$scope.user = {};
	$scope.showButton = true;
	
	$scope.toggleForm = function() {
		$scope.showButton = !$scope.showButton;
		$scope.user = {};
		
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
				$scope.toggleForm();
				if (angular.isDefined($scope.currentBrief.audiences)){
					$scope.currentBrief.audiences.push(d);
				}else{
					$scope.currentBrief.audiences = []
					$scope.currentBrief.audiences.push(d);
				}
				
			debugger;
			}).error(function(){});		
		}else{
			alert('cannot be blank');
		}

	}
	
});
