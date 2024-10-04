/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-unused-expressions */
import * as sinon from 'sinon';
import {beforeEach, describe, expect, it} from 'vitest';
import {type ILoggerLike, LogLevel} from '../src/index.mjs';
import {DemoService} from './mockup/DemoMapLogger.mjs';

const traceSpy = sinon.spy();
const infoSpy = sinon.spy();
const warnSpy = sinon.spy();
const errorSpy = sinon.spy();
const debugSpy = sinon.spy();

const spyLogger: ILoggerLike = {
	debug: debugSpy,
	error: errorSpy,
	info: infoSpy,
	trace: traceSpy,
	warn: warnSpy,
};

let service: DemoService;

describe('LevelLogger', function () {
	beforeEach(function () {
		traceSpy.resetHistory();
		infoSpy.resetHistory();
		warnSpy.resetHistory();
		errorSpy.resetHistory();
		debugSpy.resetHistory();
		service = new DemoService(spyLogger);
	});
	it('should map test() to trace level', function () {
		service.setLogMapping({test: LogLevel.Trace});
		service.test();
		expect(traceSpy.called).to.be.eq(true);
		expect(debugSpy.called).to.be.eq(false);
		expect(infoSpy.called).to.be.eq(false);
		expect(warnSpy.called).to.be.eq(false);
		expect(errorSpy.called).to.be.eq(false);
		expect(traceSpy.calledWith('DemoService test() method')).to.be.eq(true);
	});
	it('should map test() to debug level', function () {
		service.setLogMapping({test: LogLevel.Debug});
		service.test2();
		expect(traceSpy.called).to.be.eq(false);
		expect(debugSpy.called).to.be.eq(true);
		expect(infoSpy.called).to.be.eq(false);
		expect(warnSpy.called).to.be.eq(false);
		expect(errorSpy.called).to.be.eq(false);
		expect(debugSpy.calledWith('DemoService test() method')).to.be.eq(true);
	});
	it('should map test() to info level', function () {
		service.setLogMapping({test: LogLevel.Info});
		service.test();
		expect(traceSpy.called).to.be.eq(false);
		expect(debugSpy.called).to.be.eq(false);
		expect(infoSpy.called).to.be.eq(true);
		expect(warnSpy.called).to.be.eq(false);
		expect(errorSpy.called).to.be.eq(false);
		expect(infoSpy.calledWith('DemoService test() method')).to.be.eq(true);
	});
	it('should map test() to warn level', function () {
		service.setLogMapping({test: LogLevel.Warn});
		service.test();
		expect(traceSpy.called).to.be.eq(false);
		expect(debugSpy.called).to.be.eq(false);
		expect(infoSpy.called).to.be.eq(false);
		expect(warnSpy.called).to.be.eq(true);
		expect(errorSpy.called).to.be.eq(false);
		expect(warnSpy.calledWith('DemoService test() method')).to.be.eq(true);
	});
	it('should map input() to error level', function () {
		service.setLogMapping({input: LogLevel.Error});
		service.input();
		expect(traceSpy.called).to.be.eq(false);
		expect(debugSpy.called).to.be.eq(false);
		expect(infoSpy.called).to.be.eq(false);
		expect(warnSpy.called).to.be.eq(false);
		expect(errorSpy.called).to.be.eq(true);
		expect(errorSpy.calledWith('DemoService input() method')).to.be.eq(true);
	});
	it('should map input() to error level', function () {
		service.setLogMapping({input: LogLevel.None});
		service.allLogMapSet(LogLevel.Error);
		expect(() => service.allLogMapSet(LogLevel.Error)).to.throw(Error, 'allLogMapSet: backupMap is already set, call allLogMapReset first');
		service.input();
		service.allLogMapReset();
		expect(traceSpy.called).to.be.eq(true);
		expect(debugSpy.called).to.be.eq(false);
		expect(infoSpy.called).to.be.eq(false);
		expect(warnSpy.called).to.be.eq(false);
		expect(errorSpy.called).to.be.eq(true);
		expect(errorSpy.calledWith('DemoService input() method')).to.be.eq(true);
	});
	it('should throw if key does not exists or undefined', function () {
		service.setLogMapping({input: undefined} as any);
		expect(() => service.input()).to.throw(Error, 'MapLogger: Unknown log key: input');
		expect(traceSpy.called).to.be.eq(false);
		expect(debugSpy.called).to.be.eq(false);
		expect(infoSpy.called).to.be.eq(false);
		expect(warnSpy.called).to.be.eq(false);
		expect(errorSpy.called).to.be.eq(false);
	});
	it('should throw if key is not valid', function () {
		service.setLogMapping({input: 'not-valid'} as any);
		expect(() => service.input()).to.throw(Error, 'Invalid log level: not-valid, expected one of [0, 1, 2, 3, 4, 5]');
		expect(traceSpy.called).to.be.eq(false);
		expect(debugSpy.called).to.be.eq(false);
		expect(infoSpy.called).to.be.eq(false);
		expect(warnSpy.called).to.be.eq(false);
		expect(errorSpy.called).to.be.eq(false);
	});
	it('should not log if logger is undefined', function () {
		service.setLogger(undefined);
		service.input();
		expect(traceSpy.called).to.be.eq(false);
		expect(debugSpy.called).to.be.eq(false);
		expect(infoSpy.called).to.be.eq(false);
		expect(warnSpy.called).to.be.eq(false);
		expect(errorSpy.called).to.be.eq(false);
	});
	it('test empty logging', function () {
		service = new DemoService();
		service.input();
		expect(traceSpy.called).to.be.eq(false);
		expect(debugSpy.called).to.be.eq(false);
		expect(infoSpy.called).to.be.eq(false);
		expect(warnSpy.called).to.be.eq(false);
		expect(errorSpy.called).to.be.eq(false);
	});
	it('test default logger methods', function () {
		service = new DemoService(spyLogger);
		service.testDefaultMethods();
		expect(traceSpy.called).to.be.eq(true);
		expect(debugSpy.called).to.be.eq(true);
		expect(infoSpy.called).to.be.eq(true);
		expect(warnSpy.called).to.be.eq(true);
		expect(errorSpy.called).to.be.eq(true);
	});
});
