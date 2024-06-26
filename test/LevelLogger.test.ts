/* eslint-disable sort-keys */
/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import {type ILoggerLike, LevelLogger, LogLevel, type LogLevelValue} from '../src/';

const expect = chai.expect;

const traceSpy = sinon.spy();
const infoSpy = sinon.spy();
const warnSpy = sinon.spy();
const errorSpy = sinon.spy();
const debugSpy = sinon.spy();

const spyLogger: ILoggerLike = {
	trace: traceSpy,
	info: infoSpy,
	warn: warnSpy,
	error: errorSpy,
	debug: debugSpy,
};

const logger = new LevelLogger(spyLogger);

function setToAll(message: string) {
	logger.trace(message);
	logger.info(message);
	logger.debug(message);
	logger.warn(message);
	logger.error(message);
}

describe('LevelLogger', () => {
	beforeEach(() => {
		traceSpy.resetHistory();
		infoSpy.resetHistory();
		warnSpy.resetHistory();
		errorSpy.resetHistory();
		debugSpy.resetHistory();
	});
	it('should be trace level', async () => {
		logger.setLoggerLevel(LogLevel.Trace);
		setToAll('demo');
		expect(traceSpy.called).to.be.true;
		expect(debugSpy.called).to.be.true;
		expect(infoSpy.called).to.be.true;
		expect(warnSpy.called).to.be.true;
		expect(errorSpy.called).to.be.true;
		expect(logger.getLoggerLevel()).to.be.equal(LogLevel.Trace);
		expect(debugSpy.firstCall.args.length).to.be.equal(1);
	});
	it('should be default = debug', async () => {
		logger.setLoggerLevel();
		setToAll('demo');
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.true;
		expect(infoSpy.called).to.be.true;
		expect(warnSpy.called).to.be.true;
		expect(errorSpy.called).to.be.true;
		expect(logger.getLoggerLevel()).to.be.equal(LogLevel.Debug);
	});
	it('should be info level', async () => {
		logger.setLoggerLevel(LogLevel.Info);
		setToAll('demo');
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.true;
		expect(warnSpy.called).to.be.true;
		expect(errorSpy.called).to.be.true;
		expect(logger.getLoggerLevel()).to.be.equal(LogLevel.Info);
	});
	it('should be warn level', async () => {
		logger.setLoggerLevel(LogLevel.Warn);
		setToAll('demo');
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.true;
		expect(errorSpy.called).to.be.true;
		expect(logger.getLoggerLevel()).to.be.equal(LogLevel.Warn);
	});
	it('should be error level', async () => {
		logger.setLoggerLevel(LogLevel.Error);
		setToAll('demo');
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.false;
		expect(errorSpy.called).to.be.true;
		expect(logger.getLoggerLevel()).to.be.equal(LogLevel.Error);
	});
	it('should fail to add wrong initial level to logger', async () => {
		expect(() => new LevelLogger(spyLogger, -1 as LogLevelValue)).to.throw(TypeError, 'Invalid log level: -1, expected one of [0, 1, 2, 3, 4, 5]');
	});
	it('should not log with empty logger', async () => {
		logger.setLogger(undefined);
		setToAll('demo');
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.false;
		expect(errorSpy.called).to.be.false;
	});
});
