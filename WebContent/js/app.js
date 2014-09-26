angular.module('employeeApp', ['ngRoute'])
	.config(
		[ '$routeProvider',  function($routeProvider) {
			
			$routeProvider.when('/', {
				templateUrl: 'partials/main.html',
				controller: BaseController
			});
			
			$routeProvider.otherwise({
				templateUrl: '/',
			});
			
		}]).run(function($window){
			if(!$window.localStorage.emps && $window.localStorage.emps.length<1 ){
			$window.localStorage.emps =[];
			}
		});
function BaseController($scope, $window,EmployeeModel) {
	$scope.employees =$window.localStorage.emps.length<1?[]:JSON.parse($window.localStorage.emps); 
	 
	$scope.showForm=false;
	$scope.createEmployee=function(){
		$scope.employeeModel = EmployeeModel.getModel();
		$scope.showForm=true;
	},
	$scope.edit=function(employee){
		$scope.employeeModel = employee;
		$scope.showForm=true;
	},
	$scope.save=function(employee){
		var isFormValidated = $scope.employeeForm.$valid;
		if(isFormValidated){
			$scope.employees.push(employee);
			$window.localStorage.emps =JSON.stringify($scope.employees);
			$scope.showForm=false;
		}
		
	}
	$scope.deleteEntry = function(employee) {
		for(var i =0 ; i< $scope.employees.length;i++){
			if(employee.empId === $scope.employees[i].empId){
				$scope.employees.splice(i,1);
				$window.localStorage.emps =JSON.stringify($scope.employees);
				break;
			}
		}
	}
};
angular.module('employeeApp').factory('EmployeeModel', function () {

    function EmployeeModel() {
        var self = this;        
        self.empId="";
        self.name="";
        self.loc="";
        self.dob="";
        self.doj="";
      }
    function employeeModelService() {
        this.getModel = function () {
            return new EmployeeModel();
        }
    }
    return new employeeModelService();
});


