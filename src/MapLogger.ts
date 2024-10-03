import {assertLogLevel, LogLevel, type LogLevelValue} from './LogLevel';
import {type ILoggerLike} from './ILoggerLike';
import {type ISetOptionalLogger} from './ISetLogger';

export type LogMapping<Keys extends string = string> = Record<Keys, LogLevelValue>;
/**
 * MapLogger is a logger that uses a map to determine the log level for each key.
 *
 * This can be extends to create a mapped logger for class or have a variable.
 * See [DemoMapLogger](../test/mockup/DemoMapLogger.ts) for class example.
 * @version 0.1.0
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
		this.handleLogging(this._logger?.debug, message, ...args);
	}

	/**
	 * ILoggerLike info(message: any, ...args: any[])
	 */
	public info(message: any, ...args: any[]): void {
		this.handleLogging(this._logger?.info, message, ...args);
	}

	/**
	 * ILoggerLike warn(message: any, ...args: any[])
	 */
	public warn(message: any, ...args: any[]): void {
		this.handleLogging(this._logger?.warn, message, ...args);
	}

	/**
	 * ILoggerLike error(message: any, ...args: any[])
	 */
	public error(message: any, ...args: any[]): void {
		this.handleLogging(this._logger?.error, message, ...args);
	}

	/**
	 * ILoggerLike trace?.(message: any, ...args: any[])
	 */
	public trace(message: any, ...args: any[]): void {
		this.handleLogging(this._logger?.trace, message, ...args);
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
		switch (level) {
			case LogLevel.Trace:
				this.handleLogging(this._logger.trace, message, ...args);
				break;
			case LogLevel.Debug:
				this.handleLogging(this._logger.debug, message, ...args);
				break;
			case LogLevel.Info:
				this.handleLogging(this._logger.info, message, ...args);
				break;
			case LogLevel.Warn:
				this.handleLogging(this._logger.warn, message, ...args);
				break;
			case LogLevel.Error:
				this.handleLogging(this._logger.error, message, ...args);
				break;
		}
	}

	private handleLogging(method: ((message: any, ...args: any[]) => void) | undefined, message: any, ...args: any[]): void {
		if (method) {
			if (args.length === 0) {
				method(message);
			} else {
				method(message, ...args);
			}
		}
	}
}
