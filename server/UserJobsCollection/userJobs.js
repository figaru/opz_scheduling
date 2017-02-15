import { Log } from './../logging/log.js';

UserJobs = JobCollection('UserJobs');

//Task #1 
/*
	TODO:
	Aggregation to clalculate averages:
		- Start Hour
		- End Hour
		- Daily total activity

*/

//var logger = new Log();
var userJobs;

Meteor.methods({
	'userJobs':function(){
		//TESTING
		//instatiate userJobs class 
		userJobs = new UserJobs();
	},
	'userJobs.init':function(){
		userJobs.init();
	},	
	'userJobs.start':function(){

	}
});

//create a userJobs class
export class UserJobs{
	constructor(debug){
		this.logger = new Log(debug);
	}
};

//UserJobs Functions
UserJobs.prototype = {
	//initiliaze the user jobs class
	init: function(params){
		this.logger.log("Initializing UserJobs Class");
	},
}




