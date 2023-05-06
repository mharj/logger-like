# @avanio/logger-like

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

This package contains:

- A common **ILoggerLike** logger interface that works with console, winston, and log4js.
- A const **LogLevel** log level "enum."
- A **LevelLogger** logger class implementation that can set log levels and acts as filter for the actual logger implementation.
- A **IGetLoggerLevel** and **ISetLoggerLevel** interfaces that can be used to get and set log levels.

## Installation

```bash
npm install @avanio/logger-like
```

## Usage

### Importing

```typescript
import {ILoggerLike, LevelLogger, LogLevel} from '@avanio/logger-like';
```

### ILoggerLike Interface

The **ILoggerLike** interface defines a common logging interface that should work with console, winston, and log4js. The interface includes the following methods:

```typescript
interface ILoggerLike {
	trace?(message: any, ...args: any[]): void;
	debug(message: any, ...args: any[]): void;
	info(message: any, ...args: any[]): void;
	warn(message: any, ...args: any[]): void;
	error(message: any, ...args: any[]): void;
}
```

### LogLevel const "Enum"

The LogLevel const enum defines the following log levels and type:

```typescript
const LogLevel = {
	Trace: 0,
	Debug: 1,
	Info: 2,
	Warn: 3,
	Error: 4,
} as const;

type LogLevelValue = 0 | 1 | 2 | 3 | 4;
```

### getLogLevelName Function

The **getLogLevelName** function returns the log level name for the given log level value. The function includes the following method:

```typescript
function getLogLevelName(level: LogLevelValue): LogLevelKey;
// type LogLevelKey = "Trace" | "Debug" | "Info" | "Warn" | "Error"
```

### IGetLoggerLevel Interface

The **IGetLoggerLevel** interface provides a method to get the current log level. The interface includes the following method:

```typescript
interface IGetLoggerLevel {
	getLogLevel(): LogLevelValue;
}
```

### ISetLoggerLevel Interface

The **ISetLoggerLevel** interface provides a method to set the log level. The interface includes the following method:

```typescript
interface ISetLoggerLevel {
	setLogLevel(level?: LogLevelValue): void;
}
```

As example this interface can be utilized something like controlling multiple services different log levels on fly.

### LevelLogger Class

The **LevelLogger** class is a logger implementation that can set current log levels and acts as filter for the actual logger implementation.
The class implements both the **ILoggerLike**, **IGetLoggerLevel** and **ISetLoggerLevel** interfaces.
This is useful when you need to set the log level dynamically, like in internal class or one part of application by creating a new instance of the LevelLogger for that specific part of the application.

Constructor:

```typescript
new LevelLogger(logger: ILoggerLike, level?: LogLevelValue);
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

or if just need ILoggerLike interface:

```typescript
import type {ILoggerLike} from '@avanio/logger-like';
// import only type of ILoggerLike
```
