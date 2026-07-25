import {beforeEach, describe, expect, it, vi} from 'vitest';
import {type ILoggerLike, LogLevel} from '../src/index.mjs';
import {DemoService} from './mockup/DemoMapLogger.mjs';

const traceSpy = vi.fn();
const infoSpy = vi.fn();
const warnSpy = vi.fn();
const errorSpy = vi.fn();
const debugSpy = vi.fn();

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
		traceSpy.mockClear();
		infoSpy.mockClear();
		warnSpy.mockClear();
		errorSpy.mockClear();
		debugSpy.mockClear();
		service = new DemoService(spyLogger);
	});
	it('should map test() to trace level', function () {
		service.setLogMapping({test: LogLevel.Trace});
		service.test();
		expect(traceSpy).toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).not.toHaveBeenCalled();
		expect(warnSpy).not.toHaveBeenCalled();
		expect(errorSpy).not.toHaveBeenCalled();
		expect(traceSpy).toHaveBeenCalledWith('DemoService test() method');
	});
	it('should map test() to debug level', function () {
		service.setLogMapping({test: LogLevel.Debug});
		service.test2();
		expect(traceSpy).not.toHaveBeenCalled();
		expect(debugSpy).toHaveBeenCalled();
		expect(infoSpy).not.toHaveBeenCalled();
		expect(warnSpy).not.toHaveBeenCalled();
		expect(errorSpy).not.toHaveBeenCalled();
		expect(debugSpy.mock.calls[0]?.[0]).to.be.eq('DemoService test() method');
	});
	it('should map test() to info level', function () {
		service.setLogMapping({test: LogLevel.Info});
		service.test();
		expect(traceSpy).not.toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).toHaveBeenCalled();
		expect(warnSpy).not.toHaveBeenCalled();
		expect(errorSpy).not.toHaveBeenCalled();
		expect(infoSpy).toHaveBeenCalledWith('DemoService test() method');
	});
	it('should map test() to warn level', function () {
		service.setLogMapping({test: LogLevel.Warn});
		service.test();
		expect(traceSpy).not.toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).not.toHaveBeenCalled();
		expect(warnSpy).toHaveBeenCalled();
		expect(errorSpy).not.toHaveBeenCalled();
		expect(warnSpy).toHaveBeenCalledWith('DemoService test() method');
	});
	it('should map input() to error level', function () {
		service.setLogMapping({input: LogLevel.Error});
		service.input();
		expect(traceSpy).not.toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).not.toHaveBeenCalled();
		expect(warnSpy).not.toHaveBeenCalled();
		expect(errorSpy).toHaveBeenCalled();
		expect(errorSpy).toHaveBeenCalledWith('DemoService input() method');
	});
	it('should map input() to error level', function () {
		service.setLogMapping({input: LogLevel.None});
		service.allLogMapSet(LogLevel.Error);
		service.input();
		service.allLogMapReset();
		expect(traceSpy).toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).not.toHaveBeenCalled();
		expect(warnSpy).not.toHaveBeenCalled();
		expect(errorSpy).toHaveBeenCalled();
		expect(errorSpy).toHaveBeenCalledWith('DemoService input() method');
	});
	it('should throw if key does not exists or undefined', function () {
		service.setLogMapping({input: undefined} as any);
		expect(() => service.input()).to.throw(Error, 'MapLogger: Unknown log key: input');
		expect(traceSpy).not.toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).not.toHaveBeenCalled();
		expect(warnSpy).not.toHaveBeenCalled();
		expect(errorSpy).not.toHaveBeenCalled();
	});
	it('should throw if key is not valid', function () {
		service.setLogMapping({input: 'not-valid'} as any);
		expect(() => service.input()).to.throw(Error, 'Invalid log level: not-valid, expected one of [0, 1, 2, 3, 4, 5]');
		expect(traceSpy).not.toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).not.toHaveBeenCalled();
		expect(warnSpy).not.toHaveBeenCalled();
		expect(errorSpy).not.toHaveBeenCalled();
	});
	it('should not log if logger is undefined', function () {
		service.setLogger(undefined);
		service.input();
		expect(traceSpy).not.toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).not.toHaveBeenCalled();
		expect(warnSpy).not.toHaveBeenCalled();
		expect(errorSpy).not.toHaveBeenCalled();
	});
	it('test empty logging', function () {
		service = new DemoService();
		service.input();
		expect(traceSpy).not.toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).not.toHaveBeenCalled();
		expect(warnSpy).not.toHaveBeenCalled();
		expect(errorSpy).not.toHaveBeenCalled();
	});
	it('test default logger methods', function () {
		service = new DemoService(spyLogger);
		service.testDefaultMethods();
		expect(traceSpy).toHaveBeenCalled();
		expect(debugSpy).toHaveBeenCalled();
		expect(infoSpy).toHaveBeenCalled();
		expect(warnSpy).toHaveBeenCalled();
		expect(errorSpy).toHaveBeenCalled();
	});
	it('test toString method', function () {
		service = new DemoService(spyLogger);
		expect(service.toString()).to.be.eq('MapLogger(logger: true, {"test":3,"input":2})');
	});
	it('test toJSON method', function () {
		service = new DemoService(spyLogger);
		expect(service.toJSON()).to.be.eql({
			$class: 'MapLogger',
			logger: true,
			map: {
				test: 3,
				input: 2,
			},
		});
	});
});
