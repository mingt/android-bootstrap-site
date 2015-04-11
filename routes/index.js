var exec = require('child_process').exec;

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
    };
}


/*
 * GET home page.
 */

exports.index = function(req, res){
  var version;
  exec('git submodule status', function(err, stdout, stderr){
      if(err){
          version = '(unkown error, call the webmaster)';
          res.render('index', { title: 'Android Bootstrap', VERSION: version });
      } else {
          if(stdout.startsWith('-') || stdout.startsWith('U')) {
              // git submodule not initialized or contains merge confilcts
              version = '(Android Bootstrap submodule contains error, call the webmaster)';

          } else {
              // bland prefix or '+' prefix is OK, and assume all other situations are OK here 
              version = 'Commit #' + stdout.slice(1,7);

          }
          res.render('index', { title: 'Android Bootstrap', VERSION: version });
      }

  });

};
