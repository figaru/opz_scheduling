//group users to two buckets -> yes plugins, No plugins
/*


db.getCollection('users').aggregate([

{

    $match:{

        '$or': [

            { "trackers.0": {$exists: false}},

        ],

    }

},

])*/