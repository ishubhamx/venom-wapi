import { Page } from 'puppeteer';
import { HostLayer } from './host.layer';
import {
  base64MimeType,
  fileToBase64,
  downloadFileToBase64,
  resizeImg
} from '../helpers';
import { CreateConfig } from '../../config/create-config';

export class ProfileLayer extends HostLayer {
  constructor(public page: Page, session?: string, options?: CreateConfig) {
    super(page, session, options);
  }

  /**
   * @param contactsId Example: 0000@c.us | [000@c.us, 1111@c.us]
   * @param time duration of silence
   * @param type kind of silence "hours" "minutes" "year"
   * To remove the silence, just enter the contact parameter
   */
  public sendMute(id: string, time: number, type: string): Promise<object> {
    return new Promise(async (resolve, reject) => {
      const result = await this.page.evaluate(
        (id, time, type) => WAPI.sendMute(id, time, type),
        id,
        time,
        type
      );
      if (result['erro'] == true) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  }

  /**
   * Change the theme
   * @param string types "dark" or "light"
   */
  public setTheme(type: string) {
    return this.page.evaluate((type) => WAPI.setTheme(type), type);
  }

  /**
   * Sets current user profile status
   * @param status
   */
  public async setProfileStatus(status: string) {
    await this.page.evaluate(
      ({ status }) => {
        WAPI.setMyStatus(status);
      },
      { status }
    );
    return 200;
  }

  /**
   * Sets the user's current profile photo
   * @param name
   */
  public async setProfilePic(path: string) {
    let b64 = await downloadFileToBase64(path, [
      'image/gif',
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/webp'
    ]);
    if (!b64) {
      b64 = await fileToBase64(path);
    }
    if (b64) {
      const buff = Buffer.from(
        b64.replace(/^data:image\/(png|jpe?g|webp);base64,/, ''),
        'base64'
      );
      const mimeInfo = base64MimeType(b64);

      if (!mimeInfo || mimeInfo.includes('image')) {
        let _webb64_96 = await resizeImg(buff, { width: 96, height: 96 }),
          _webb64_640 = await resizeImg(buff, { width: 640, height: 640 });
        let obj = { a: _webb64_640, b: _webb64_96 };
        return await this.page.evaluate(
          async ({ mimeInfo, obj }) =>
            await WPP.profile.setMyProfilePicture(
              `data:${mimeInfo};base64,` + obj.a
            ),
          {
            mimeInfo,
            obj
          }
        );
      } else {
        console.log('Not an image, allowed formats png, jpeg and webp');
        return false;
      }
    }
  }

  /**
   * Sets current user profile name
   * @param name
   */
  public async setProfileName(name: string) {
    this.page.evaluate(
      ({ name }) => {
        WAPI.setMyName(name);
      },
      { name }
    );
    return 200;
  }
}
