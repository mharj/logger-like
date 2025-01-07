import {LogLevel, type LogLevelValue} from './LogLevel.mjs';
import {BaseLogger} from './BaseLogger.mjs';
import {type ILoggerLike} from './ILoggerLike.mjs';

/**
 * PrefixLogger is a logger that add prefix to each log message.
 * @example
 * const logger = new PrefixLogger('ServiceXyz:', console);
 * logger.info('is running');
 * // output: ServiceXyz: is running
 * @since v0.2.8
 */
export class PrefixLogger extends BaseLogger {
	private _prefix: string;
	constructor(prefix: string, logger?: ILoggerLike) {
		super(logger);
		this._prefix = prefix;
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
