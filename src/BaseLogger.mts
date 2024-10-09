import {LogLevel, type LogLevelValue} from './LogLevel.mjs';
import {type ILoggerLike} from './ILoggerLike.mjs';
import {type ISetOptionalLogger} from './ISetLogger.mjs';

export abstract class BaseLogger implements ISetOptionalLogger, ILoggerLike {
	protected _logger: ILoggerLike | undefined;

	constructor(logger: ILoggerLike | undefined) {
		this._logger = logger;
	}

	/**
	 * Set or unset logger instance
	 * @param logger - logger instance or undefined
	 */
	public setLogger(logger: ILoggerLike | undefined): void {
		this._logger = logger;
	}

	/**
	 * trace level logging
	 */
	public trace(message: any, ...args: any[]): void {
		this.handleLogCall(LogLevel.Trace, message, ...args);
	}

	/**
	 * debug level logging
	 */
	public debug(message: any, ...args: any[]): void {
		this.handleLogCall(LogLevel.Debug, message, ...args);
	}

	/**
	 * info level logging
	 */
	public info(message: any, ...args: any[]): void {
		this.handleLogCall(LogLevel.Info, message, ...args);
	}

	/**
	 * warn level logging
	 */
	public warn(message: any, ...args: any[]): void {
		this.handleLogCall(LogLevel.Warn, message, ...args);
	}

	/**
	 * error level logging
	 */
	public error(message: any, ...args: any[]): void {
		this.handleLogCall(LogLevel.Error, message, ...args);
	}

	protected handleTrace(message: any, ...args: any[]): void {
		if (args.length === 0) {
			this._logger?.trace?.(message);
		} else {
			this._logger?.trace?.(message, ...args);
		}
	}

	protected handleDebug(message: any, ...args: any[]): void {
		if (args.length === 0) {
			this._logger?.debug(message);
		} else {
			this._logger?.debug(message, ...args);
		}
	}

	protected handleInfo(message: any, ...args: any[]): void {
		if (args.length === 0) {
			this._logger?.info(message);
		} else {
			this._logger?.info(message, ...args);
		}
	}

	protected handleWarn(message: any, ...args: any[]): void {
		if (args.length === 0) {
			this._logger?.warn(message);
		} else {
			this._logger?.warn(message, ...args);
		}
	}

	protected HandleError(message: any, ...args: any[]): void {
		if (args.length === 0) {
			this._logger?.error(message);
		} else {
			this._logger?.error(message, ...args);
		}
	}

	/**
	 * this handles logic rules for logging
	 */
	protected abstract handleLogCall(level: LogLevelValue, message: any, ...args: any[]): void;
}
