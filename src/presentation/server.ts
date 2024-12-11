import { envs } from "../config/plugins/env.plugins";
import { LogDataSource } from "../domain/datasources/log.datasource";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cronService";

const fileSystemRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
  // new PostGreSQLDatasource()
  // Etc.
);

export class Server {
  static start() {
    console.log(`server started at ${Date.now()}`);

    CronService.createJob({
      cronTime: "*/5 * * * * *",
      onTick: () => {
        const url = `https://localhost:${envs.PORT}`;
        new CheckService(
          fileSystemRepository,
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
