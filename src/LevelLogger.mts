import {assertLogLevel, LogLevel, type LogLevelValue} from './LogLevel.mjs';
import {type IGetLoggerLevel, type ISetLoggerLevel} from './ILoggerLevel.mjs';
import {type ILoggerLike} from './ILoggerLike.mjs';
import {type ISetOptionalLogger} from './ISetLogger.mjs';

/**
 * logger class implementation which can set log levels
 * @since v0.1.0
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
		if (level) {
			assertLogLevel(level);
		}
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
		this.handleWithLevel(LogLevel.Trace, message, ...args);
	}

	/**
	 * debug level logging if current log level is debug or lower
	 */
	public debug(message: any, ...args: any[]): void {
		this.handleWithLevel(LogLevel.Debug, message, ...args);
	}

	/**
	 * info level logging if current log level is info or lower
	 */
	public info(message: any, ...args: any[]): void {
		this.handleWithLevel(LogLevel.Info, message, ...args);
	}

	/**
	 * warn level logging if current log level is warn or lower
	 */
	public warn(message: any, ...args: any[]): void {
		this.handleWithLevel(LogLevel.Warn, message, ...args);
	}

	/**
	 * error level logging if current log level is error or lower
	 */
	public error(message: any, ...args: any[]): void {
		this.handleWithLevel(LogLevel.Error, message, ...args);
	}

	private handleWithLevel(level: LogLevelValue, message: any, ...args: any[]): void {
		if (this._level <= level) {
			switch (level) {
				case LogLevel.Trace:
					this.handleTrace(message, ...args);
					break;
				case LogLevel.Debug:
					this.handleDebug(message, ...args);
					break;
				case LogLevel.Info:
					this.handleInfo(message, ...args);
					break;
				case LogLevel.Warn:
					this.handleWarn(message, ...args);
					break;
				case LogLevel.Error:
					this.HandleError(message, ...args);
					break;
			}
		}
	}

	private handleTrace(message: any, ...args: any[]): void {
		if (args.length === 0) {
			this._logger?.trace?.(message);
		} else {
			this._logger?.trace?.(message, ...args);
		}
	}

	private handleDebug(message: any, ...args: any[]): void {
		if (args.length === 0) {
			this._logger?.debug(message);
		} else {
			this._logger?.debug(message, ...args);
		}
	}

	private handleInfo(message: any, ...args: any[]): void {
		if (args.length === 0) {
			this._logger?.info(message);
		} else {
			this._logger?.info(message, ...args);
		}
	}

	private handleWarn(message: any, ...args: any[]): void {
		if (args.length === 0) {
			this._logger?.warn(message);
		} else {
			this._logger?.warn(message, ...args);
		}
	}

	private HandleError(message: any, ...args: any[]): void {
		if (args.length === 0) {
			this._logger?.error(message);
		} else {
			this._logger?.error(message, ...args);
		}
	}
}
