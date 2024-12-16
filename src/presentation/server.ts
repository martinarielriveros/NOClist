import { envs } from "../config/plugins/env.plugins";
import { LogDataSource } from "../domain/datasources/log.datasource";
import { LogRepository } from "../domain/repositories/log.repository";
import { CheckService } from "../domain/use-cases/checks/check-service";
import {
  emailInfoDaily,
  emailInfoWithLogs,
} from "../domain/use-cases/checks/email/email-destinations";
import { SendLogEmailUseCase } from "../domain/use-cases/checks/email/send-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cronService";
import { EmailService } from "./email/email.service";

console.log(JSON.stringify(envs, null, 2));

const fileSystemRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
  // new PostGreSQLDatasource()
  // Etc.
);

export class Server {
  static start() {
    console.log(`server started at ${Date.now()}`);

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

    // CronService.createJob({
    //   cronTime: "*/5 * * * * *",
    //   onTick: () => {
    //     // const url = `https://localhost:${envs.PORT}`;

    //     const url = `https://google.com`;
    //     new CheckService(
    //       fileSystemRepository,
    //       () =>
    //         console.log(`${url} is up and running at ${new Date(Date.now())}`), //seccess callback
    //       (error = "something happened") =>
    //         console.log(
    //           `throug the error callback ${error}` //error callback
    //         )
    //     ).execute(url);
    //   },
    // });
  }
}
