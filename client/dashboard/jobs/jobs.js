import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './jobs.html';
import './jobs.css';


Template.jobs.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.jobs.helpers({
  jobs() {
    return UserJobs.find({}, {sort:{after: -1}}).fetch();
  },
});

Template.job.helpers({
	when(date){
		var date = Date.diff(new Date(date).getTime(), new Date().getTime());

		if(date.seconds < 0){
			return "";
		}

		if(date.days <= 0){
			if(date.hours <= 0){
				if(date.minutes <= 0){
					if(date.seconds <= 1)
						return date.seconds + " second to go";

					return date.seconds + " seconds to go";
				}else{
					if(date.minutes <= 1)
						return date.minutes + " minute to go";

					return date.minutes + " minutes to go";
				}
			}else{
				if(date.hours <= 1)
					return date.hours + " hour to go";

				return date.hours + " hours to go"
			}22
		}else{
			if(date.days <= 1)
				return date.days + " day to go";

			return date.days + " days to go";
		}
	},
	work(){
		var val = this.progress.percent;
		return '<div class="progress-bar" role="progressbar" aria-valuenow="'+val+'" aria-valuemin="0" aria-valuemax="100" style="width:'+val+'%;" >'+val+'%</div>';
	}
});


(function() {

  function DateDiff(date1, date2) {
    this.days = null;
    this.hours = null;
    this.minutes = null;
    this.seconds = null;
    this.date1 = date1;
    this.date2 = date2;

    this.init();
  }

  DateDiff.prototype.init = function() {
    var data = new DateMeasure(this.date1 - this.date2);
    this.days = data.days;
    this.hours = data.hours;
    this.minutes = data.minutes;
    this.seconds = data.seconds;
  };

  function DateMeasure(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    
    this.days = d;
    this.hours = h;
    this.minutes = m;
    this.seconds = s;
  };

  Date.diff = function(date1, date2) {
    return new DateDiff(date1, date2);
  };

  Date.prototype.diff = function(date2) {
    return new DateDiff(this, date2);
  };

})();