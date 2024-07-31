/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import {DemoService, type DemoServiceLogMappingType} from './mockup/DemoMapLogger';
import {type ILoggerLike, LogLevel} from '../src/';

const expect = chai.expect;

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

let mapLevels: DemoServiceLogMappingType;

let service: DemoService;

describe('LevelLogger', function () {
	beforeEach(function () {
		traceSpy.resetHistory();
		infoSpy.resetHistory();
		warnSpy.resetHistory();
		errorSpy.resetHistory();
		debugSpy.resetHistory();
		service = new DemoService(spyLogger);
		mapLevels;
	});
	it('should map test() to trace level', function () {
		service.setLogMapping({test: LogLevel.Trace});
		service.test();
		expect(traceSpy.called).to.be.true;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.false;
		expect(errorSpy.called).to.be.false;
		expect(traceSpy.calledWith('DemoService test() method')).to.be.true;
	});
	it('should map test() to debug level', function () {
		service.setLogMapping({test: LogLevel.Debug});
		service.test2();
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.true;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.false;
		expect(errorSpy.called).to.be.false;
		expect(debugSpy.calledWith('DemoService test() method')).to.be.true;
	});
	it('should map test() to info level', function () {
		service.setLogMapping({test: LogLevel.Info});
		service.test();
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.true;
		expect(warnSpy.called).to.be.false;
		expect(errorSpy.called).to.be.false;
		expect(infoSpy.calledWith('DemoService test() method')).to.be.true;
	});
	it('should map test() to warn level', function () {
		service.setLogMapping({test: LogLevel.Warn});
		service.test();
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.true;
		expect(errorSpy.called).to.be.false;
		expect(warnSpy.calledWith('DemoService test() method')).to.be.true;
	});
	it('should map input() to error level', function () {
		service.setLogMapping({input: LogLevel.Error});
		service.input();
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.false;
		expect(errorSpy.called).to.be.true;
		expect(errorSpy.calledWith('DemoService input() method')).to.be.true;
	});
	it('should map input() to error level', function () {
		service.setLogMapping({input: LogLevel.None});
		service.allLogMapSet(LogLevel.Error);
		expect(() => service.allLogMapSet(LogLevel.Error)).to.throw(Error, 'allLogMapSet: backupMap is already set, call allLogMapReset first');
		service.input();
		service.allLogMapReset();
		expect(traceSpy.called).to.be.true;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.false;
		expect(errorSpy.called).to.be.true;
		expect(errorSpy.calledWith('DemoService input() method')).to.be.true;
	});
	it('should throw if key does not exists or undefined', function () {
		service.setLogMapping({input: undefined} as any);
		expect(() => service.input()).to.throw(Error, 'MapLogger: Unknown log key: input');
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.false;
		expect(errorSpy.called).to.be.false;
	});
	it('should throw if key is not valid', function () {
		service.setLogMapping({input: 'not-valid'} as any);
		expect(() => service.input()).to.throw(Error, 'Invalid log level: not-valid, expected one of [0, 1, 2, 3, 4, 5]');
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.false;
		expect(errorSpy.called).to.be.false;
	});
	it('should not log if logger is undefined', function () {
		service.setLogger(undefined);
		service.input();
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.false;
		expect(errorSpy.called).to.be.false;
	});
	it('test empty logging', function () {
		service = new DemoService();
		service.input();
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.false;
		expect(errorSpy.called).to.be.false;
	});
	it('test default logger methods', function () {
		service = new DemoService(spyLogger);
		service.testDefaultMethods();
		expect(traceSpy.called).to.be.true;
		expect(debugSpy.called).to.be.true;
		expect(infoSpy.called).to.be.true;
		expect(warnSpy.called).to.be.true;
		expect(errorSpy.called).to.be.true;
	});
});
