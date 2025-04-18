import {type LogMapInfer} from '../MapLogger.mjs';
import type {LogLevelValue} from '../types/index.mjs';
import {type ISetOptionalLogger} from './ISetLogger.mjs';

/**
 * SetLogMapping is an interface for setting log key mapping.
 * @template LogMapType Object type with LogLevelValue values.
 * @since v0.2.6
 */
export interface ISetLogMapping<LogMapType extends Record<string, LogLevelValue>> extends ISetOptionalLogger {
	setLogMapping(map: Partial<LogMapInfer<LogMapType>>): void;
}

/**
 * SetLogMapping is an interface for getting log key mapping.
 * @template LogMapType Object type with LogLevelValue values.
 * @since v0.2.11
 */
export interface IGetLogMapping<LogMapType extends Record<string, LogLevelValue>> extends ISetOptionalLogger {
	getLogMapping(map: Partial<LogMapInfer<LogMapType>>): void;
}

/**
 * ISetAllLogMapping is an interface for setting log key mapping to all keys.
 * @since v0.2.10
 */
export interface ISetAllLogMapping {
	allLogMapSet(level: LogLevelValue): void;
}

/**
 * IResetAllLogMapping is an interface for resetting log key mapping to all keys.
 * @since v0.2.10
 */
export interface IResetAllLogMapping {
	allLogMapReset(): void;
}

/**
 * Interface for logging with mapping key.
 * @template LogMapType Object type with LogLevelValue values.
 * @since v0.2.10
 */
export interface IMappingLogKey<LogMapType extends Record<string, LogLevelValue>> {
	logKey(key: keyof LogMapType, message: any, ...args: any[]): void;
}
