import type {LogLevelValue} from './LogLevel.mjs';

/**
 * Set log level interface
 * @since v0.1.0
 */
export interface ISetLoggerLevel {
	setLoggerLevel(level?: LogLevelValue): void;
}

/**
 * get log level interface
 * @since v0.1.0
 */
export interface IGetLoggerLevel {
	getLoggerLevel(): LogLevelValue;
}
