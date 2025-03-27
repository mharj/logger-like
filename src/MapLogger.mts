import {BaseLogger} from './BaseLogger.mjs';
import {
	type IGetLogMapping,
	type IHasLoggerInstance,
	type ILoggerLike,
	type IMappingLogKey,
	type IResetAllLogMapping,
	type ISetAllLogMapping,
	type ISetLogMapping,
	type ISetOptionalLogger,
} from './interfaces/index.mjs';
import {assertLogLevel, LogLevel, type LogLevelValue} from './types/index.mjs';

/**
 * LogMapping is a type for log key mapping.
 * @template Keys log key type
 * @since v0.1.0
 * @deprecated Use ```LogMapInfer<type defaultLogMap>``` instead.
 */
export type LogMapping<Keys extends string = string> = Record<Keys, LogLevelValue>;

/**
 * LogMapInfer is a type for inferring log key mapping.
 * @template T Object type with LogLevelValue values
 * @since v0.2.10
 */
export type LogMapInfer<T extends Record<string, LogLevelValue> = Record<string, LogLevelValue>> = Record<keyof T, LogLevelValue>;

/**
 * MapLoggerToJson is a JSON output type for [MapLogger](https://mharj.github.io/logger-like/classes/MapLogger.html).
 * @template LogMapType Object type with LogLevelValue values
 * @since v0.2.11
 */
export type MapLoggerToJson<LogMapType extends Record<string, LogLevelValue>> = {$class: 'MapLogger'; map: LogMapType; logger: boolean};

/**
 * [MapLogger](https://mharj.github.io/logger-like/classes/MapLogger.html) is a logger that extends normal logger and uses a object key mapping to determine the log level for each unique key.
 * It allows for dynamic log level configuration for different log keys.
 * @template LogMapType Object type with LogLevelValue values
 * @example
 * const defaultLogMap = {
 *   test: LogLevel.Info,
 *   input: LogLevel.Debug,
 * } as const;
 * export type LogMappingType = LogMapInfer<typeof defaultLogMap>; // build type from default
 *
 * const logger = new MapLogger<LogMappingType>(console, defaultLogMap);
 * logger.logKey('test', 'goes to info');
 * logger.logKey('input', 'goes to debug');
 * @since v0.1.0
 * @see [MapLogger](https://mharj.github.io/logger-like/classes/MapLogger.html)
 */
export class MapLogger<LogMapType extends Record<string, LogLevelValue>>
	extends BaseLogger
	implements
		IGetLogMapping<LogMapType>,
		ISetLogMapping<LogMapType>,
		IMappingLogKey<LogMapType>,
		ISetAllLogMapping,
		IResetAllLogMapping,
		ISetOptionalLogger,
		IHasLoggerInstance,
		ILoggerLike
{
	private _map: LogMapType;
	private _defaultMap: Readonly<LogMapType>;

	/**
	 * [MapLogger](https://mharj.github.io/logger-like/classes/MapLogger.html) constructor with optional logger instance and default log key mapping.
	 * @param {ILoggerLike | undefined} logger - optional logger instance
	 * @param {LogMapType} defaultMap - default log key mapping
	 * @see [MapLogger](https://mharj.github.io/logger-like/classes/MapLogger.html)
	 */
	public constructor(logger: ILoggerLike | undefined, defaultMap: LogMapType) {
		super(logger);
		this._defaultMap = Object.assign({}, defaultMap);
		this._map = Object.assign({}, defaultMap);
	}

	/**
	 * Set new log key mapping
	 * @param {Partial<LogMapInfer<LogMapType>>} map - new log key mapping
	 */
	public setLogMapping(map: Partial<LogMapInfer<LogMapType>>): void {
		this._map = Object.assign({}, this._defaultMap, map);
	}

	/**
	 * Get current log key mapping
	 * @returns {LogMapType} current log key mapping
	 */
	public getLogMapping(): LogMapType {
		return this._map;
	}

	/**
	 * Set temporary log key mapping to all keys.
	 * @param {LogLevelValue} level - log level
	 */
	public allLogMapSet(level: LogLevelValue) {
		for (const key in this._map) {
			this._map[key] = level as LogMapType[Extract<keyof LogMapType, string>];
		}
	}

	/**
	 * Reset temporary log key mapping to original.
	 */
	public allLogMapReset() {
		this._map = Object.assign({}, this._defaultMap);
	}

	/**
	 * Log message with level based on log key mapping
	 * @param {keyof LogMapType} key - log key
	 * @param {any} message - message to log
	 * @param {any[]} args - additional arguments
	 * @throws {Error} if log key is not found
	 */
	public logKey(key: keyof LogMapType, message: any, ...args: any[]): void {
		if (!this._logger) {
			return;
		}
		const level = this._map[key];
		if (level === undefined) {
			throw new Error(`MapLogger: Unknown log key: ${String(key)}`);
		}
		assertLogLevel(level);
		this.handleLogCall(level, message, ...args);
	}

	/**
	 * Get string representation of the logger.
	 * @returns {string} String representation of the logger, e.g. `MapLogger(logger: true, map: { foo: 2, bar: 3 })`
	 */
	public toString(): `MapLogger(${string})` {
		return `MapLogger(logger: ${this.hasLoggerInstance().toString()}, ${JSON.stringify(this._map)})`;
	}

	/**
	 * Get JSON representation of the logger.
	 * @returns {MapLoggerToJson<LogMapType>} An object with the class name, logger status, and the log mapping object.
	 * @example
	 * const logger = new MapLogger<LogMappingType>(console, defaultLogMap);
	 * console.log(logger.toJSON());
	 * // output: {"$class":"MapLogger","map":{"foo":2,"bar":3},"logger":true}
	 */
	public toJSON(): MapLoggerToJson<LogMapType> {
		return {
			$class: 'MapLogger',
			map: this.getLogMapping(),
			logger: !!this._logger,
		};
	}

	protected handleLogCall(level: LogLevelValue, message: any, ...args: any[]): void {
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
