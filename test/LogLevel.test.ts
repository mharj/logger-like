/* eslint-disable sort-keys */
/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import {assertLogLevel, getLogLevelName, LogLevel, type LogLevelValue} from '../src/';

const expect = chai.expect;

describe('LogLevel', () => {
	describe('getLogLevelName', () => {
		it('should get correct string value for log level', async () => {
			expect(getLogLevelName(LogLevel.Trace)).to.be.equal('Trace');
			expect(getLogLevelName(LogLevel.Debug)).to.be.equal('Debug');
			expect(getLogLevelName(LogLevel.Info)).to.be.equal('Info');
			expect(getLogLevelName(LogLevel.Warn)).to.be.equal('Warn');
			expect(getLogLevelName(LogLevel.Error)).to.be.equal('Error');
		});
		it('should throw error for invalid log level', async () => {
			expect(() => getLogLevelName(-1 as LogLevelValue)).to.throw(TypeError, 'Invalid log level: -1');
			expect(() => getLogLevelName('Debug' as unknown as LogLevelValue)).to.throw(TypeError, 'Invalid log level: Debug');
		});
	});
	describe('assertLogLevel', () => {
		it('should not throw error for valid log level', async () => {
			expect(() => assertLogLevel(LogLevel.Trace)).to.not.throw();
			expect(() => assertLogLevel(LogLevel.Debug)).to.not.throw();
			expect(() => assertLogLevel(LogLevel.Info)).to.not.throw();
			expect(() => assertLogLevel(LogLevel.Warn)).to.not.throw();
			expect(() => assertLogLevel(LogLevel.Error)).to.not.throw();
		});
		it('should throw error for invalid log level', async () => {
			expect(() => assertLogLevel(-1 as LogLevelValue)).to.throw(TypeError, 'Invalid log level: -1, expected one of [0, 1, 2, 3, 4, 5]');
			expect(() => assertLogLevel('Debug' as unknown as LogLevelValue)).to.throw(TypeError, 'Invalid log level: Debug, expected one of [0, 1, 2, 3, 4, 5]');
		});
	});
});
