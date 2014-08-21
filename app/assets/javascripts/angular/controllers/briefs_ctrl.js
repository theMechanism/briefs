App.controller("BriefsCtrl", function($scope, $resource, $http, $location){
	var Brief = $resource('/api/briefs/:id' );
	$scope.isSaved = false;
	$scope.twoColumnView = false;
	$scope.threeColumnView = false;
	$scope.smallBar= false;
	$scope.oneColumnview = false;
	$scope.fullWidth = true;
	$scope.lastStep = false;
	$scope.addElements = false;
	$scope.showAudience = false;
	$scope.similar = false;
	$scope.pageClass = 'page-home';
	$scope.currentBrief = {};
	$scope.newBrief = {}
	$scope.existingComments = [];
	$scope.currentUser = {
		"id": 1,
		"avatarUrl": "http://placekitten.com/g/200/200",
		"name": "The Mechanism"
	};
	$scope.twoColumn = function(){
		$scope.twoColumnView = true;
		$scope.threeColumnView = false;
		$scope.fullWidth = false;

	}

	$scope.threeColumn = function(){
		$scope.threeColumnView = true;
		$scope.twoColumnView = false;
		$scope.fullWidth = false;
	}
	$scope.toggleColumn = function(){
 		if($scope.lastStep && $scope.isSaved){
			$scope.oneColumnView = !$scope.oneColumnView;
			$scope.smallBar = !$scope.smallBar;
		}else if ($scope.isSaved){
			$scope.twoColumnView = !$scope.twoColumnView;
			$scope.threeColumnView = !$scope.threeColumnView;
		}else{
			$scope.fullWidth = !$scope.fullWidth;
			$scope.twoColumnView = !$scope.twoColumnView;
			$scope.threeColumnView = false;
		}
	}
	$scope.deleteBrief = function(brief){
		$scope.briefs.splice(brief, 1);
		$http.delete('/api/brief/'+brief.id).success(function(data){})
	}

	$scope.briefs = Brief.query(function(){
		
		if ($location.path().split('/')[2] == "view"){
			
			$scope.briefId = $location.path().split('/')[1];
			
			angular.forEach($scope.briefs, function(value, key){
				if (value.id == $scope.briefId){
					$scope.currentBrief = value;
					
				
					$scope.twoColumn();
					$scope.lastStep = true;
					$scope.isSaved = true;
					$scope.addComments();
					angular.forEach($scope.currentBrief.comments, function(value, key){
						sideComments.insertComment(value);
					})
					
				}
			})

		}
	});
	$scope.showBrief = function(brief){
		$scope.selectedBrief = brief;
	};
	$scope.isSelected = function(brief){
		if ($scope.selectedBrief == brief){
			return "active";
		}
	}
	$scope.saveBrief = function(newBrief){
		var fd = new FormData(); 
		fd.append('brief[name]', newBrief.name);
		fd.append('brief[instructions]', newBrief.instructions);
		fd.append('brief[issue_date]', newBrief.issue_date);
		fd.append('brief[due_date]', newBrief.due_date);
		fd.append('brief[contact_name]', newBrief.contact_name);
		fd.append('brief[contact]', newBrief.contact);
		fd.append('brief[website]', newBrief.website);
		fd.append('brief[budget]', newBrief.budget);
		fd.append('brief[type_of_work]', newBrief.type_of_work);
		fd.append('brief[internal_res]', newBrief.internal_res);
		fd.append('brief[purpose]', newBrief.purpose);
		fd.append('brief[client_information]', newBrief.client_information);
		fd.append('brief[competitors]', newBrief.competitors);
		$http.post('/briefs', fd, {
			transformRequest: angular.identity,
			headers:{'Content-Type': undefined}
		}).success(function(d){
		 	$scope.isSaved = true;
		 	$scope.addElements = true;
		 	$scope.threeColumn();
			$scope.currentBrief = d;
			$scope.currentBrief["elements"]=[];
			$scope.currentBrief["audiences"]=[];
			$scope.currentBrief["sites"]=[];
			$scope.briefs.push(d);
		}).error(function(){});		
	}
	$scope.update = function(){
			$scope.showAudience = true;
			$scope.addElements = false;
			console.log($scope.showAudience);
	}
	$scope.updateAudienceVars =function(){
			$scope.showAudience = false;
			$scope.similar = true;
	}
	$scope.deleteThis = function(attr, id, event){
		angular.element(event.target).parent().parent().remove();
		$http.delete('/api/'+attr+'/'+id).success(function(data){
			$scope.data = data;
			angular.forEach($scope.currentBrief[data.attribute],function(value, key){
			 	if(value.id == $scope.data.id){
			 		$scope.currentBrief[$scope.data.attribute].splice(key, 1);
			 	}
			})
		});
	}
	$scope.addComments =function(){
		$scope.showAudience = false;
		$scope.similar = false;
		$scope.commentable = true;
		$scope.lastStep = true;
		$scope.twoColumn();
		var SideComments = require('side-comments');
		sideComments = new SideComments('.commentable-area', $scope.currentUser, $scope.existingComments);
		sideComments.on('commentPosted', function( comment ) {
	    	debugger;
	    	var fd = new FormData();
			fd.append('comment[sectionId]', comment.sectionId)
			fd.append("comment[comment]", comment.comment);
			fd.append("comment[authorAvatarUrl]", comment.authorAvatarUrl);
			fd.append("comment[authorName]", comment.authorName);
			$http.post('/api/briefs/'+$scope.currentBrief.id+'/comments', fd, {
				transformRequest: angular.identity,
				headers:{'Content-Type': undefined}
			}).success(function(d){
				  sideComments.insertComment(d);
			}).error(function(){
			});	
		});
	}
	$scope.updateBrief = function(data, field){
		var fd = new FormData();
		fd.append("brief["+field+"]", data);
		$http.post('/api/briefs/'+$scope.currentBrief.id+'/', fd, {
			transformRequest: angular.identity,
			headers:{'Content-Type': undefined}
		}).success(function(d){}).error(function(){
		});	
	}
	$scope.updateElem = function(elm, data){
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
	$scope.updateFeature = function(elem, feature, data){
		if (feature.id == "new"){
			var fd = new FormData(); 
			fd.append('feature[content]', data);
			fd.append('feature[element_id]', elem.id);
			$http.post('api/elements/'+elem.id+'/features', fd, {
				transformRequest: angular.identity,
				headers:{'Content-Type': undefined}
			}).success(function(data){
			
			}).error(function(){
				
			});	
		}else{
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
	}
	$scope.updateAudience = function(audience, data){
		if (audience.id == "new"){
			var fd = new FormData(); 
			fd.append('audience[description]', data);
			fd.append('audience[brief_id]', $scope.currentBrief.id);
			$http.post('/api/audience', fd, {
				transformRequest: angular.identity,
				headers:{'Content-Type': undefined}
			}).success(function(d){
				$scope.currentBrief.audiences[$scope.currentBrief.audiences.length - 1].id = d.id;
			}).error(function(){
			});		
		}else{
			var fd = new FormData();
			fd.append('audience[id]', audience.id);
			fd.append('audience[description]', data);
			$http.post('api/audience/'+audience.id, fd, {
				transformRequest: angular.identity,
				headers:{'Content-Type': undefined}
			}).success(function(d){}).error(function(){});
		}
	}
	$scope.updateSite = function(site, data){
		if (site.id == "new"){
			var fd = new FormData(); 
			fd.append('site[name]', data);
			fd.append('site[brief_id]', $scope.currentBrief.id);
			$http.post('/api/sites', fd, {
				transformRequest: angular.identity,
				headers:{'Content-Type': undefined}
			}).success(function(d){
				debugger;
				$scope.currentBrief.sites[$scope.currentBrief.sites.length - 1].id = d.id;
			}).error(function(){
			});		
		}else{
			var fd = new FormData();
			fd.append('site[id]', site.id);
			fd.append('site[name]', data);
			$http.post('api/sites/'+site.id, fd, {
				transformRequest: angular.identity,
				headers:{'Content-Type': undefined}
			}).success(function(d){
			}).error(function(){});
		}
	}
	$scope.addNewFeature = function(elem){
		if (angular.isDefined(elem.features)){
			elem.features.push({'id':"new"});
		}else{
			elem.features = [{'id':"new"}];
		}
	}
	$scope.addNewUser = function(){
		$scope.currentBrief.audiences.push({'id':"new"});
	}
	$scope.addNewSite = function(){
		$scope.currentBrief.sites.push({'id':"new"});
	}
});
