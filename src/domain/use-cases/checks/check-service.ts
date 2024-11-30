interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
  }

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Network response was not ok on ${url}`);
      }

      this.successCallback();

      return true;
    } catch (error) {
      this.errorCallback(`${error}`);

      return false;
    }
  }
}
