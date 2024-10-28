import {type ISetOptionalLogger} from './ISetLogger.mjs';
import {type LogMapping} from './MapLogger.mjs';

/**
 * SetLogMapping is an interface for setting log key mapping.
 * @since v0.2.6
 */
export interface ISetLogMapping<LogMapType extends LogMapping> extends ISetOptionalLogger {
	setLogMapping(map: Partial<LogMapType>): void;
}
