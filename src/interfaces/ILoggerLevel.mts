import type {LogLevelValue} from '../types/index.mjs';

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
