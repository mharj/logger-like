/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import {assertLogLevel, getLogLevelName, LogLevel, type LogLevelValue} from '../src/index.js';

const expect = chai.expect;

describe('LogLevel', function () {
	describe('getLogLevelName', function () {
		it('should get correct string value for log level', function () {
			expect(getLogLevelName(LogLevel.Trace)).to.be.equal('Trace');
			expect(getLogLevelName(LogLevel.Debug)).to.be.equal('Debug');
			expect(getLogLevelName(LogLevel.Info)).to.be.equal('Info');
			expect(getLogLevelName(LogLevel.Warn)).to.be.equal('Warn');
			expect(getLogLevelName(LogLevel.Error)).to.be.equal('Error');
		});
		it('should throw error for invalid log level', function () {
			expect(() => getLogLevelName(-1 as LogLevelValue)).to.throw(TypeError, 'Invalid log level: -1');
			expect(() => getLogLevelName('Debug' as unknown as LogLevelValue)).to.throw(TypeError, 'Invalid log level: Debug');
		});
	});
	describe('assertLogLevel', function () {
		it('should not throw error for valid log level', function () {
			expect(() => assertLogLevel(LogLevel.Trace)).to.not.throw();
			expect(() => assertLogLevel(LogLevel.Debug)).to.not.throw();
			expect(() => assertLogLevel(LogLevel.Info)).to.not.throw();
			expect(() => assertLogLevel(LogLevel.Warn)).to.not.throw();
			expect(() => assertLogLevel(LogLevel.Error)).to.not.throw();
		});
		it('should throw error for invalid log level', function () {
			expect(() => assertLogLevel(-1 as LogLevelValue)).to.throw(TypeError, 'Invalid log level: -1, expected one of [0, 1, 2, 3, 4, 5]');
			expect(() => assertLogLevel('Debug' as unknown as LogLevelValue)).to.throw(TypeError, 'Invalid log level: Debug, expected one of [0, 1, 2, 3, 4, 5]');
		});
	});
});
