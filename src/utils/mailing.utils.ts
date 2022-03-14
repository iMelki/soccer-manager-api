import { MailerService } from '@nestjs-modules/mailer';

// import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
// import commonConstants from '../constants/common.constants';

class MailingUtils {
  public static async sendVerificationEmail(
    email: string,
    mailerService: MailerService,
    token: string,
  ) {
    await mailerService.sendMail({
      to: email,
      from: process.env.MAILER_FROM_EMAIL,
      // subject: authConstants.mailer.verifyEmail.subject,
      template: `${process.cwd()}/src/templates/verify-password`,
      context: {
        token,
        email,
        host: process.env.SERVER_HOST,
      },
    });
  }
}

export default new MailingUtils();
