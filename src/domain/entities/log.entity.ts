import { ObjectId } from "mongodb";

export enum LogSeverityLevel {
  low = "LOW",
  medium = "MEDIUM",
  high = "HUGH",
  critical = "CRITICAL",
}

interface entityI {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  timestamp?: Date;
}

export interface postgreBaseDocument extends entityI {
  id: number;
}

export interface mongoBaseDocument extends entityI {
  _id: ObjectId;
  type: string;
  __v?: number;
}

export class LogEntity {
  // initialize instance properties for logging purposes to empty with their types

  public level: LogSeverityLevel;
  public message: string;
  public origin: string;
  public timestamp?: Date;

  constructor(newEntity: entityI) {
    const { level, message, origin, timestamp = new Date() } = newEntity;
    this.level = level;
    this.message = message;
    this.origin = origin;
    this.timestamp = timestamp;
  }

  // The new instance created does not inherit the static method because static methods belong to
  // the class itself and not to its instances.
  // Static methods are properties of the class, not the instance.
  static rebuildLog = (json: string) => {
    const { level, message, origin, timestamp } = JSON.parse(json);
    const log = new LogEntity({
      level,
      message,
      origin,
      timestamp,
    });
    return log;
  };
  static rebuildLogFromMongo = (json: mongoBaseDocument): LogEntity => {
    const { level, message, origin, timestamp } = json;
    const log = new LogEntity({
      level,
      message,
      origin,
      timestamp,
    });
    return log;
  };
  static rebuildLogFromPostgre = (json: postgreBaseDocument): LogEntity => {
    const { level, message, origin, timestamp } = json;
    const log = new LogEntity({
      level,
      message,
      origin,
      timestamp,
    });
    return log;
  };
}
