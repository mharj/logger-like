import {BaseLogger} from './BaseLogger.mjs';
import {type ISetOptionalLogger, type ILoggerLike, type IGetLoggerLevel, type ISetLoggerLevel, type IHasLoggerInstance} from './interfaces/index.mjs';
import {type LogLevelValue, LogLevel, assertLogLevel, getLogLevelName} from './types/index.mjs';

/**
 * [LevelLogger](https://mharj.github.io/logger-like/classes/LevelLogger.html) is a class implementation which can set minimum log levels.
 * @example
 * const logger = new LevelLogger(console, LogLevel.Info);
 * logger.debug('hello'); // will not be logged
 * logger.setLogLevel(LogLevel.Warn); // set minimum log level to warn
 * logger.getLogLevel(); // returns 4 = LogLevel.Warn
 * @since v0.1.0
 * @see [LevelLogger](https://mharj.github.io/logger-like/classes/LevelLogger.html)
 */
export class LevelLogger extends BaseLogger implements ISetOptionalLogger, IHasLoggerInstance, ILoggerLike, IGetLoggerLevel, ISetLoggerLevel {
	private _level: LogLevelValue;
	private _originalLevel: LogLevelValue;

	/**
	 * Logger constructor with logger and initial log level
	 */
	constructor(logger: ILoggerLike | undefined, level: LogLevelValue = LogLevel.Debug) {
		super(logger);
		assertLogLevel(level);
		this._level = level;
		this._originalLevel = level;
	}

	/**
	 * Set current log level or reset to original level
	 * @param level - log level to set, if not provided, reset to original level
	 * @returns current log level
	 * @example
	 * LogLevel.Trace = 0
	 * LogLevel.Debug = 1
	 * LogLevel.Info = 2
	 * LogLevel.Warn = 3
	 * LogLevel.Error = 4
	 */
	public setLoggerLevel(level?: LogLevelValue): LogLevelValue {
		if (level) {
			assertLogLevel(level);
			this._level = level;
		} else {
			this._level = this._originalLevel;
		}
		return this._level;
	}

	/**
	 * Get current log level
	 */
	public getLoggerLevel(): LogLevelValue {
		return this._level;
	}

	protected handleLogCall(level: LogLevelValue, message: any, ...args: any[]): void {
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

	public toString(): `LevelLogger(${string})` {
		return `LevelLogger(logger: ${this.hasLoggerInstance().toString()}, level: ${getLogLevelName(this._level)})`;
	}
}
