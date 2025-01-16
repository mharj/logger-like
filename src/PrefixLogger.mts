import {BaseLogger} from './BaseLogger.mjs';
import {type IHasLoggerInstance, type ILoggerLike, type ISetOptionalLogger} from './interfaces/index.mjs';
import {LogLevel, type LogLevelValue} from './types/index.mjs';

/**
 * PrefixLoggerToJson is a JSON output type for [PrefixLogger](https://mharj.github.io/logger-like/classes/PrefixLogger.html).
 * @since v0.2.11
 */
export type PrefixLoggerToJson = {$class: 'PrefixLogger'; prefix: string; logger: boolean};

/**
 * [PrefixLogger](https://mharj.github.io/logger-like/classes/PrefixLogger.html) is a logger that add prefix to each log message.
 * @example
 * const logger = new PrefixLogger('ServiceXyz:', console);
 * logger.info('is running');
 * // output: ServiceXyz: is running
 * @since v0.2.8
 * @see [PrefixLogger](https://mharj.github.io/logger-like/classes/PrefixLogger.html)
 */
export class PrefixLogger extends BaseLogger implements ISetOptionalLogger, IHasLoggerInstance, ILoggerLike {
	private _prefix: string;

	/**
	 * [PrefixLogger](https://mharj.github.io/logger-like/classes/PrefixLogger.html) constructor with optional logger instance and prefix.
	 * @param {string} prefix - prefix that will be added to each log message
	 * @param {ILoggerLike | undefined} logger - optional logger instance
	 * @see [PrefixLogger](https://mharj.github.io/logger-like/classes/PrefixLogger.html)
	 */
	constructor(prefix: string, logger?: ILoggerLike) {
		super(logger);
		this._prefix = prefix;
	}

	/**
	 * Get string representation of the logger.
	 * @returns string representation of the logger, e.g. `PrefixLogger(logger: true, prefix: foo)`
	 */
	public toString(): `PrefixLogger(${string})` {
		return `PrefixLogger(logger: ${this.hasLoggerInstance().toString()}, prefix: '${this._prefix}')`;
	}

	public toJSON(): PrefixLoggerToJson {
		return {
			$class: 'PrefixLogger',
			prefix: this._prefix,
			logger: !!this._logger,
		};
	}

	protected handleLogCall(level: LogLevelValue, message: any, ...args: any[]): void {
		switch (level) {
			case LogLevel.Trace:
				this.handleTrace(this._prefix, message, ...args);
				break;
			case LogLevel.Debug:
				this.handleDebug(this._prefix, message, ...args);
				break;
			case LogLevel.Info:
				this.handleInfo(this._prefix, message, ...args);
				break;
			case LogLevel.Warn:
				this.handleWarn(this._prefix, message, ...args);
				break;
			case LogLevel.Error:
				this.HandleError(this._prefix, message, ...args);
				break;
		}
	}
}
