import { Meteor } from 'meteor/meteor';

import later from 'later';

import './UserJobsCollection/userJobs.js';


var EmailJob = JobCollection('emailJob');

//import './jobs.js';
// code to run on server at startup


var jobs;

Meteor.startup(function () {
	var i = 0;

	//instantiate jobs class
	//jobs = new JobScheduler();
	
	//initialize jobs
	//jobs.init();

	//create NoDataEngagement job
	//noDataEngagement = new NoDataEngagement(ScheduledJobs);

});



/*
Meteor.methods({
	'emailJob.init':function(){
		// Any job document from myJobs can be turned into a Job object
	    console.log(EmailJob);
	},
	'emailJob.remove':function(){
		EmailJob.remove({});
	},
	'emailJob.start':function(){
		EmailJob.startJobServer();
	},
	'emailJob.processJobs':function(){
		EmailJob.processJobs('dailyMessage',{
			  	pollInterval: 1000, 
			},
			function (job, callback) {
				//console.log("--------------- 34: processJobs --------------");
				//console.log(job);
				i++
				if(job._doc.type === "dailyMessage"){
					console.log("------------------- JOB: "+i+" -----------------------")
					console.log(job);
				}

				job.done();
				callback();
			}
		);
	},
	'emailJob.process':function(){

	},
	'emailJob.create':function(type, schedule, data, wait){
		//type = name of the job
		//data = what data should be contained in the job - to later be used by function etc
		//shcedule = when to run the job, eg. every min - later.parse.recur().on('every 1 min').time()
		//when created how long should the job wait for before triggering
		var job = new Job(EmailJob, type, data)
		.repeat({
			schedule: schedule,//later.parse.recur().on('8:30:00').time(),
		  	backoff: 'constant'
		})
		.retry({
			wait: wait
		})
		.save();
	}
});*/