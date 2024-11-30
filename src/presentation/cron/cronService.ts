import { CronJob } from "cron";

interface ICronJobObject {
  cronTime: string | Date;
  onTick: () => void;
}

export class CronService {
  static createJob(cronJobObject: ICronJobObject): void {
    const { cronTime, onTick } = cronJobObject;

    new CronJob(cronTime, onTick).start();
  }
}
