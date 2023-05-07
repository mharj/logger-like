/* eslint-disable @typescript-eslint/no-explicit-any */
import {assertLogLevel, LogLevel, LogLevelValue} from './LogLevel';
import {ILoggerLike} from './ILoggerLike';

export type LogMapping<Keys extends string = string> = Record<Keys, LogLevelValue>;
/**
 * MapLogger is a logger that uses a map to determine the log level for each key.
 *
 * This can be extends to create a mapped logger for class or have a variable.
 */
export class MapLogger<LogMapType extends LogMapping> {
	private _logger: ILoggerLike | undefined;
	private _map: LogMapType;
	private _defaultMap: LogMapType;

	/**
	 * Logger constructor with optional logger instance and log key mapping
	 */
	constructor(logger: ILoggerLike | undefined, defaultMap: LogMapType) {
		this._logger = logger;
		this._defaultMap = defaultMap;
		this._map = Object.assign({}, this._defaultMap);
	}

	/**
	 * Set new log key mapping
	 */
	public setLogMapping(map: Partial<LogMapType>): void {
		this._map = Object.assign({}, this._defaultMap, map);
	}

	/**
	 * Log message with level based on log key mapping
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
		switch (level) {
			case LogLevel.Trace:
				this._logger.trace?.(message, ...args);
				break;
			case LogLevel.Debug:
				this._logger.debug(message, ...args);
				break;
			case LogLevel.Info:
				this._logger.info(message, ...args);
				break;
			case LogLevel.Warn:
				this._logger.warn(message, ...args);
				break;
			case LogLevel.Error:
				this._logger.error(message, ...args);
				break;
		}
	}
}
