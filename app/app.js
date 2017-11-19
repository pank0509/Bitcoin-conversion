var app = angular.module('Currency', []);
    app.controller("BarChartController", function($scope, $http) {
    function getLatestBarChartData() {
        var request =  $http.get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
        .then(function(response) {
        $scope.currencyData = response.data;
        var x = $scope.currencyData.map(function(item) {
           return item.name;
        });
        var y = $scope.currencyData.map(function(item) {
           return Number(item.price_usd);
        });

        var data = [{
		  x: x,
		  y: y,
		  type: 'bar'
		}];
		var layout = {
			title: 'Crypto currencies in USD',
			  yaxis: {
			    title: 'Price In USD'
		    }
		}
		Plotly.newPlot('barChart', data , layout);
    });
    }
    getLatestBarChartData();
    setInterval(function() {
        getLatestBarChartData();
    },300000)
 })