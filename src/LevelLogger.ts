/* eslint-disable @typescript-eslint/no-explicit-any */
import {IGetLoggerLevel, ISetLoggerLevel} from './ILoggerLevel';
import {LogLevel, LogLevelValue} from './LogLevel';
import {ILoggerLike} from './ILoggerLike';

/**
 * logger class implementation which can set log levels
 */
export class LevelLogger implements ILoggerLike, IGetLoggerLevel, ISetLoggerLevel {
	private _logger: ILoggerLike;
	private _level: LogLevelValue;

	/**
	 * Logger constructor with logger and initial log level
	 */
	constructor(logger: ILoggerLike, level?: LogLevelValue) {
		this._logger = logger;
		this._level = level || LogLevel.Debug;
	}

	/**
	 * Set current log level
	 * @example
	 * LogLevel.Trace = 0
	 * LogLevel.Debug = 1
	 * LogLevel.Info = 2
	 * LogLevel.Warn = 3
	 * LogLevel.Error = 4
	 */
	public setLogLevel(level?: LogLevelValue) {
		this._level = level !== undefined ? level : LogLevel.Debug;
	}

	/**
	 * Get current log level
	 */
	public getLogLevel(): LogLevelValue {
		return this._level;
	}

	/**
	 * trace level logging if current log level is trace or lower
	 */
	public trace(message: any, ...args: any[]): void {
		if (this._level <= LogLevel.Trace && this._logger.trace) {
			this._logger.trace(message, ...args);
		}
	}

	/**
	 * debug level logging if current log level is debug or lower
	 */
	public debug(message: any, ...args: any[]): void {
		if (this._level <= LogLevel.Debug) {
			this._logger.debug(message, ...args);
		}
	}

	/**
	 * info level logging if current log level is info or lower
	 */
	public info(message: any, ...args: any[]): void {
		if (this._level <= LogLevel.Info) {
			this._logger.info(message, ...args);
		}
	}

	/**
	 * warn level logging if current log level is warn or lower
	 */
	public warn(message: any, ...args: any[]): void {
		if (this._level <= LogLevel.Warn) {
			this._logger.warn(message, ...args);
		}
	}

	/**
	 * error level logging if current log level is error or lower
	 */
	public error(message: any, ...args: any[]): void {
		/* istanbul ignore next - as error is biggest value currently */
		if (this._level <= LogLevel.Error) {
			this._logger.error(message, ...args);
		}
	}
}
