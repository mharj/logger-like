import {type ILoggerLike, type ISetOptionalLogger, LogLevel, type LogLevelValue, type LogMapInfer, MapLogger} from '../../src/index.mjs';

const defaultLogMap = {
	test: LogLevel.Info,
	input: LogLevel.Debug,
} as const;

// build type for DemoService log key mapping
export type DemoServiceLogMappingType = LogMapInfer<typeof defaultLogMap>;

export class DemoService implements ISetOptionalLogger {
	public logger: MapLogger<DemoServiceLogMappingType>;
	public constructor(logger?: ILoggerLike, logMapping?: Partial<DemoServiceLogMappingType>) {
		this.logger = new MapLogger(logger, Object.assign({}, defaultLogMap, logMapping));
	}

	public setLogger(logger: ILoggerLike | undefined): void {
		this.logger.setLogger(logger);
	}

	public setLogMapping(logMapping: Partial<DemoServiceLogMappingType>) {
		this.logger.setLogMapping(logMapping);
	}

	public allLogMapSet(level: LogLevelValue) {
		this.logger.trace('allLogMapSet', level, 'demo');
		this.logger.allLogMapSet(level);
	}

	public allLogMapReset() {
		this.logger.trace('allLogMapReset');
		this.logger.allLogMapReset();
	}

	public test() {
		this.logger.logKey('test', 'DemoService test() method');
	}

	public test2() {
		this.logger.logKey('test', 'DemoService test() method', 'test2');
	}

	public input() {
		this.logger.logKey('input', 'DemoService input() method');
	}

	public testDefaultMethods() {
		this.logger.trace('testAll', 'demo');
		this.logger.debug('testAll', 'demo');
		this.logger.info('testAll', 'demo');
		this.logger.warn('testAll', 'demo');
		this.logger.error('testAll', 'demo');
	}

	public toString() {
		return this.logger.toString();
	}

	public toJSON() {
		return this.logger.toJSON();
	}
}
