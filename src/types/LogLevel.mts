/**
 * [LogLevel](https://mharj.github.io/logger-like/variables/LogLevel.html) const "enum"
 * @since v0.1.0
 * @see [LogLevel](https://mharj.github.io/logger-like/variables/LogLevel.html)
 */
export const LogLevel = {
	None: 0,
	Trace: 1,
	Debug: 2,
	Info: 3,
	Warn: 4,
	Error: 5,
} as const;

/**
 * log level key type
 * @since v0.1.0
 */
export type LogLevelKey = keyof typeof LogLevel;

/**
 * log level value type
 * @since v0.1.0
 *
 * @example
 * LogLevel.None = 0
 * LogLevel.Trace = 1
 * LogLevel.Debug = 2
 * LogLevel.Info = 3
 * LogLevel.Warn = 4
 * LogLevel.Error = 5
 */
export type LogLevelValue = (typeof LogLevel)[LogLevelKey];

export const LogLevelValues = Object.values(LogLevel) as readonly LogLevelValue[];
export const LogLevelKeys = Object.keys(LogLevel) as readonly LogLevelKey[];

/**
 * get log level name from log level numeric value
 * @since v0.1.0
 */
export function getLogLevelName(level: LogLevelValue): LogLevelKey {
	const key = LogLevelKeys.find((k) => LogLevel[k] === level);
	if (key) {
		return key;
	}
	throw new TypeError(`Invalid log level: ${String(level)}, expected one of [${LogLevelValues.join(', ')}]`);
}

/**
 * check if value is a valid log level number (helper for JS compatibility)
 * @since v0.1.0
 */
export function isLogLevel(value: unknown): value is LogLevelValue {
	return typeof value === 'number' && LogLevelValues.includes(value as LogLevelValue);
}

/**
 * assert that value is a valid log level number
 * @since v0.1.0
 */
export function assertLogLevel(value: unknown): asserts value is LogLevelValue {
	if (!isLogLevel(value)) {
		throw new TypeError(`Invalid log level: ${String(value)}, expected one of [${LogLevelValues.join(', ')}]`);
	}
}
