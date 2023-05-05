/* eslint-disable sort-keys */
/* eslint-disable no-unused-expressions */
import 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import {ILoggerLike, LevelLogger, LogLevel} from '../src/';

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
		logger.setLogLevel(LogLevel.Trace);
		setToAll('demo');
		expect(traceSpy.called).to.be.true;
		expect(debugSpy.called).to.be.true;
		expect(infoSpy.called).to.be.true;
		expect(warnSpy.called).to.be.true;
		expect(errorSpy.called).to.be.true;
	});
	it('should be default = debug', async () => {
		logger.setLogLevel();
		setToAll('demo');
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.true;
		expect(infoSpy.called).to.be.true;
		expect(warnSpy.called).to.be.true;
		expect(errorSpy.called).to.be.true;
	});
	it('should be info level', async () => {
		logger.setLogLevel(LogLevel.Info);
		setToAll('demo');
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.true;
		expect(warnSpy.called).to.be.true;
		expect(errorSpy.called).to.be.true;
	});
	it('should be warn level', async () => {
		logger.setLogLevel(LogLevel.Warn);
		setToAll('demo');
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.true;
		expect(errorSpy.called).to.be.true;
	});
	it('should be error level', async () => {
		logger.setLogLevel(LogLevel.Error);
		setToAll('demo');
		expect(traceSpy.called).to.be.false;
		expect(debugSpy.called).to.be.false;
		expect(infoSpy.called).to.be.false;
		expect(warnSpy.called).to.be.false;
		expect(errorSpy.called).to.be.true;
	});
});
