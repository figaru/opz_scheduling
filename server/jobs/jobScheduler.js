import later from 'later';

export class JobScheduler{
	constructor(){
		//clean job collection
		ScheduledJobs.remove({});

		//create a list to add ids of jobs
		this.noEngagementList = [];

	}
}
JobScheduler.prototype = {
	init:function(){
		//initialize job server
		this.start();

		//create default jobs
		this.initDefaultJobs();

		//start processing jobs
		this.processJobs();
	},
	start:function(){
		ScheduledJobs.startJobServer();
	},
	stop:function(){
		ScheduledJobs.stopJobServer();
	},
	initDefaultJobs(){
		this.newJob({
			type: "NoDataEngagement",
			data: {},
			schedule: later.parse.recur().on('every 1 min').time(),
			wait: 3000
		});
	},
	processJobs(){
		ScheduledJobs.processJobs(['NoDataEngagement'],{
			  	pollInterval: 1000, 
			},
			function (job, callback) {
				//make sure the job is the corrent type
				if(job._doc.type === "NoDataEngagement"){
					//when job is trigger perform aggregation to check:
					//If No data has been received by user in the last 6 days.


					//TODO: aggregation
					console.log("job launched");
					console.log(job);

				}
				// Pass a non-object result
				// so that task can be rerun again
				job.done();
				job.remove();
				callback();
			}
		);
	},
	newJob(params){
		//type = name of the job
		//data = what data should be contained in the job - to later be used by function etc
		//shcedule = when to run the job, eg. every min - later.parse.recur().on('every 1 min').time()
		//wait = when created how long should the job wait for before triggering
		switch(params.type) {
		    case 'NoDataEngagement':
		        //create a new no data engagement job
				//this job will run every day at 9pm to check if a user has not sent any data in over 6 days;
				var job = new Job(ScheduledJobs, params.type, params.data)
				.repeat({
					schedule: params.schedule,
				  	backoff: 'constant'
				})
				.retry({
					wait: params.wait
				})
				.save();

		        break;//END NoDataEngagement
		    default:
		        return;
		}

	},
};


