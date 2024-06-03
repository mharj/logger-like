import type {ILoggerLike} from './ILoggerLike';

export interface ISetLogger {
	setLogger(logger: ILoggerLike): void;
}

export interface ISetOptionalLogger {
	setLogger(logger: ILoggerLike | undefined): void;
}
