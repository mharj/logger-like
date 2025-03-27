import {type IHasLoggerInstance, type ILoggerLike, type ISetOptionalLogger} from './interfaces/index.mjs';
import {LogLevel, type LogLevelValue} from './types/index.mjs';

export abstract class BaseLogger implements ISetOptionalLogger, IHasLoggerInstance, ILoggerLike {
	protected _logger: ILoggerLike | undefined;

	public constructor(logger: ILoggerLike | undefined) {
		this._logger = logger;
	}

	/**
	 * Set or unset logger instance
	 * @param {ILoggerLike | undefined} logger - logger instance or undefined
	 */
	public setLogger(logger: ILoggerLike | undefined): void {
		this._logger = logger;
	}

	/**
	 * trace level logging
	 * @param {any} message - message to log
	 * @param {any[]} args - additional arguments
	 */
	public trace(message: any, ...args: any[]): void {
		this.handleLogCall(LogLevel.Trace, message, ...args);
	}

	/**
	 * debug level logging
	 * @param {any} message - message to log
	 * @param {any[]} args - additional arguments
	 */
	public debug(message: any, ...args: any[]): void {
		this.handleLogCall(LogLevel.Debug, message, ...args);
	}

	/**
	 * info level logging
	 * @param {any} message - message to log
	 * @param {any[]} args - additional arguments
	 */
	public info(message: any, ...args: any[]): void {
		this.handleLogCall(LogLevel.Info, message, ...args);
	}

	/**
	 * warn level logging
	 * @param {any} message - message to log
	 * @param {any[]} args - additional arguments
	 */
	public warn(message: any, ...args: any[]): void {
		this.handleLogCall(LogLevel.Warn, message, ...args);
	}

	/**
	 * error level logging
	 * @param {any} message - message to log
	 * @param {any[]} args - additional arguments
	 */
	public error(message: any, ...args: any[]): void {
		this.handleLogCall(LogLevel.Error, message, ...args);
	}

	/**
	 * Check if logger instance exists
	 * @returns {boolean} true if logger instance exists
	 */
	public hasLoggerInstance(): boolean {
		return !!this._logger;
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
