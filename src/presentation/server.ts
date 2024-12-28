import path from "path";
import { envs } from "../config/plugins/env.plugins";
import { LogDataSource } from "../domain/datasources/log.datasource.general.model";
import { LogEntity, LogSeverityLevel } from "../domain/entities/log.entity";
import { LogRepository } from "../domain/repositories/log.repository";
import { CheckService } from "../domain/use-cases/checks/check-service";
import {
  emailInfoDaily,
  emailInfoWithLogs,
} from "../domain/use-cases/checks/email/email-destinations";
import { SendLogEmailUseCase } from "../domain/use-cases/checks/email/send-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoDatasource } from "../infrastructure/datasources/mongo.datasource";
import { PostgreDataSource } from "../infrastructure/datasources/postgre.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cronService";
import { EmailService } from "./email/email.service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const postgreRepository = new LogRepositoryImpl(new PostgreDataSource());
const mongoRepository = new LogRepositoryImpl(new MongoDatasource());
const fileSystemRepository = new LogRepositoryImpl(new PostgreDataSource());

export class Server {
  static async start() {
    console.log(`server started at ${Date.now()}`);

    const log: LogEntity = {
      level: LogSeverityLevel.critical,
      message: "Log of the server start",
      origin: path.basename(__filename),
      timestamp: new Date(),
    };
    postgreRepository.saveLog(log);
    postgreRepository.getLogs(LogSeverityLevel.critical);
    // Send email

    const emailService = new EmailService();

    const sendLogEmailUseCase = new SendLogEmailUseCase(
      emailService,
      fileSystemRepository
    );

    // const responseEmailOne = emailService.sendMail(emailInfoDaily);
    // const responseEmailTwo = sendLogEmailUseCase.execute(
    //   envs.MAILER_RECEIVER:string
    // );

    CronService.createJob({
      cronTime: "*/5 * * * * *",
      onTick: () => {
        // const url = `https://localhost:${envs.PORT}`;

        const url = `https://google.com`;
        new CheckServiceMultiple(
          [postgreRepository, mongoRepository, fileSystemRepository],
          () =>
            console.log(`${url} is up and running at ${new Date(Date.now())}`), //seccess callback
          (error = "something happened") =>
            console.log(
              `throug the error callback ${error}` //error callback
            )
        ).execute(url);
      },
    });
  }
}
