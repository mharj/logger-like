import {type ILoggerLike, type ISetOptionalLogger, LogLevel, type LogLevelValue, type LogMapping, MapLogger} from '../../src';

const defaultLogMap = {
	test: LogLevel.Info,
	input: LogLevel.Debug,
};

// build type for DemoService log key mapping
export type DemoServiceLogMappingType = LogMapping<keyof typeof defaultLogMap>;

export class DemoService implements ISetOptionalLogger {
	private logger: MapLogger<DemoServiceLogMappingType>;
	constructor(logger?: ILoggerLike, logMapping?: Partial<DemoServiceLogMappingType>) {
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

	public input() {
		this.logger.logKey('input', 'DemoService input() method');
	}
}
