import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cronService";

export class Server {
  public static start() {
    console.log(`server started at ${Date.now()}`);

    CronService.createJob({
      cronTime: "*/5 * * * * *",
      onTick: () => {
        const url = "https://google.com";
        new CheckService(
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
