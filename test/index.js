'use strict';

var assert = require('assert');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var askName = require('../lib');
var Promise = require('pinkie-promise');

describe('inquirer-npm-name', function () {
  beforeEach(function () {
    this.conf = {
      name: 'name',
      message: 'Module name'
    };

    this.inquirer = {
      prompt: sinon.stub()
    };
  });

  it('only ask name if name is free', function () {
    this.inquirer.prompt.returns(Promise.resolve({name: 'foo'}));

    return askName(this.conf, this.inquirer).then(function (props) {
      assert.equal(props.name, 'foo');
    });
  });

  it('recurse if name is taken', function () {
    this.inquirer.prompt
      .onFirstCall().returns(Promise.resolve({name: 'foo', askAgain: true}))
      .onSecondCall().returns(Promise.resolve({name: 'bar'}));

    return askName(this.conf, this.inquirer).then(function (props) {
      assert.equal(props.name, 'bar');
    });
  });

  describe('npm validation logic (inquirer `when` function)', function () {
    beforeEach(function () {
      this.askName2 = proxyquire('../lib', {
        'npm-name': function (name) {
          if (this.npmNameError instanceof Error) {
            return Promise.reject(this.npmNameError);
          }

          return Promise.resolve(name === 'yo');
        }.bind(this)
      });
    });

    it('ask question if npm name is taken', function () {
      this.inquirer.prompt.returns(Promise.resolve({name: 'yo'}));
      this.conf.name = 'yo';

      return this.askName2(this.conf, this.inquirer).then(function () {
        this.when = this.inquirer.prompt.getCall(0).args[0][1].when;
        this.when({name: 'yo'}).then(function (shouldAsk) {
          assert.ok(shouldAsk);
        });
      }.bind(this));
    });

    it('does not ask question if npm name is free', function () {
      this.inquirer.prompt.returns(Promise.resolve({name: 'foo'}));

      return this.askName2(this.conf, this.inquirer).then(function () {
        this.when = this.inquirer.prompt.getCall(0).args[0][1].when;
        this.when({name: 'foo'}).then(function (shouldAsk) {
          assert.ok(shouldAsk);
        });
      }.bind(this));
    });

    it('does not ask if npm-name fails', function () {
      this.inquirer.prompt.returns(Promise.resolve({name: 'foo'}));

      this.npmNameError = new Error('Network Error');
      return this.askName2(this.conf, this.inquirer).then(function () {
        this.when = this.inquirer.prompt.getCall(0).args[0][1].when;

        return this.when({name: 'foo'}).catch(function (err) {
          assert.equal(err.message, 'Network Error');
        });
      }.bind(this));
    });
  });
});
