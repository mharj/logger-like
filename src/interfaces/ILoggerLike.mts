/**
 * [ILoggerLike](https://mharj.github.io/logger-like/interfaces/ILoggerLike.html) is a common logger interface which should work with console, winston, and log4js.
 * @example
 * import {type ILoggerLike} from '@avanio/logger-like';
 * function demo(logger: ILoggerLike) {
 *	 logger.info('hello');
 * }
 * demo(console);
 * @since v0.0.1
 * @see [ILoggerLike](https://mharj.github.io/logger-like/interfaces/ILoggerLike.html)
 */
export interface ILoggerLike {
	trace?(message: any, ...args: any[]): void;
	debug(message: any, ...args: any[]): void;
	info(message: any, ...args: any[]): void;
	warn(message: any, ...args: any[]): void;
	error(message: any, ...args: any[]): void;
}
