'use strict';

/* Controllers */

var testlocationApp = angular.module('testlocationApp', []);
   
testlocationApp.controller('TestLocationCtrl', ['$scope','$http', function($scope, $http) {
  //load json
  $http.get('json/WebDeveloperRecrData.json').success(function(data) {
	$scope.locations = data;
	
	//load start datetime
	$scope.getStartDateTime = function (){
		var sDateTimeUTC = $scope.locations.start;
		$scope.locations.sdate = sDateTimeUTC.substring(0,10);
		$scope.locations.stime = sDateTimeUTC.substring(11,19);
		$scope.locations.sutc = sDateTimeUTC.substring(19);
	};
	
	//load finish datetime
	$scope.getEndDateTime = function (){
		var eDateTimeUTC = $scope.locations.finish;
		$scope.locations.edate = eDateTimeUTC.substring(0,10);
		$scope.locations.etime = eDateTimeUTC.substring(11,19);
		$scope.locations.eutc = eDateTimeUTC.substring(19);
	};
	
	//load bar chart for subloc percent visits
	$scope.buildSublocPercentVisitsChart = function (){
		$('#subloc_percent_visits').highcharts({
			chart: {
				type: 'bar'
			},
			title: {
				text: 'Subloc percent visits'
			},
			xAxis: {
				categories: ['Subloc Percent Qualified Visits', 'Subloc Percent Engaged Visits', 'Subloc Percent Visits Potential'],
				title: {
					text: null
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Visits',
					align: 'high'
				},
				labels: {
					overflow: 'justify'
				}
			},
			tooltip: {
				valueSuffix: ' '
			},
			plotOptions: {
				bar: {
					dataLabels: {
						enabled: true
					}
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: -5,
				y: 50,
				floating: true,
				borderWidth: 1,
				backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
				shadow: true
			},
			credits: {
				enabled: false
			},
			series: [{
				name: 'testLocation bw',
				data: [$scope.locations.subloc_percent_qualified_visits[0], $scope.locations.subloc_percent_engaged_visits[0], $scope.locations.subloc_percent_visits_potential[0]]
			}, {
				name: 'testLocation ss',
				data: [$scope.locations.subloc_percent_qualified_visits[1], $scope.locations.subloc_percent_engaged_visits[1], $scope.locations.subloc_percent_visits_potential[1]]
			}, {
				name: 'testLocation oceanside',
				data: [$scope.locations.subloc_percent_qualified_visits[2], $scope.locations.subloc_percent_engaged_visits[2], $scope.locations.subloc_percent_visits_potential[2]]
			}]
			});
	};
	
	//load visits chart
	$scope.buildVisitsChart = function (){
			$('#visits').highcharts({
				chart: {
					type: 'column'
				},
				title: {
					text: 'Visits'
				},
				xAxis: {
					categories: $scope.buildCategoriesArray("ts")
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Visits '
					}
				},
				tooltip: {
					headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
					pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
					footerFormat: '</table>',
					shared: true,
					useHTML: true
				},
				plotOptions: {
					column: {
						pointPadding: 0.2,
						borderWidth: 0
					}
				},
				credits: {
				enabled: false
				},
				series: [{
					name: 'Walkby',
					data: $scope.buildLabelArray('walkby')
		
				}, {
					name: 'Bounce',
					data: $scope.buildLabelArray('bounce')
		
				}, {
					name: 'Qualified',
					data: $scope.buildLabelArray('qualified')
		
				}, {
					name: 'Engaged',
					data: $scope.buildLabelArray('engaged')
		
				}, {
					name: 'Once',
					data: $scope.buildLabelArray('once')
				
				}, {
					name: 'Seen',
					data: $scope.buildLabelArray('seen')
				
				}, {
					name: 'Freq',
					data: $scope.buildLabelArray('freq')
				
				}, {
					name: 'Potential',
					data: $scope.buildLabelArray('potential')
				
				}, {
					name: 'Pep',
					data: $scope.buildLabelArray('pep')
					
				}, {
					name: 'Pev',
					data: $scope.buildLabelArray('pev')
							
				}]
			});
	};
	
	//build x-axis date for visits chart
	$scope.buildCategoriesArray = function (name){
		var visitsArray = $scope.locations.visits;
		var categoriesArray = [];
		for	(var index = 0; index < visitsArray.length; index++) {
			categoriesArray[index] = visitsArray[index][name].substring(5,10);
		} 
		return categoriesArray;
	};
	
	//build bottom labels for visits chart
	$scope.buildLabelArray = function (label){
		var visitsArray = $scope.locations.visits;
		var labelArray = [];
		for	(var index = 0; index < visitsArray.length; index++) {
			labelArray[index] = visitsArray[index][label];
		} 
		return labelArray;
	};
	
	//load total by dwell chart
	$scope.buildTotalByDwellChart = function (){
		$('#total_by_dwell').highcharts({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				borderWidth: 1,//border of the chart
				borderColor: '#cccccc',
			},
			title: {
				text: 'Total by Dwell'
			},
			tooltip: {
				pointFormat: '{point.y}</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.y}',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			credits: {
				enabled: false
			},
			series: [{
				type: 'pie',
				name: '',
				data: [
					['Walkby', $scope.locations.total_by_dwell['walkby']],
					['Qualified', $scope.locations.total_by_dwell['qualified']],
					{
						name: 'Bounce',
						y: $scope.locations.total_by_dwell['bounce'],
						sliced: true,
						selected: true
					},
					['Engaged', $scope.locations.total_by_dwell['engaged']]
				]
			}]
		});	
	};
	
	//load total by freq chart
	$scope.buildTotalByFreqChart = function (){
		$('#total_by_freq').highcharts({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: 1,//null,
				plotShadow: false
			},
			title: {
				text: 'Total by Freq'
			},
			tooltip: {
				pointFormat: '{point.y}</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.y}',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			credits: {
				enabled: false
			},
			series: [{
				type: 'pie',
				name: '',
				data: [
					['Once', $scope.locations.total_by_freq['once']],
					['Freq', $scope.locations.total_by_freq['freq']],
					{
						name: 'Seen',
						y: $scope.locations.total_by_freq['seen'],
						sliced: true,
						selected: true
					}
				]
			}]
		});	
	};
	
	//load total by dwell bracket chart
	$scope.buildTotalByDwellBracketChart = function (){
		$('#total_by_dwell_bracket').highcharts({
			colors: ['#88eeba', '#2de889', '#14b463', '#319366', '#078b67', '#245b42'],//custom colors
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,//border of the plot
				plotShadow: false,
				borderWidth: 1,//border of the chart
				borderColor: '#cccccc',
				width: 550,//width of the chart
				height: 450,//height of the chart
				marginLeft: -50,//move plot left
				spacingBottom: 100//bottom space
			},
			title: {
				text: 'Dwell Time',
				x:-160,
				y:30
			},
			tooltip: {
				pointFormat: '<div class="themeColor"><span class="large">{point.percentage:.0f}%</span>  ({point.y})<br/>VISITORS SPENT<br/>{point.name}<br/><span class="highlight">compared to all-time average of <em>{point.total}</em></span><br/></div>',
				headerFormat: '',
				footerFormat: '',
				shared: true,
				useHTML: true //allow custom tooltip contents
			},	
        	plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false,//turn off labels
						format: '',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			subtitle: {
				text: '<span class="labels">This is a sample text! XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span><div class="labels">This is another sample text! XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>',
				floating: true,
				align: 'center',
				useHTML: true,
				x: -10,
				verticalAlign: 'bottom',
				y: 40
        	},
			credits: {
				enabled: false //control credits
			},
			legend: {//don't forget the showInLengend switch in series
				enabled: true,
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				y: 80,
				x: -50
			},
			series: [{
				type: 'pie',
				name: '',
				showInLegend: true,//lengend switch
				data: [//load data here
					{
						name: '5-10 mins',
						y: $scope.locations.total_by_dwell_bracket['b2'],
						sliced: true,
						selected: true
					},
					['10-15 mins', $scope.locations.total_by_dwell_bracket['b3']],
					['15-30 mins', $scope.locations.total_by_dwell_bracket['b4']],
					['30-60 mins', $scope.locations.total_by_dwell_bracket['b5']],
					['>60 mins', $scope.locations.total_by_dwell_bracket['b6']]
				]
			}]
		});	
	};
	
	//load average visits per hour of the month chart
	$scope.buildAvgHoursChart = function (){
		$('#avg_hours').highcharts({
			title: {
				text: 'Average Visits Per Hour in November',
				x: -20 //center
			},
			xAxis: {
				categories: ['01:00', '02:00', '03:00', '04:00', '05:00',
					'06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
			},
			yAxis: {
				title: {
					text: 'Visits'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				valueSuffix: ''
			},
			credits: {
				enabled: false
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				name: 'Visits',
				data: $scope.locations.avg_hours
			}]
		});
	};
	
	//load average visits per day of the month chart
	$scope.buildAvgDaysChart = function (){
		$('#avg_days').highcharts({
			title: {
				text: 'Average Visits Per Day in November',
				x: -20 //center
			},
			xAxis: {
				categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
					'Friday', 'Saturday']
			},
			yAxis: {
				title: {
					text: 'Visits'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				valueSuffix: ''
			},
			credits: {
				enabled: false
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				name: 'Visits',
				data: $scope.locations.avg_days
			}]
		});
	};
	//
  });
}]);
