import path = require('path');
import { existsSync, unlink } from 'fs';
import { Logger } from 'winston';
import * as chalk from 'chalk';

export async function deleteFiles(
  mergedOptions: any,
  Session: String,
  logger: Logger
) {
  let session = Session;
  logger.info(`${chalk.red('removeFile')}`, {
    session,
    type: 'connection'
  });
  const pathTokens: string = path.join(
    path.resolve(
      process.cwd() + mergedOptions.mkdirFolderToken,
      mergedOptions.folderNameToken
    ),
    `${Session}.data.json`
  );
  if (existsSync(pathTokens)) {
    unlink(pathTokens, (err) => {
      if (err) {
        logger.info(`${chalk.green('removeFile')}`, {
          session,
          type: 'connection'
        });
      }
      logger.info(`Not removed file: ${pathTokens}`, {
        session,
        type: 'connection'
      });
    });
  } else {
    logger.info(`${chalk.red(`Not Files: ${pathTokens}`)}`, {
      session,
      type: 'connection'
    });
  }
}
