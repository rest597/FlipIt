import * as fancylog from 'fancy-log';

export default class Log {
  public static info(msg: any, isPrivate: Boolean = false) {
    if (Log.isDevMode() || !isPrivate) {
      fancylog.info(msg);
    }
  }

  public static warn(msg: any, isPrivate: Boolean = false) {
    if (Log.isDevMode() || !isPrivate) {
      fancylog.warn(msg);
    }
  }

  public static error(msg: any, isPrivate: Boolean = false) {
    if (Log.isDevMode() || !isPrivate) {
      fancylog.error(msg);
    }
  }

  private static isDevMode(): Boolean {
    return (
      process.env.DEVELOPMENT_MODE != null &&
      process.env.DEVELOPMENT_MODE == 'true'
    );
  }
}
