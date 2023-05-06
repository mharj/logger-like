import {LogLevelValue} from './LogLevel';

/**
 * Set log level interface
 */
export interface ISetLoggerLevel {
	setLogLevel(level?: LogLevelValue): void;
}

/**
 * get log level interface
 */
export interface IGetLoggerLevel {
	getLogLevel(): LogLevelValue;
}
