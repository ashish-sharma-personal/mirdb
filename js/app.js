(function(){
	angular.module('cancerDb',[])

	.controller('tabCtrl',['$scope', '$http' ,function($scope, $http){
		$scope.tab=4;
		$scope.tableNo=4;
		$scope.popdropdowns=false;
		$scope.dropArr=['regulation','marker','therapy','stage'];
		$scope.showMarker=false;
		$scope.showTherapy=false;
		$scope.showStage=false;

		$scope.setTab = function(tabId){
			$scope.tab=tabId;
			$scope.setTable(4);
		}

		$scope.isSet = function(tabId){
			return $scope.tab === tabId;
		}

		$scope.selectTab = function(index){
			$scope.selectedTab = index;
		}

		$scope.isTable = function(tableId){
			return $scope.tableNo == tableId;
		}

		$scope.setTable = function(tableId){
			$scope.tableNo=tableId;
		}

		$scope.popChecker = function(){
			if(this.exp2.region!==""){
				$scope.popdropdowns=true;
			}
			else{
				$scope.popdropdowns=false;
			}
		}

		$scope.oneSelector = function(val,id){
			var index= $scope.dropArr.indexOf(id);
			if (val == "" || val==undefined) {
	            $("#btSubmit").prop('disabled', true);
	            $('#dropdownsLabel').find('select').prop('disabled', false);
	        } else {
	            $("#btSubmit").prop('disabled', false);
	            $('#dropdownsLabel').find('select').prop('disabled', true);
	            $('#dropdownsLabel').find('select')[index].disabled=false;
	        }
		}

		$scope.searchQuery = function(formData){
			if($scope.tab=="2"){
				var searchData = this.RNA;
				for(item in searchData){
					if(searchData[item]==''){
						delete searchData[item];
					}
				}
				$http.get('/miRNA',{params:{"cancer":searchData.cancer}}).then(function(response){
					$scope.miResult = response.data;
					$scope.setTable(2);
					console.log(response.data);
				});
			}
			else if($scope.tab=="3"){
				if(formData.$name=='form31'){
					var searchData = this.SNP1;
				}
				else{
					var searchData = this.SNP2;
				}
				for(item in searchData){
					if(searchData[item]==''){
						delete searchData[item];
					}
				}
				$http.get('/snp',{params:searchData}).then(function(response){
					$scope.snpResult = response.data;
					window.location.hash="resultTable";
					$scope.setTable(3);
					console.log(response.data);
				});
			}
			else if($scope.tab == "1"){
				if(formData.$name=='form11'){
					var searchData = this.exp1;
				}
				else{
					var searchData = this.exp2;
					if(searchData.marker!=="" && searchData.marker!=undefined){
						$scope.showMarker=true;
						$scope.showTherapy=false;
						$scope.showStage=false;
					}
					else if(searchData.stage!=="" && searchData.stage!=undefined){
						$scope.showStage=true;
						$scope.showTherapy=false;
						$scope.showMarker=false;
					}
					else if(searchData.therapy!=="" && searchData.therapy!=undefined){
						$scope.showTherapy=true;
						$scope.showStage=false;
						$scope.showMarker=false;
					}
					else{
						$scope.showTherapy=false;
						$scope.showStage=false;
						$scope.showMarker=false;
					}
				}
				for(item in searchData){
					if(searchData[item]==''){
						delete searchData[item];
					}
				}
				$http.get('/expression',{params:searchData}).then(function(response){
					$scope.expResult = response.data;
					$scope.setTable(1);
					console.log(response.data);
				});
			}
		}
	}])
})();