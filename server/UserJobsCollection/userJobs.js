import later from 'later';

//UserJobs = JobCollection('UserJobs');

//Task #1 - UserDailyJob 
/*
	TODO:
		run everyday at 00:00

*/
var userJobs;
later.date.UTC();

Meteor.methods({
	'userJobs':function(){
		//remove Jobs
		JobServerStatus.remove({});
		UserJobs.remove({});

		//instatiate userJobs class 
		userJobs = new UserJobsScheduler();
		//initialize job server
		userJobs.init();

	},
	'userJobs.init':function(){
		userJobs.addJob('user_daily', {}, later.parse.text('every 2 min'), 3000);
		//userJobs.init();
	},	
	'userJobs.create':function(){
		userJobs.addJob('user_engagement', {}, later.parse.text('at 10:15am every weekday'), 3000);
	}
});



//######################################## UserJobsCollection #######################################
//create a userJobs class
export class UserJobsScheduler{
	constructor(){
		//UserJobs.remove({});
		JobServerStatus.insert(this);

		//setup class variables
		this.jobTypes = ['user_daily'];
		this.serverRunning = false;
		this.debug = true;

		//constructor message 
		this.log("Instatiating UserJobs Class");
	}
};

//UserJobs Functions
UserJobsScheduler.prototype = {
	//initiliaze the user jobs class
	init: function(params){
		//initialize job server
		this.start();

		//get all the types of jobs in collection
		this.setupJobTypes();

		//start processing jobs
		this.processJobs();

		//setup default jobs
		this.setupDefaultJobs();

		//finished initializing class
		this.log("Finished initializing userjob server.");
	},
	setupDefaultJobs(){
		//user Daily job -> check if user has started logging he's workable hours
		//if not then send email asking if he is on holiday
		this.addJob('user_daily', {}, later.parse.text('at 11:50pm everyday'), 0);

		//this.addJob('user_daily', {}, later.parse.text('at 10:15am every weekday'), later.parse.text('at 1:15am'));
		///userJobs.addJob('user_engagement', {}, later.parse.text('at 10:15am every weekday'), 3000);
	},
	setupJobTypes:function(){
		mongoUserJobs = UserJobs._collection.rawCollection() // you're now on the mongo realm

		//aggregate to find deferant job types
		//these types later used in processing
		mongoUserJobs.aggregate([
		  {
		    $group: {
		      _id: "$type",
		      Total: { $sum: 1 }
		    }
		  }
		], function(err, agg) {
		  if (err) {
		  	this.log(err);   
		    return;
		  }

		  //remove all types
		  this.jobTypes = [];

		  // agg an array of { job types, Total }, add each type to array
		  for (var i = 0; i < agg.length; i++) {
		  	this.jobTypes.push(agg[i]);
		  }		
		});
	},
	addJob:function(type, data, schedule, wait){
		// Create a jobs

	    if(!this.jobTypes.includes(type)){
	    	this.jobTypes.push(type);
	    }

	    if( UserJobs.findOne({type: type}) ){
	    	this.log("Type job already exists");
	    	return;
	    }

		var job = new Job(UserJobs, type, data).priority('normal').repeat({
			schedule: schedule,
		  	backoff: 'constant'
		})
		.retry({
			wait: wait
		})
		.save();
	},
	processJobs:function(){
		//only process jobs from the userJobs collection
		var that = this;

		var i = 0;
		UserJobs.processJobs(this.jobTypes,{
			  	pollInterval: 1000, 
			},
			function (job, callback) {
				//make sure the job is the corrent type
				
				this.log("################# RUNNING 11:45pm JOB ####################");
				this.log(job);

				// Pass a non-object result
				// so that task can be rerun again

				Meteor.setTimeout(function(){ 
					job.done();
					this.log("################### FINISHED JOB ######################");
					//job.remove();
					callback();
				}, 15000);
			}
		);
	},
	//clear all jobs in the UserJobs Collection
	clearAllJobs:function(){ UserJobs.remove({}); },
	//clear all COMPLETED jobs in UserJobs Collection
	clearCompletedJobs: function(){ UserJobs.remove({status: "completed"}); },
	//get UserJobs Server status - if running or not
	serverRunning:function(){ return this.serverRunning; },
	//start UserJobs Server
	start:function(){
		UserJobs.startJobServer({},function(err, data){
			if(err){
				this.serverRunning = false;
			}
			this.serverRunning = true;
		});
	},
	//stop UserJobs Server
	stop:function(){
		UserJobs.stopJobServer({},function(err, data){
			if(err){
				this.serverRunning = false;
			}
			this.serverRunning = false;
		});
	},
	//log data if debug == true
	log:function(data){
		if(this.debug)
			console.log(data);
	},
	//set debugging mode to allow loggin
	debug: function(bool){
		this.debug = bool;
	},
}




	