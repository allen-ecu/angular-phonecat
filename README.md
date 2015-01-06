## System Requirements (tested)
-------------------------------
windows 7 x64
IE 9
Chrome v.40
Firefox v.34.0.5
NPM v.1.4.28
Ionic v.1.2.8
NodeJs v.0.10.32(x64)
Highcharts v.4.0.4
Jquery min v.1.11.2
Adobe Dreamweaver CC 2014

## Setup:
--------------------------------
1.install ionic, angularjs, npm,nodejs and other relevant SDKs
2.download the whole zip of "angular-phonecat".
3.upzip to C:\Users\[Username]\angular-phonecat
4.open Node.js command
5.type cd angular-phonecat
6.type npm start
7.open browser, type localhost:8000/app/

## Notice:
When you type "npm start" in the nodejs cmd at the first time, it needs Internet to download some bower_components and node_modules files.

## Reference:
---------------------------------
http://learn.ionicframework.com/videos/windows-android/
https://angularjs.org/
http://www.highcharts.com/
http://purecss.io/

## Developer:
---------------------------------
Mao Weiqing
Perth Western Australia+61 4 3238 8818
dustonlyperth@gmail.com


## Application Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
        app.css         --> overwritten stylesheet
		pure-min.css	--> default framework stylesheet
		grids-responsive.min.css
		grids-responsive-old-ie-min.css
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      js/               --> javascript files
        app.js          --> the main application module
        controllers.js  --> application controllers
		highcharts.js	--> highcharts libraries
		exporting.js	--> exporting highcharts to images
	  json/
		WebDeveloperRecrData.json
      partials/         --> angular view partials (partial html templates) used by ngRoute
        partial1.html
        partial2.html
      bower_components  --> 3rd party js libraries, including angular and jquery


## About AngularJS

For more information on AngularJS please check out http://angularjs.org/

[7 Zip]: http://www.7-zip.org/
[angular-seed]: https://github.com/angular/angular-seed
[DI]: http://docs.angularjs.org/guide/di
[directive]: http://docs.angularjs.org/guide/directive
[filterFilter]: http://docs.angularjs.org/api/ng/filter/filter
[git-home]: http://git-scm.com
[git-github]: http://help.github.com/set-up-git-redirect
[ngRepeat]: http://docs.angularjs.org/api/ng/directive/ngRepeat
[ngView]: http://docs.angularjs.org/api/ngRoute/directive/ngView
[node-download]: http://nodejs.org/download/
[$resource]: http://docs.angularjs.org/api/ngResource/service/$resource
[$route]: http://docs.angularjs.org/api/ngRoute/service/$route
[protractor]: https://github.com/angular/protractor
[jasmine]: http://pivotal.github.com/jasmine/
[karma]: http://karma-runner.github.io

## Version
v 0.2