export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
  critical = "critical",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public timestamp: Date;

  constructor(level: LogSeverityLevel, message: string) {
    this.level = level;
    this.message = message;
    this.timestamp = new Date();
  }

  // The new instance created does not inherit the static method because static methods belong to
  // the class itself and not to its instances.
  // Static methods are properties of the class, not the instance.
  static rebuildLog = (json: string) => {
    const { level, message, timestamp } = JSON.parse(json);
    const log = new LogEntity(level, message); // timestamp is set on runtime
    log.timestamp = timestamp; // assign original timestamp to log
    return log;
  };
}
