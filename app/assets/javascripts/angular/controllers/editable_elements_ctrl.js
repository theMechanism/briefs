App.controller("EditableElementsCtrl", function($scope, $resource, $http, $location){
	
	$scope.elm = {"features":[{ 'id': 1 }]}
	$scope.showButton = true;
	
	$scope.toggleForm = function() {
		$scope.showButton = !$scope.showButton;
		if (angular.isDefined($scope.elm)){
			$scope.elm = {"features":[{ 'id': 1 }]}

		}
		
	};
	
	$scope.addNewFeature = function(elm) {
	   var newItemNo = elm.features.length+1;
	   elm.features.push({'id':newItemNo});
	};
	$scope.removeFeature = function(event, feature){
		$scope.elm.features.splice(feature, 1);
	}

	$scope.saveElm = function(newElm){
		debugger;
		if (angular.isDefined(newElm.content)){
				var fd = new FormData(); 
			fd.append('element[content]', newElm.content);
			fd.append('element[brief_id]', $scope.currentBrief.id);
			
			$http.post('/elements', fd, {
				transformRequest: angular.identity,
				headers:{'Content-Type': undefined}
			}).success(function(d){
				$scope.currentBrief.elements.push(d);
				$scope.toggleForm();
				angular.forEach(newElm.features, function(value, key) {
		       		if (angular.isDefined(value.content)){
		       			$scope.saveFeature(value, d);
		       		}
		       		
		     	});
		
			}).error(function(){
			});	
		}else{
			alert("Please enter a description for your component");
		}
			
	}
	$scope.saveFeature = function(value, d){
		var fd = new FormData(); 
		fd.append('feature[content]', value.content);
		fd.append('feature[element_id]', d.id);
		$http.post('api/elements/'+d.id+'/features', fd, {
			transformRequest: angular.identity,
			headers:{'Content-Type': undefined}
		}).success(function(data){
				angular.forEach($scope.currentBrief.elements, function(value,key){
					if ($scope.currentBrief.elements[key].id == data.element_id){
						if(angular.isDefined($scope.currentBrief.elements[key].features)){
							$scope.currentBrief.elements[key].features.push(data);
							
						}else{
							$scope.currentBrief.elements[key].features = []
							$scope.currentBrief.elements[key].features.push(data)
						
						}
					}
				})
		$scope.update();
	
		}).error(function(){
			
		});	

	}
});
