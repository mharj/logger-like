/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */

/**
 * log level const "enum"
 */
export const LogLevel = {
	Trace: 0,
	Debug: 1,
	Info: 2,
	Warn: 3,
	Error: 4,
} as const;

export type LogLevelKey = keyof typeof LogLevel;

/**
 * log level value type
 *
 * @example
 * LogLevel.Trace = 0
 * LogLevel.Debug = 1
 * LogLevel.Info = 2
 * LogLevel.Warn = 3
 * LogLevel.Error = 4
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
