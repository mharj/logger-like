/* eslint-disable sort-keys */
/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import {getLogLevelName, LogLevel, LogLevelValue} from '../src/';

const expect = chai.expect;

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
