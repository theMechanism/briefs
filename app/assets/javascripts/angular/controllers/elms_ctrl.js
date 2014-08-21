App.controller("ElmsCtrl", function($scope, $resource, $http, $location){
	console.log($scope.showAudience);
	$scope.elms = [{id: 1, features:[ {id: 1} ]}];
	$scope.showAudience = false;
	$scope.addElements = true;
	
	$scope.addNewElm = function() {
	 debugger;
	  var newItemNo = $scope.elms.length+1;
	  $scope.elms.push({ 'id':newItemNo , "features":[{ 'id': 1 }] });
	};
	


	$scope.addNewFeature = function(elm) {
	
	   var newItemNo = elm.features.length+1;
	   elm.features.push({'id':newItemNo});
	};


	$scope.saveElms = function(){
		angular.forEach($scope.elms, function(value, key) {
	    	$scope.saveElm(value);
	    });
	}



	$scope.saveElm = function(newElm){
		$scope.update(); 
		if (angular.isDefined(newElm.content)){
			var fd = new FormData(); 

			fd.append('element[content]', newElm.content);
			fd.append('element[brief_id]', $scope.currentBrief.id);
			
			$http.post('/elements', fd, {
				transformRequest: angular.identity,
				headers:{'Content-Type': undefined}
			}).success(function(d){
				$scope.currentBrief.elements.push(d);
				angular.forEach(newElm.features, function(value, key) {
		       		$scope.saveFeature(value, d);
		     	});
			}).error(function(){});	
		}	
	}


	$scope.saveFeature = function(value, d){
		if (angular.isDefined(value.content)){
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
			
		
			}).error(function(){});	
		}	
	}
});
