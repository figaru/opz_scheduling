export class Log{
	constructor(debug){
		this.debug = debug;
	}
}

Log.prototype = {
	set: function(bool){
		this.debug = bool;
	},
	log: function(text){
		if(!this.debug)
			return;
		
		console.log(text);
	}
}