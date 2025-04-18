import {BaseLogger} from './BaseLogger.mjs';
import {type IGetLoggerLevel, type IHasLoggerInstance, type ILoggerLike, type ISetLoggerLevel, type ISetOptionalLogger} from './interfaces/index.mjs';
import {assertLogLevel, getLogLevelName, LogLevel, type LogLevelValue} from './types/index.mjs';

/**
 * LevelLoggerToJson is a JSON output type for [LevelLogger](https://mharj.github.io/logger-like/classes/LevelLogger.html)
 * @since v0.2.11
 */
export type LevelLoggerToJson = {$class: 'LevelLogger'; level: LogLevelValue; logger: boolean};

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
	 * [LevelLogger](https://mharj.github.io/logger-like/classes/LevelLogger.html) constructor with logger and initial log level
	 * @param {ILoggerLike | undefined} logger - optional logger instance
	 * @param {LogLevelValue} level - initial log level
	 * @see [LevelLogger](https://mharj.github.io/logger-like/classes/LevelLogger.html)
	 */
	public constructor(logger: ILoggerLike | undefined, level: LogLevelValue = LogLevel.Debug) {
		super(logger);
		assertLogLevel(level);
		this._level = level;
		this._originalLevel = level;
	}

	/**
	 * Set current log level or reset to original level
	 * @param {LogLevelValue | undefined} level - log level to set, if not provided, reset to original level
	 * @returns {LogLevelValue} current log level
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
	 * @returns {LogLevelValue} current log level
	 */
	public getLoggerLevel(): LogLevelValue {
		return this._level;
	}

	/**
	 * Get string representation of the logger.
	 * @returns {string} String representation of the logger, e.g. `LevelLogger(logger: true, level: 'Info')`
	 */
	public toString(): `LevelLogger(${string})` {
		return `LevelLogger(logger: ${this.hasLoggerInstance().toString()}, level: ${getLogLevelName(this._level)})`;
	}

	/**
	 * Get JSON representation of the logger.
	 * @returns {LevelLoggerToJson} JSON representation of the logger
	 * @example
	 * const logger = new LevelLogger(console, LogLevel.Info);
	 * console.log(logger.toJSON());
	 * // output: {"$class":"LevelLogger","level":2,"logger":true}
	 */
	public toJSON(): LevelLoggerToJson {
		return {
			$class: 'LevelLogger',
			level: this._level,
			logger: !!this._logger,
		};
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
}
