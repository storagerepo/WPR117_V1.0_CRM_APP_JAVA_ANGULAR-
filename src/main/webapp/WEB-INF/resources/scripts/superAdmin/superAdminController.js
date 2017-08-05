/*//Initial Controller for Username
superAdminApp.controller('InitialController',function ($scope, $location) {
    $scope.isActive = function (path) {
        return $location.path() === path;
     }
 });
*/
superAdminApp.controller("dashboardController",['$rootScope','$scope','$http','requestHandler','superAdminService','Flash','searchAccountService',function($rootScope,$scope, $http, requestHandler, superAdminService,Flash,searchAccountService)
{
	/*$('#tourModal').modal('show');*/
	
	//getting total records                (AccountsController)
      $scope.getTotalRecords=function()
      {
    	  requestHandler.getRequest("SAdmin/getTotalRecords.json").then(function(response)
    			  {
    		  $scope.totalRecords=response.data.recordsForm;
    		  console.log($scope.totalRecords);
    			  });
      };
      
      $scope.getTotalRecords();

}]);

superAdminApp.controller("viewAccountsController",['$rootScope','$scope','$http','requestHandler','superAdminService','Flash','searchAccountService', function($rootScope,$scope, $http, requestHandler, superAdminService,Flash,searchAccountService)
		{
	
	//getting search keys while loading viewAccountsController
	/*
	$scope.init=function()
	{
		$scope.search=searchAccountService.getSearch();
		console.log($scope.search);
	};
	
	$scope.init();*/
	
	//get AccountsList through superAdminService 
	var details = superAdminService.getAccountsList();
	details.then(function(data) 
			{
		$scope.accountsList = data;
	});
	
	//get PoliceDepartmentList
	$scope.getPoliceDepartmentList=function()
	{
		requestHandler.getRequest("getAllPoliceDepartments.json").then(function(response)
		{
			$scope.policeDepartmentList=response.data.policeDepartmentForms;
			
		});
		
	};
	
	//calling getPoliceDepartmentList function
	$scope.getPoliceDepartmentList();
	
	
	//get Roles
	var details = superAdminService.getRolesList();
	details.then(function(data) 
	{
		$scope.roles = data;
	});
	
	
	
	var details = superAdminService.getRolesForAccount();
	details.then(function(data) 
	{
		$scope.rolesforaccount= data;
	});
	
	
	
	//enable disable function
	$scope.enableDisable=function(accountId)
	{
		
		$scope.accountId=accountId;
		requestHandler.postRequest("SAdmin/enableOrDisableAccount.json?id="+$scope.accountId).then(function(success)
		{
			Flash.create('success',"Changes Made Successfully!");	
			$(window).scrollTop(0);	
			
			var details = superAdminService.getAccountsList();
			details.then(function(data) {
				$scope.accountsList = data;
			});
			
		});
	};
	
	//reset password function
	$scope.resetPassword=function(accountId)
	{
		$('#resetModal').modal({animation:true});
		
		$scope.confirm=function()
		{
			$scope.accountId=accountId;
			console.log($scope.accountId);
			requestHandler.postRequest("SAdmin/resetPassword.json?id="+$scope.accountId).then(function(success)

					{
				$('#resetModal').modal('hide');
				Flash.create('success',"Password Updated Successfully!");
				$(window).scrollTop(0);
				//get AccountsList
				var details = superAdminService.getAccountsList();
				details.then(function(data) {
					$scope.accountsList = data;
				});
					});
		};
	};
		
	//setting search keys to searchAccountService
	$scope.filter=function(search)
	{
			searchAccountService.setSearch(search);
	};
	
	
	//delete function
	$scope.delete=function(id)
	{
		$('#deleteModal').modal({animation:true});
		
		$scope.confirm=function()
		{
			$scope.accountId=id;
			console.log($scope.accountId);
			requestHandler.postRequest("SAdmin/deleteAccount.json?id="+$scope.accountId).then(function(success)
					{
				$('#deleteModal').modal('hide');
				Flash.create('success',"Account Deleted Successfully!");
				$(window).scrollTop(0);
				//get AccountsList
				var details = superAdminService.getAccountsList();
				details.then(function(data) {
					$scope.accountsList = data;
				});
					});
		};
	}
	}]);

superAdminApp.controller("addAccountsController",['$scope','$http','requestHandler','superAdminService','Flash',function($scope, $http, requestHandler, superAdminService,Flash)
	{
	$scope.existAccountError=false;
	
	$scope.buttonText="Submit";
	$scope.disableUsername=false;
	$scope.addFirstNameWithHeading=false;

	$scope.heading="Add Account";
	
	
    //get Roles List
	var details = superAdminService.getRolesList();
	details.then(function(data) {
		$scope.roles = data;
	});
	
	var details = superAdminService.getRolesForAccount();
	details.then(function(data) 
	{
		$scope.rolesforaccount= data;
	});
	
	
	
	
	//get PoliceDepartmentList     (Police Department.class)
	$scope.getPoliceDepartmentList=function()
	{
		requestHandler.getRequest("getActivePoliceDepartments.json").then(function(response)
				{
			$scope.policeDepartmentList=response.data.policeDepartmentForms;
			console.log($scope.policeDepartmentList);
				});
		
	}
	
	//calling getPoliceDepartmentList function
	$scope.getPoliceDepartmentList();
	
	//add account function
		$scope.addAccounts=function(account)
		{
			
			
			$scope.accountsForms=account;
			$scope.accountsForms.accountId=null;
			$scope.accountsForms.addedDateTime=null;
			$scope.accountsForms.status=1;
			console.log($scope.accountsForms);
			
			
requestHandler.postRequest("User/checkUserNameExists.json?username="+$scope.account.username+"&id="+$scope.accountsForms.accountId,0).then(function(response)
					{

	if(response.data.isCorrect==1)
					{
	$scope.existAccountError=true;
	$("#first").show();
		
	}	
	else
		{
		requestHandler.postRequest("SAdmin/saveUpdateAccounts.json",$scope.accountsForms).then(function(response){
			Flash.create('success',"New Account is Been Added!");
			window.location.href="#/accounts";
			$(window).scrollTop(0);
		});
		}
			
					});	


$(function($scope) 
		{
    $("#one").keypress(function() 
    	    {
    	$("#first").hide();
        
    });
});
		};
	}]);

superAdminApp.controller("editAccountsController",['$scope','$http','requestHandler','$routeParams','superAdminService','Flash',function($scope, $http,requestHandler,$routeParams,superAdminService,Flash)
	{
	
	$scope.heading="Edit Account";
	
	$scope.buttonText="Update";
	$scope.disableUsername=true;
	$scope.addFirstNameWithHeading=true;
	$scope.accountId = $routeParams.id;
	//console.log($scope.accountId);
	
	//get Roles List    
	var details = superAdminService.getRolesList();
	details.then(function(data) {
		$scope.roles = data;
	});
	
	
	var details = superAdminService.getRolesForAccount();
	details.then(function(data) 
			{
		$scope.rolesforaccount= data;
	});
	
	
	
	
	
	//get PoliceDepartmentList  (Police Department.class)
	$scope.getPoliceDepartmentList=function()
	{
		requestHandler.getRequest("getActivePoliceDepartments.json").then(function(response)
				{
			$scope.policeDepartmentList=response.data.policeDepartmentForms;
			console.log($scope.policeDepartmentList);
				});
		
	}
	
	//calling getpoliceDepartmentList function
	$scope.getPoliceDepartmentList();
	
	//get account function
	requestHandler.getRequest("SAdmin/getAccount.json?id="+$scope.accountId).then(function(response)
			{
		$scope.account=response.data.accountsForm;
		console.log($scope.account);
			});
	
	//add account function
	$scope.addAccounts=function(account)
	{
		$scope.accountsForms=account;
		console.log($scope.accountsForms);
		
		requestHandler.postRequest("SAdmin/saveUpdateAccounts.json",$scope.accountsForms).then(function(response){
			Flash.create('success',"Account Updated Successfully!");
			$(window).scrollTop(0);
			window.location.href="#/accounts";
		});
	};
	
	}]);


superAdminApp.controller("changePasswordController",['$scope','$http','requestHandler','Flash',function($scope, $http,requestHandler,Flash)
{
	$scope.changePassword=function(password)
	{
		console.log(password);
		
		requestHandler.postRequest("User/changePassword.json?password="+password).then(function(success)
		{
			window.location.href="#/dashboard";
			Flash.create('success',"Password Updated Successfully!");
			$(window).scrollTop(0);
		});
	}
	
}]);

superAdminApp.controller("viewDepartmentController",['$rootScope','$scope','$http','requestHandler','superAdminService','Flash','searchAccountService',function($rootScope,$scope, $http, requestHandler, superAdminService,Flash,searchAccountService)
{
	
//get PoliceDepartmentList
$scope.getPoliceDepartmentList=function()
{
	requestHandler.getRequest("getAllPoliceDepartments.json").then(function(response)
	{
		$scope.policeDepartmentList=response.data.policeDepartmentForms;
	});
	
}

//calling getPoliceDepartmentList function
$scope.getPoliceDepartmentList();

//enable disable function
$scope.enableOrDisable=function(policeDepartmentId)
{
	$scope.policeDepartmentId=policeDepartmentId;
	requestHandler.postRequest("/enableOrDisableDepartment.json?id="+$scope.policeDepartmentId).then(function(success)
	{
		Flash.create('success',"Changes Made Successfully!");	
		 $(window).scrollTop(0);
		$scope.getPoliceDepartmentList();
		
	});
}


$scope.getCountyList=function()
{
requestHandler.getRequest("User/getAllCountys.json").then(function(response)
	{

	$scope.countyList=response.data.countyForms;
});
	
}

//calling getcountyList function
$scope.getCountyList();



//method to delete a department in list
$scope.deleteDepartment=function(id)
{
	$('#deleteModal').modal({animation:true});
	
   $scope.confirm=function()
        {
		$scope.policeDepartmentId=id;
		
		console.log($scope.policeDepartmentId);
		
		requestHandler.postRequest("/deletePoliceDepartment.json?id="+$scope.policeDepartmentId).then(function(success)
				{
			$('#deleteModal').modal('hide');
			Flash.create('success',"Department Deleted Successfully!");
			
			$(window).scrollTop(0);	
			$scope.getPoliceDepartmentList();

			    });
		
	}
  }


//view single department details 
$scope.viewDepartment=function(id)
{
	
	$scope.policeDepartmentId=id;
	console.log($scope.policeDepartmentId);  

	requestHandler.getRequest("/getPoliceDepartment.json?id="+$scope.policeDepartmentId).then(function(response)
	{
		$scope.result=response.data.policeDepartmentForm;		
		$('#viewModal').modal({animation:true});
	});
};

}]);



superAdminApp.controller("addDepartmentController",['$rootScope','$scope','$http','requestHandler','superAdminService','Flash','searchAccountService',function($rootScope,$scope, $http, requestHandler, superAdminService,Flash,searchAccountService)
	{
	$scope.existDepartmentError=false;

	$scope.buttonText="Submit";
	$scope.heading="Add Police Department";
	
	$scope.isEdit=false;
	$scope.showCancel=true;
	/*$scope.disable=true;*/
	
	//function to automatically changes values on login and search link based on name
	$scope.department={
			name:'',
			loginLink:'',
			searchLink:'',
			code:''
	}
	
	
	$scope.onNameChange=function()
	
	{
		
		if($scope.department.name=="" || $scope.department.name==undefined)
			{
			$scope.department.loginLink="";
			$scope.department.searchLink="";
			$scope.department.code="";
			}
		else
			{
			
			var ind=$scope.department.name.split(" ");
			$scope.department.loginLink=ind[0];
			$scope.department.searchLink=ind[0]+"_search";
			/*$scope.department.code="RR_"*/
			}
	}
	
	
	
	
	
//get PoliceDepartmentList
$scope.getPoliceDepartmentList=function()
{
	requestHandler.getRequest("getAllPoliceDepartments.json").then(function(response)
	{
		$scope.policeDepartmentList=response.data.policeDepartmentForms;
		console.log($scope.policeDepartmentList);
	});
}

//calling getPoliceDepartmentList function
$scope.getPoliceDepartmentList();


//get CountyList
$scope.getCountyList=function()
{
	requestHandler.getRequest("User/getAllCountys.json").then(function(response)
	{
		$scope.countyList=response.data.countyForms;
	});
}

//calling getcountyList function
$scope.getCountyList();




$scope.uploadFile = function()
{
   var file = $scope.myFile;
   var uploadUrl = "/fileUpload";
   fileUpload.uploadFileToUrl(file, uploadUrl);
}


$scope.uploadImage = function()
{
	console.log("Changed");
}



$scope.addDepartment=function(department)
{
	$scope.policeDepartmentForms=department;
	$scope.policeDepartmentForms.status=1;
    $scope.policeDepartmentId=0;
    
    
    
requestHandler.postRequest("checkAllDepartment.json?name="+$scope.policeDepartmentForms.name
		+"&code="+$scope.policeDepartmentForms.code
		+"&login="+$scope.policeDepartmentForms.loginLink
		+"&search="+$scope.policeDepartmentForms.searchLink
		+"&id="+$scope.policeDepartmentId).then(function(response)
{
			
			console.log(response.data.isCorrect);

if(response.data.isCorrect[0]==1 || response.data.isCorrect[1]==2 || response.data.isCorrect[2]==3 || response.data.isCorrect[3]==4)	
{
if(response.data.isCorrect[0]==1)
{
$scope.existDepartmentError=true;
$("#first").show();
}	


if(response.data.isCorrect[1]==2)
{
$scope.existCodeErrors=true;
$("#second").show();
}

 if(response.data.isCorrect[2]==3)
{
$scope.existLoginError=true;	
$("#third").show();
}
 
 if(response.data.isCorrect[3]==4)
{
$scope.existSearchError=true;
$("#fourth").show()
}
 
}

else
	{

	//upload and save image in department
	requestHandler.postRequest("saveUpdatePoliceDepartment.json",$scope.policeDepartmentForms).then(function(response)
	{
		$scope.policeDepartmentId=response.data.policeDepartmentId;
		
		$scope.buttonText="Submitting...";
		$scope.imageUpload=true;
		
	if($scope.policeDepartmentFile!="" && $scope.policeDepartmentFile!=undefined)
		{
			requestHandler.postFileUpdate("uploadPoliceDepartment.json",$scope.policeDepartmentId,"policeDepartmentId",$scope.policeDepartmentFile,"policeDepartmentFile").then(function(response)
			{
				console.log("file uploaded");
				window.location.href="#/department";
			    Flash.create('success',"Department Added Successfully!");
			    $(window).scrollTop(0);
			});
		}
	else
		{
			requestHandler.postFileUpdate("uploadPoliceDepartmentWithoutFile.json",$scope.policeDepartmentId,"policeDepartmentId").then(function(response)
			{
				console.log("no file");
				window.location.href="#/department";
			    Flash.create('success',"Department Added Successfully!");
			    $(window).scrollTop(0);
			});
		}
	
	});

	}


$(function($scope) 
		{
    $("#one").keypress(function() 
    	    {
    	$("#first").hide();
    	
        
    });
    
    $("#two").keypress(function() 
    	    {
    	$("#second").hide();
    	
       
    });
    
    
    $("#three").keypress(function() 
    	    {
    	$("#third").hide();
    	
       
    });
    
    
    $("#four").keypress(function() 
    	    {
    	$("#fourth").hide();
    	
        
    });
    
    
    
});

});


	$scope.getPoliceDepartmentList=function()
	{
		requestHandler.getRequest("getAllPoliceDepartments.json").then(function(response)
			{
		$scope.policeDepartmentList=response.data.policeDepartmentForms;
		});
	};

//calling getPoliceDepartmentList function
	$scope.getPoliceDepartmentList();
	};
}
]);


//Edit Department Details
superAdminApp.controller("editDepartmentController",['$rootScope','$scope','$http','requestHandler','$routeParams','superAdminService','Flash','searchAccountService',function($rootScope,$scope, $http, requestHandler,$routeParams,superAdminService,Flash,searchAccountService)
	{
	$scope.heading="Edit Department";
	$scope.imageUpload=false;
	$scope.title="Update Credentials";
	$scope.buttonText="Update";
	$scope.policeDepartmentId = $routeParams.id;
	
	$scope.isEdit=true;
	$scope.showCancel=true;
	
	$scope.disable=true;
//get CountyList
$scope.getCountyList=function()
{
requestHandler.getRequest("User/getAllCountys.json").then(function(response)
	{

	$scope.countyList=response.data.countyForms;
});
	
	}

	//calling getcountyList function
	$scope.getCountyList();

	//get department by id
requestHandler.getRequest("/getPoliceDepartment.json?id="+$scope.policeDepartmentId).then(function(response)
{
$scope.department=response.data.policeDepartmentForm;
});
	

$scope.department={
		name:'',
		loginLink:'',
		searchLink:'',
		code:'',
		url:''
}


$scope.onNameChange=function()

{
	
	if($scope.department.name=="" || $scope.department.name==undefined)
		{
		$scope.department.loginLink="";
		$scope.department.searchLink="";
		}
	else
		{
		var ind=$scope.department.name.split(" ");
		$scope.department.loginLink=ind[0];
		$scope.department.searchLink=ind[0]+"_search";
		
		}
}


$scope.uploadImage=function() 
{
    $scope.imageUpload=false;
}



$scope.changeFile=function(){
	$scope.isEdit=false;
	$scope.showCancel=false;
	$('#policeDepartmentFile').trigger('click');
};

// Clear Selected File
$scope.clearFile = function () {
    angular.element("input[type='file']").val(null);
    $scope.policeDepartmentFile="";
};


	//update department function
$scope.addDepartment=function(department)
{
	$scope.policeDepartmentForms=department;
	
     console.log($scope.policeDepartmentForms);

     
     
     
     requestHandler.postRequest("checkAllDepartment.json?name="+$scope.policeDepartmentForms.name
    			+"&code="+$scope.policeDepartmentForms.code
    			+"&login="+$scope.policeDepartmentForms.loginLink
    			+"&search="+$scope.policeDepartmentForms.searchLink
    			+"&id="+$scope.policeDepartmentId).then(function(response)
    	{
    				
    				console.log(response.data.isCorrect);

    	if(response.data.isCorrect[0]==1 || response.data.isCorrect[1]==2 || response.data.isCorrect[2]==3 || response.data.isCorrect[3]==4)	
    	{
    	if(response.data.isCorrect[0]==1)
    	{
    	$scope.existDepartmentError=true;
    	$("#first").show();
    	}	


    	if(response.data.isCorrect[1]==2)
    	{
    	$scope.existCodeErrors=true;
    	$("#second").show();
    	}

    	 if(response.data.isCorrect[2]==3)
    	{
    	$scope.existLoginError=true;	
    	$("#third").show();
    	}
    	 
    	 if(response.data.isCorrect[3]==4)
    	{
    	$scope.existSearchError=true;
    	$("#fourth").show()
    	}
    	 
    	}     
     
     
    	else
    		{
    requestHandler.postRequest("mergePoliceDepartment.json",$scope.policeDepartmentForms).then(function(response)
{
	$scope.policeDepartmentId=response.data.policeDepartmentId;
	
	
	$scope.buttonText="Updating...";

		$scope.imageUpload=true;
		
	
		
if($scope.policeDepartmentFile!=undefined&&$scope.policeDepartmentFile!="")
	{
	
	requestHandler.postFileUpdate("uploadPoliceDepartment.json",$scope.policeDepartmentId,"policeDepartmentId",$scope.policeDepartmentFile,"policeDepartmentFile").then(function(response)
	{
		console.log("File Updated");
		window.location.href="#/department";
		Flash.create('success',"Department Updated Successfully!");
		$(window).scrollTop(0);
		
	});
	}else{
		console.log("no file");
		window.location.href="#/department";
		Flash.create('success',"Department Updated Successfully!");
		$(window).scrollTop(0);
	}


});

    		}
    	
});
     $(function($scope) 
    			{
    	    $("#one").keypress(function() 
    	    	    {
    	    	$("#first").hide();
    	    	
    	        
    	    });
    	    
    	    $("#two").keypress(function() 
    	    	    {
    	    	$("#second").hide();
    	    	
    	       
    	    });
    	    
    	    
    	    $("#three").keypress(function() 
    	    	    {
    	    	$("#third").hide();
    	    	
    	       
    	    });
    	    
    	    
    	    $("#four").keypress(function() 
    	    	    {
    	    	$("#fourth").hide();
    	    	
    	        
    	    });
    	    
    			});  
};
}]);




