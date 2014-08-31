var log = require('db-migrate/lib/log');

var migrationTemplate = [
  "var dbm = require('db-migrate');\nvar type = dbm.dataType;}\n\nexports.up = function(db, callback) {\n",
  "};\n\nexports.down = function(db, callback) {\n",
  "};\n"
];

Builder = function( driver, migrationsDir ) {
  this.driver = driver;
  this.migrationsDir = migrationsDir;
};

Builder.prototype = {

   build: function( config, callback )
   {
      var counter = 0, diff = Array(), self = this;

      this.driver.getTables( config, function( db, dbdiff )
      {
         if( db.length === 0 && 
           ( dbdiff.length === 0 && config.diffDump ) )
         {
            return ++counter;
         }

         diff['tables'] = self.diffArr( db, dbdiff );
         ++counter;
      });

      this.driver.getFn( config, function( db, dbdiff )
      {
         if( db.length === 0 && 
           ( dbdiff.length === 0 && config.diffDump ) )
         {
            return ++counter;
         }

         //ToDo: We don't want only want to check if it exist or not,
         //but to check if it was modified, we need additional information
         //so I'm going to modificate the way how db-migrate behaves.
         //
         //For now this implementation wont take any action.
         diff['fn'] = self.diffArr( db, dbdiff );
         ++counter;
      });
   },

   diffArr: function( arr, diff )
   {
      var differences = Array();
      differences[0] = Array();
      differences[1] = Array();
      var len = ( diff.length > arr.length ) ? diff.length : arr.length;
      if( !diff )
      {
         differences[0] = arr;
      }
      else
      {
         for( var i = 0; i < len; ++i )
         {
            if( diff.length > i && arr.indexOf( diff[i] ) === -1 )
               differences[1].push( diff[i] );

            if( arr.length > i && diff.indexOf( arr[i] ) === -1 )
               differences[0].push( arr[i] );
         }
      }

      return differences;
   },

   close: function()
   {
      if( this.driver )
         this.driver.close();
   }

};
module.exports = Builder;