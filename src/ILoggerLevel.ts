import type {LogLevelValue} from './LogLevel.js';

/**
 * Set log level interface
 * @version 0.1.0
 */
export interface ISetLoggerLevel {
	setLoggerLevel(level?: LogLevelValue): void;
}

/**
 * get log level interface
 * @version 0.1.0
 */
export interface IGetLoggerLevel {
	getLoggerLevel(): LogLevelValue;
}
