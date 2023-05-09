# @avanio/logger-like

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![npm version](https://badge.fury.io/js/@avanio%2Flogger-like.svg)](https://badge.fury.io/js/@avanio%2Flogger-like)
[![Maintainability](https://api.codeclimate.com/v1/badges/879b79714b63f852a07d/maintainability)](https://codeclimate.com/github/mharj/logger-like/maintainability)
![github action](https://github.com/mharj/logger-like/actions/workflows/main.yml/badge.svg?branch=main)

This package contains:

- A common [**ILoggerLike**](./src/ILoggerLike.ts) logger interface that works with console, winston, and log4js.
- A [**LevelLogger**](#class-levellogger) logger class implementation that can set log levels and acts as filter for the actual logger implementation.
- A [**ISetLogger** **ISetOptionalLogger**](./src/ISetLogger.ts) interfaces that provides a method to set the logger.
- A [**MapLogger**](./src/MapLogger.ts), logger class implementation that can be used to map log levels to different log keys. (works also as extended)
- A [**LogLevel**](#const-loglevel-enum) const "enum.", [**getLogLevelName**](#function-getloglevelname) function, [**isLogLevel**](#function-isloglevel) function and [**assertLogLevel**](#function-assertloglevel) function.
- A [**IGetLoggerLevel**](#interface-igetloggerlevel) and [**ISetLoggerLevel**](#interface-isetloggerlevel) interfaces that provides a method to get and set the log level.

See [**Examples**](#examples) for more details.

## Installation

```bash
npm install @avanio/logger-like
```

## Usage

### Importing

```typescript
import {ILoggerLike, LevelLogger, LogLevel} from '@avanio/logger-like';
```

### Const: **LogLevel** "Enum"

The LogLevel const enum defines the following log levels and type:

```typescript
const LogLevel = {
	None: 0,
	Trace: 1,
	Debug: 2,
	Info: 3,
	Warn: 4,
	Error: 5,
} as const;

type LogLevelValue = 0 | 1 | 2 | 3 | 4 | 5;
```

### Function: **getLogLevelName**

The **getLogLevelName** function returns the log level name for the given log level value.<br/>
The function have the following type:

```typescript
function getLogLevelName(level: LogLevelValue): LogLevelKey;
// type LogLevelKey = "Trace" | "Debug" | "Info" | "Warn" | "Error"
```

### Function: **isLogLevel**

The **isLogLevel** function validates the given log level value.<br/>
The function have the following type:

```typescript
function isLogLevel(value: unknown): value is LogLevelValue;
// return boolean
```

### Function: **assertLogLevel**

The **assertLogLevel** function validates the given log level value and throws an error if the value is not a valid log level.<br/>
The function have the following type:

```typescript
function assertLogLevel(value: unknown): asserts value is LogLevelValue;
```

### Interface: **IGetLoggerLevel**

The **IGetLoggerLevel** interface provides a method to get the current log level. The interface includes the following method:

```typescript
interface IGetLoggerLevel {
	getLogLevel(): LogLevelValue;
}
```

### Interface: **ISetLoggerLevel**

The **ISetLoggerLevel** interface provides a method to set the log level. The interface includes the following method:

```typescript
interface ISetLoggerLevel {
	setLogLevel(level?: LogLevelValue): void;
}
```

As example this interface can be utilized something like controlling multiple services different log levels on fly.

### Class: **LevelLogger**

The **LevelLogger** class is a logger implementation that can set current log levels and acts as filter for the actual logger implementation.<br/>
The class implements the [**ILoggerLike**](#interface-iloggerlike), [**IGetLoggerLevel**](#interface-igetloggerlevel) and [**ISetLoggerLevel**](#interface-isetloggerlevel) interfaces.<br/>
This is useful when you need to set the log level dynamically, like in internal class or one part of application by creating a new instance of the LevelLogger for that specific part of the application.

Constructor:

```typescript
new LevelLogger(logger: ILoggerLike, level: LogLevelValue = LogLevel.Debug);
```

- logger - the actual logger implementation to use (must implement ILoggerLike interface).
- level - the initial log level (optional), defaults to LogLevel.Debug.

## Examples

```typescript
import {ILoggerLike, LevelLogger, LogLevel} from '@avanio/logger-like';

const consoleLogger: ILoggerLike = console;
// const log4jsLogger: ILoggerLike = log4js.getLogger();
// const winstonLogger: ILoggerLike = winston.createLogger();
// Note: log4js and winston also might define actual final log levels for output.

const logger = new LevelLogger(consoleLogger, LogLevel.Info);
logger.trace('This is a trace message');
logger.debug('This is a debug message');
logger.info('This is an info message');
logger.warn('This is a warn message');
logger.error('This is an error message');

// Output:
// This is an info message
// This is a warn message
// This is an error message

// set new log level to warn
logger.setLogLevel(LogLevel.Warn);
logger.getLogLevel(); // returns 3 = LogLevel.Warn
getLogLevelName(logger.getLogLevel()); // returns 'Warn'
```

or if just like to use ILoggerLike interface:

```typescript
import type {ILoggerLike} from '@avanio/logger-like';
// import only type of ILoggerLike
```
