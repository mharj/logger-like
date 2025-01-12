/**
 * Interface to check if logger instance exists
 * @since v0.2.10
 */
export interface IHasLoggerInstance {
	/**
	 * Check if logger instance exists
	 * @returns true if logger instance exists
	 */
	hasLoggerInstance(): boolean;
}
