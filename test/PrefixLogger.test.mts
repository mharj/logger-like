import sinon from 'sinon';
import {beforeEach, describe, expect, it} from 'vitest';
import {type ILoggerLike, PrefixLogger} from '../src/index.mjs';

const loggerSpy = sinon.spy();
const logger: ILoggerLike = {
	debug: loggerSpy,
	error: loggerSpy,
	info: loggerSpy,
	trace: loggerSpy,
	warn: loggerSpy,
};

describe('PrefixLogger', function () {
	beforeEach(function () {
		loggerSpy.resetHistory();
	});
	it('should get correct prefix to trace', function () {
		const serviceLogger = new PrefixLogger('service:', logger);
		serviceLogger.trace('trace');
		expect(loggerSpy.called).to.be.eq(true);
		expect(loggerSpy.firstCall.args).to.be.eql(['service:', 'trace']);
	});
	it('should get correct prefix to debug', function () {
		const serviceLogger = new PrefixLogger('service:', logger);
		serviceLogger.debug('debug');
		expect(loggerSpy.called).to.be.eq(true);
		expect(loggerSpy.firstCall.args).to.be.eql(['service:', 'debug']);
	});
	it('should get correct prefix to info', function () {
		const serviceLogger = new PrefixLogger('service:', logger);
		serviceLogger.info('info');
		expect(loggerSpy.called).to.be.eq(true);
		expect(loggerSpy.firstCall.args).to.be.eql(['service:', 'info']);
	});
	it('should get correct prefix to warn', function () {
		const serviceLogger = new PrefixLogger('service:', logger);
		serviceLogger.warn('warn');
		expect(loggerSpy.called).to.be.eq(true);
		expect(loggerSpy.firstCall.args).to.be.eql(['service:', 'warn']);
	});
	it('should get correct prefix to error', function () {
		const serviceLogger = new PrefixLogger('service:', logger);
		serviceLogger.error('error');
		expect(loggerSpy.called).to.be.eq(true);
		expect(loggerSpy.firstCall.args).to.be.eql(['service:', 'error']);
	});
	it('should get toString()', function () {
		const serviceLogger = new PrefixLogger('service:', logger);
		expect(serviceLogger.toString()).to.be.eq(`PrefixLogger(logger: true, prefix: 'service:')`);
	});
	it('should get toString()', function () {
		const serviceLogger = new PrefixLogger('service:', logger);
		expect(serviceLogger.toJSON()).to.be.eql({
			$class: 'PrefixLogger',
			prefix: 'service:',
			logger: true,
		});
	});
});
