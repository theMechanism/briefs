App.controller("SimilarProjectsCtrl", function($scope, $resource, $http, $location){
	$scope.sites = [{id: 1}];
	$scope.addNewSite = function() {
	  var newItemNo = $scope.sites.length+1;
	  $scope.sites.push({ 'id':newItemNo });
	};
	$scope.saveSites = function(){
		angular.forEach($scope.sites, function(value, key) {
	       	$scope.saveSite(value);
	    });
	}
	$scope.saveSite = function(newSite){
		if (angular.isDefined(newSite.name)){
			newSite.name = "No Similar Projects";
			

		}
			var fd = new FormData(); 
			fd.append('site[name]', newSite.name);
			fd.append('site[brief_id]', $scope.currentBrief.id);

			$http.post('/api/sites', fd, {
				transformRequest: angular.identity,
				headers:{'Content-Type': undefined}
			}).success(function(d){
				debugger;
				$scope.currentBrief.sites.push(d);
				$scope.addComments();
		
			}).error(function(){
				
			});

	}

})