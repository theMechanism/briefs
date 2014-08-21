App.controller("EditableSitesCtrl", function($scope, $resource, $http, $location){
	
	$scope.site = {};
	$scope.showButton = true;
	
	$scope.toggleForm = function() {
		$scope.showButton = !$scope.showButton;
		$scope.site = {};
		
	}
	$scope.saveSite = function(newSite){
		if (angular.isDefined(newSite.name)){
			var fd = new FormData(); 

			fd.append('site[name]', newSite.name);
			fd.append('site[brief_id]', $scope.currentBrief.id);

			$http.post('/api/sites', fd, {
				transformRequest: angular.identity,
				headers:{'Content-Type': undefined}
			}).success(function(d){
				$scope.toggleForm();
				$scope.currentBrief.sites.push(d);
			
			}).error(function(){});	
		}else{
			alert('cannot be blank');
		}	
	}
	
});
