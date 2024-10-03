import type {ILoggerLike} from './ILoggerLike.js';

/**
 * Set logger interface
 * @version 0.1.0
 * @
 */
export interface ISetLogger {
	setLogger(logger: ILoggerLike): void;
}

/**
 * Set logger interface
 * @version 0.1.0
 */

export interface ISetOptionalLogger {
	setLogger(logger: ILoggerLike | undefined): void;
}
