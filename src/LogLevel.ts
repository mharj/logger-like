/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */

/**
 * log level const "enum"
 */
export const LogLevel = {
	None: 0,
	Trace: 1,
	Debug: 2,
	Info: 3,
	Warn: 4,
	Error: 5,
} as const;

export type LogLevelKey = keyof typeof LogLevel;

/**
 * log level value type
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

const LogLevelValues = Object.values(LogLevel);
const LogLevelKeys = Object.keys(LogLevel) as LogLevelKey[];

/**
 * get log level name from log level numeric value
 */
export function getLogLevelName(level: LogLevelValue): LogLevelKey {
	const key = LogLevelKeys.find((k) => LogLevel[k] === level);
	if (key) {
		return key;
	}
	throw new TypeError(`Invalid log level: ${level}, expected one of [${LogLevelValues.join(', ')}]`);
}

/**
 * check if value is a valid log level number (helper for JS compatibility)
 */
export function isLogLevel(value: unknown): value is LogLevelValue {
	return typeof value === 'number' && LogLevelValues.includes(value as LogLevelValue);
}

/**
 * assert that value is a valid log level number
 */
export function assertLogLevel(value: unknown): asserts value is LogLevelValue {
	if (!isLogLevel(value)) {
		throw new TypeError(`Invalid log level: ${value}, expected one of [${LogLevelValues.join(', ')}]`);
	}
}
