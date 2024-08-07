import {assertLogLevel, LogLevel, type LogLevelValue} from './LogLevel';
import {type IGetLoggerLevel, type ISetLoggerLevel} from './ILoggerLevel';
import {type ILoggerLike} from './ILoggerLike';
import {type ISetOptionalLogger} from './ISetLogger';

/**
 * logger class implementation which can set log levels
 */
export class LevelLogger implements ILoggerLike, IGetLoggerLevel, ISetLoggerLevel, ISetOptionalLogger {
	private _logger: ILoggerLike | undefined;
	private _level: LogLevelValue;

	/**
	 * Logger constructor with logger and initial log level
	 */
	constructor(logger: ILoggerLike | undefined, level: LogLevelValue = LogLevel.Debug) {
		this._logger = logger;
		assertLogLevel(level);
		this._level = level;
	}

	public setLogger(logger: ILoggerLike | undefined): void {
		this._logger = logger;
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
	public setLoggerLevel(level?: LogLevelValue) {
		level !== undefined && assertLogLevel(level);
		this._level = level !== undefined ? level : LogLevel.Debug;
	}

	/**
	 * Get current log level
	 */
	public getLoggerLevel(): LogLevelValue {
		return this._level;
	}

	/**
	 * trace level logging if current log level is trace or lower
	 */
	public trace(message: any, ...args: any[]): void {
		this.handleLogging(LogLevel.Trace, this._logger?.trace, message, ...args);
	}

	/**
	 * debug level logging if current log level is debug or lower
	 */
	public debug(message: any, ...args: any[]): void {
		this.handleLogging(LogLevel.Debug, this._logger?.debug, message, ...args);
	}

	/**
	 * info level logging if current log level is info or lower
	 */
	public info(message: any, ...args: any[]): void {
		this.handleLogging(LogLevel.Info, this._logger?.info, message, ...args);
	}

	/**
	 * warn level logging if current log level is warn or lower
	 */
	public warn(message: any, ...args: any[]): void {
		this.handleLogging(LogLevel.Warn, this._logger?.warn, message, ...args);
	}

	/**
	 * error level logging if current log level is error or lower
	 */
	public error(message: any, ...args: any[]): void {
		this.handleLogging(LogLevel.Error, this._logger?.error, message, ...args);
	}

	/**
	 * handle logging if current log level is equal or lower than given level and method is defined
	 */
	private handleLogging(level: LogLevelValue, method: ((message: any, ...args: any[]) => void) | undefined, message: any, ...args: any[]): void {
		if (this._level <= level && method) {
			if (args.length === 0) {
				method(message);
			} else {
				method(message, ...args);
			}
		}
	}
}
