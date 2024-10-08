import {assertLogLevel, LogLevel, type LogLevelValue} from './LogLevel.mjs';
import {type ILoggerLike} from './ILoggerLike.mjs';
import {type ISetOptionalLogger} from './ISetLogger.mjs';

/**
 * LogMapping is a type for log key mapping.
 * @since v0.1.0
 */
export type LogMapping<Keys extends string = string> = Record<Keys, LogLevelValue>;
/**
 * MapLogger is a logger that uses a map to determine the log level for each key.
 *
 * This can be extends to create a mapped logger for class or have a variable.
 * See [DemoMapLogger](../test/mockup/DemoMapLogger.ts) for class example.
 * @since v0.1.0
 * @example
 * const defaultLogMap = {
 *   test: LogLevel.Info,
 *   input: LogLevel.Debug,
 * };
 * export type LogMappingType = LogMapping<keyof typeof defaultLogMap>; // build type
 *
 * const logger = new MapLogger(console, defaultLogMap);
 * logger.logKey('test', 'goes to info');
 * logger.logKey('input', 'goes to debug');
 */
export class MapLogger<LogMapType extends LogMapping> implements ISetOptionalLogger, ILoggerLike {
	private _logger: ILoggerLike | undefined;
	private _map: LogMapType;
	private _defaultMap: LogMapType;

	private _backupMap: LogMapType | undefined;

	/**
	 * Logger constructor with optional logger instance and log key mapping
	 */
	constructor(logger: ILoggerLike | undefined, defaultMap: LogMapType) {
		this._logger = logger;
		this._defaultMap = defaultMap;
		this._map = Object.assign({}, this._defaultMap);
	}

	public setLogger(logger: ILoggerLike | undefined): void {
		this._logger = logger;
	}

	/**
	 * Set new log key mapping
	 */
	public setLogMapping(map: Partial<LogMapType>): void {
		this._map = Object.assign({}, this._defaultMap, map);
	}

	/**
	 * Set temporary log key mapping to all keys.
	 */
	public allLogMapSet(level: LogLevelValue) {
		if (this._backupMap) {
			throw new Error('allLogMapSet: backupMap is already set, call allLogMapReset first');
		}
		this._backupMap = Object.assign({}, this._map);
		for (const key in this._map) {
			this._map[key] = level as LogMapType[Extract<keyof LogMapType, string>];
		}
	}

	/**
	 * Reset temporary log key mapping to original.
	 */
	public allLogMapReset() {
		if (this._backupMap) {
			this._map = Object.assign({}, this._backupMap);
			this._backupMap = undefined;
		}
	}

	/**
	 * ILoggerLike debug(message: any, ...args: any[])
	 */
	public debug(message: any, ...args: any[]): void {
		this.handleDebug(message, ...args);
	}

	/**
	 * ILoggerLike info(message: any, ...args: any[])
	 */
	public info(message: any, ...args: any[]): void {
		this.handleInfo(message, ...args);
	}

	/**
	 * ILoggerLike warn(message: any, ...args: any[])
	 */
	public warn(message: any, ...args: any[]): void {
		this.handleWarn(message, ...args);
	}

	/**
	 * ILoggerLike error(message: any, ...args: any[])
	 */
	public error(message: any, ...args: any[]): void {
		this.HandleError(message, ...args);
	}

	/**
	 * ILoggerLike trace?.(message: any, ...args: any[])
	 */
	public trace(message: any, ...args: any[]): void {
		this.handleTrace(message, ...args);
	}

	/**
	 * Log message with level based on log key mapping
	 */
	public logKey(key: keyof LogMapType, message: any, ...args: any[]): void {
		if (!this._logger) {
			return;
		}
		const level = this._map[key];
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (level === undefined) {
			throw new Error(`MapLogger: Unknown log key: ${String(key)}`);
		}
		assertLogLevel(level);
		this.handleWithLevel(level, message, ...args);
	}

	private handleWithLevel(level: LogLevelValue, message: any, ...args: any[]): void {
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
