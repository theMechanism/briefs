App.controller("ElmssCtrl", function($scope, $resource, $http, $location){
	$scope.pageClass = 'add-elements';
	
	$scope.unsaved = true;
	$scope.briefId = $location.path().split('/')[1];
	$scope.showFeature = false;
	$scope.currentElm = {};
	var Elms = $resource('/api/briefs/'+$scope.currentBrief.id+'/elements');
	
	$scope.features = [{}];
	$scope.showForm = function(){
		$scope.create = true;
		$scope.showFeature = false;
	}
	$scope.addNewFeature = function() {
	  var newItemNo = $scope.features.length+1;
	  $scope.features.push({'id': newItemNo});
	};
	$scope.showAddFeature = function(feature) {
	  return feature.id === $scope.features[$scope.features.length-1].id;
	};
	$scope.saveElm = function(newElm){
		var fd = new FormData(); 
		debugger;
		fd.append('element[content]', newElm.content);
		fd.append('element[brief_id]', $scope.briefId);
		
		$http.post('/elements', fd, {
			transformRequest: angular.identity,
			headers:{'Content-Type': undefined}
		}).success(function(d){
			$scope.elms.push(d);

			$scope.currentElm = d;
			$scope.unsaved = false;
			// debugger;
			$scope.showFeature = true;
			$scope.create = false;
		}).error(function(){
			
		});		
	}
	$scope.saveFeature = function(feature){
		var fd = new FormData();
		
		fd.append('feature[content]', feature.content);
		fd.append('feature[element_id]', $scope.currentElm.id)
		$http.post('api/elements/'+$scope.currentElm.id+'/features', fd, {
			transformRequest: angular.identity,
			headers:{'Content-Type': undefined}
		}).success(function(d){
			for(var i = 0; i < $scope.elms.length; i += 1) {
		        if($scope.elms[i].id == $scope.currentElm.id) {
		        	if (angular.isDefined($scope.elms[i].features)){
		            	$scope.elms[i].features.push(d);
		        	}else{
		        		$scope.elms[i].features = [];
		        		$scope.elms[i].features.push(d);
		        	}
		        }
		    }
		    debugger;
		    $scope.feature = {}

		}).error(function(){
			
		});		
	}
	$scope.updateFeature = function(feature, data){
		
		var fd = new FormData();
		fd.append('feature[id]', feature.id);
		fd.append('feature[content]', data);
		$http.post('api/features/'+feature.id, fd, {
			transformRequest: angular.identity,
			headers:{'Content-Type': undefined}
		}).success(function(d){
			debugger;
		}).error(function(){
			
		});

	}
	$scope.updateElement = function(elm, data){
		debugger;
		var fd = new FormData();
		fd.append('element[id]', elm.id);
		fd.append('element[content]', data);
		$http.post('api/elements/'+elm.id, fd, {
			transformRequest: angular.identity,
			headers:{'Content-Type': undefined}
		}).success(function(d){
			debugger;
		}).error(function(){
			
		});

	}
	

	
});
