import {ILoggerLike, LogLevel, LogMapping, MapLogger} from '../../src';

const defaultLogMap = {
	test: LogLevel.Info,
	input: LogLevel.Debug,
};

// build type for DemoService log key mapping
export type DemoServiceLogMappingType = LogMapping<keyof typeof defaultLogMap>;

export class DemoService {
	private logger: MapLogger<DemoServiceLogMappingType>;
	constructor(logger?: ILoggerLike, logMapping?: Partial<DemoServiceLogMappingType>) {
		this.logger = new MapLogger(logger, Object.assign({}, defaultLogMap, logMapping));
	}

	public setLogMapping(logMapping: Partial<DemoServiceLogMappingType>) {
		this.logger.setLogMapping(logMapping);
	}

	public test() {
		this.logger.logKey('test', 'DemoService test() method');
	}

	public input() {
		this.logger.logKey('input', 'DemoService input() method');
	}
}
