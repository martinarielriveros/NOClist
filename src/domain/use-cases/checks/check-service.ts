import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  // TypeScript provides a shorthand where you can define and initialize a property directly from the constructor parameters
  // by using an access modifier (public, private, protected, or readonly) in the constructor signature:

  // Automatically creates an instance property called LogRepository, successCallback and errorCallback
  // and initializes it with the value passed.

  constructor(
    private readonly LogRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Network response was not ok on ${url}`);
      }
      const log = new LogEntity(
        LogSeverityLevel.low,
        `Service ${url} up & running `
      );

      this.LogRepository.saveLog(log);

      this.successCallback();

      return true;
    } catch (error) {
      const log = new LogEntity(
        LogSeverityLevel.critical,
        `Service ${url} down down down!! because ${error}`
      );
      this.LogRepository.saveLog(log);
      this.errorCallback(`${error}`);

      return false;
    }
  }
}
