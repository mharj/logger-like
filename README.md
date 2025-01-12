# @avanio/logger-like

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![npm version](https://badge.fury.io/js/@avanio%2Flogger-like.svg)](https://badge.fury.io/js/@avanio%2Flogger-like)
[![Maintainability](https://api.codeclimate.com/v1/badges/879b79714b63f852a07d/maintainability)](https://codeclimate.com/github/mharj/logger-like/maintainability)
![github action](https://github.com/mharj/logger-like/actions/workflows/main.yml/badge.svg?branch=main)

## Overview

Generic logger utilities and tools for TypeScript/JavaScript projects.

## Content

This package main components:

- A common [**ILoggerLike**](https://mharj.github.io/logger-like/interfaces/ILoggerLike.html) logger interface that works with console, winston, and log4js.
- A [**LevelLogger**](https://mharj.github.io/logger-like/classes/LevelLogger.html) logger class implementation that can set log levels and acts as filter for the actual logger implementation.
- A [**PrefixLogger**](https://mharj.github.io/logger-like/classes/PrefixLogger.html) logger class implementation that can add a prefix to the log messages.
- A [**MapLogger**](https://mharj.github.io/logger-like/classes/MapLogger.html), logger class implementation that can be used to map log levels to different log keys.

See full [Documentation](https://mharj.github.io/logger-like/) for more details.

## Installation

```bash
npm install @avanio/logger-like
```
