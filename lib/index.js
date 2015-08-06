'use strict';
var npmName = require('npm-name');

/**
 * This function will use the given prompt config and will then check if the value is
 * available as a name on npm. If the name is already picked, we'll ask the user to
 * confirm or pick another name.
 * @param  {Object}   prompt   Inquirer prompt configuration
 * @param  {inquirer} inquirer Object with a `prompt` method. Usually `inquirer` or a
 *                             yeoman-generator.
 * @param  {Function} cb       Callback taking the prompt value as parameter
 */
module.exports = function askName(prompt, inquirer, cb) {
  var prompts = [prompt, {
    type: 'confirm',
    name: 'askAgain',
    message: 'The name above already exists on npm, choose another?',
    default: true,
    when: function (answers) {
      var done = this.async();

      npmName(answers[prompt.name], function (err, available) {
        if (err) {
          return done();
        }

        if (available) {
          return done();
        }

        return done(true);
      });
    }
  }];

  inquirer.prompt(prompts, function (props) {
    if (props.askAgain) {
      return askName(prompt, inquirer, cb);
    }

    cb(props[prompt.name]);
  });
};
