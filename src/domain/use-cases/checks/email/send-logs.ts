import {
  EmailService,
  emailToI,
} from "../../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../../entities/log.entity";
import { LogRepository } from "../../../repositories/log.repository";
import { emailInfoWithLogs } from "./email-destinations";
import { LogRepositoryImpl } from "../../../../infrastructure/repositories/log.repository.impl";
import path from "path";

export interface SendLogEmailUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendLogEmailUseCase implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepositoryImpl: LogRepository
  ) {}
  async execute(to: string | string[]): Promise<boolean> {
    try {
      const logInfo = new LogEntity({
        level: LogSeverityLevel.low,
        message: "Log of the sent email message",
        origin: path.basename(__filename),
        timestamp: new Date(),
      });

      this.logRepositoryImpl.saveLog(logInfo);

      console.log(emailInfoWithLogs);

      const emailService = new EmailService();
      const sentInfo = await emailService.sendMail(emailInfoWithLogs);
      if (!sentInfo) {
        throw new Error("");
      }
      return true;
    } catch (error) {
      console.log("Failed to send log email: ", error);
      return false;
    }
  }
}
