import type {ILoggerLike} from './ILoggerLike.mjs';

/**
 * Set logger interface
 * @since v0.1.0
 */
export interface ISetLogger {
	setLogger(logger: ILoggerLike): void;
}

/**
 * Set logger interface
 * @since v0.1.0
 */

export interface ISetOptionalLogger {
	setLogger(logger: ILoggerLike | undefined): void;
}
