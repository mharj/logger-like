import {LogLevelValue} from './LogLevel';

/**
 * Set log level interface
 */
export interface ISetLoggerLevel {
	setLoggerLevel(level?: LogLevelValue): void;
}

/**
 * get log level interface
 */
export interface IGetLoggerLevel {
	getLoggerLevel(): LogLevelValue;
}
