import {beforeEach, describe, expect, it, vi} from 'vitest';
import {type ILoggerLike, LevelLogger, LogLevel, type LogLevelValue} from '../src/index.mjs';

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

const logger = new LevelLogger(spyLogger);

function setToAll(message: string, ...args: any[]) {
	logger.trace(message, ...args);
	logger.info(message, ...args);
	logger.debug(message, ...args);
	logger.warn(message, ...args);
	logger.error(message, ...args);
}

describe('LevelLogger', function () {
	beforeEach(function () {
		traceSpy.mockClear();
		infoSpy.mockClear();
		warnSpy.mockClear();
		errorSpy.mockClear();
		debugSpy.mockClear();
	});
	it('should be trace level', function () {
		logger.setLoggerLevel(LogLevel.Trace);
		setToAll('demo', 'test');
		expect(traceSpy).toHaveBeenCalled();
		expect(debugSpy).toHaveBeenCalled();
		expect(infoSpy).toHaveBeenCalled();
		expect(warnSpy).toHaveBeenCalled();
		expect(errorSpy).toHaveBeenCalled();
		expect(logger.getLoggerLevel()).to.be.equal(LogLevel.Trace);
		expect(debugSpy.mock.calls[0]?.length).to.be.equal(2);
	});
	it('should be default = debug', function () {
		logger.setLoggerLevel();
		setToAll('demo');
		expect(traceSpy).not.toHaveBeenCalled();
		expect(debugSpy).toHaveBeenCalled();
		expect(infoSpy).toHaveBeenCalled();
		expect(warnSpy).toHaveBeenCalled();
		expect(errorSpy).toHaveBeenCalled();
		expect(logger.getLoggerLevel()).to.be.equal(LogLevel.Debug);
	});
	it('should be info level', function () {
		logger.setLoggerLevel(LogLevel.Info);
		setToAll('demo');
		expect(traceSpy).not.toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).toHaveBeenCalled();
		expect(warnSpy).toHaveBeenCalled();
		expect(errorSpy).toHaveBeenCalled();
		expect(logger.getLoggerLevel()).to.be.equal(LogLevel.Info);
	});
	it('should be warn level', function () {
		logger.setLoggerLevel(LogLevel.Warn);
		setToAll('demo');
		expect(traceSpy).not.toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).not.toHaveBeenCalled();
		expect(warnSpy).toHaveBeenCalled();
		expect(errorSpy).toHaveBeenCalled();
		expect(logger.getLoggerLevel()).to.be.equal(LogLevel.Warn);
	});
	it('should be error level', function () {
		logger.setLoggerLevel(LogLevel.Error);
		setToAll('demo');
		expect(traceSpy).not.toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).not.toHaveBeenCalled();
		expect(warnSpy).not.toHaveBeenCalled();
		expect(errorSpy).toHaveBeenCalled();
		expect(logger.getLoggerLevel()).to.be.equal(LogLevel.Error);
	});
	it('should fail to add wrong initial level to logger', function () {
		expect(() => new LevelLogger(spyLogger, -1 as LogLevelValue)).to.throw(TypeError, 'Invalid log level: -1, expected one of [0, 1, 2, 3, 4, 5]');
	});
	it('should not log with empty logger', function () {
		logger.setLogger(undefined);
		setToAll('demo');
		expect(traceSpy).not.toHaveBeenCalled();
		expect(debugSpy).not.toHaveBeenCalled();
		expect(infoSpy).not.toHaveBeenCalled();
		expect(warnSpy).not.toHaveBeenCalled();
		expect(errorSpy).not.toHaveBeenCalled();
	});
	it('should get toString()', function () {
		logger.setLogger(spyLogger);
		logger.setLoggerLevel(LogLevel.Debug);
		expect(logger.toString()).to.be.eq('LevelLogger(logger: true, level: Debug)');
	});
	it('should get toJSON()', function () {
		logger.setLogger(spyLogger);
		logger.setLoggerLevel(LogLevel.Debug);
		expect(logger.toJSON()).to.be.eql({
			$class: 'LevelLogger',
			logger: true,
			level: LogLevel.Debug,
		});
	});
});
