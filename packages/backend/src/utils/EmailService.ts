import nodemailer from "nodemailer";
import { ConfigService } from "./ConfigService";
import { Service } from "typedi";
import Logger, { ILogMessage } from "./logger";
import {
  MealOfferDocument,
  MealOfferDocumentWithUser,
} from "../resources/mealOffer/mealOffer.interface";
import UserDocument from "../resources/user/user.interface";

@Service()
class MailService {
  private configService: ConfigService = new ConfigService();
  private transporter: nodemailer.Transporter;
  private readonly email: string;

  constructor() {
    this.email = this.configService.get("EMAIL");
    Logger.info({
      functionName: "MailService constructor()",
      message: `Use ${this.email} as email`,
    } as ILogMessage);
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.email,
        pass: this.configService.get("EMAIL_PASSWORD"),
      },
    });
  }

  public sendCreateReservationMails(
    mealOffer: MealOfferDocumentWithUser,
    buyer: UserDocument,
    seller: UserDocument
  ): void {
    this.sendCreateReservationMailForBuyer(mealOffer, buyer);
    this.sendCreateReservationMailForSeller(mealOffer, buyer, seller);
  }

  private sendCreateReservationMailForBuyer(
    mealOffer: MealOfferDocumentWithUser,
    buyer: UserDocument
  ): void {
    const heading = `You created a reservation for ${mealOffer.user.firstName}'s offer ${mealOffer.title}`;
    const content = `Thanks for your reservation ${buyer.firstName}! Now ${mealOffer.user.firstName} has the chance to accept your reservation. You will get notified if there are any news! :)`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(buyer.email, heading, mailText);
  }

  private sendCreateReservationMailForSeller(
    mealOffer: MealOfferDocumentWithUser,
    buyer: UserDocument,
    seller: UserDocument
  ): void {
    const heading = `You received a new reservation for your offer ${mealOffer.title}`;
    const content = `You got a new reservation from ${buyer.firstName}. Now you can accept or reject the reservation request`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(seller.email, heading, mailText);
  }

  public sendUpdateReservationToSellerAcceptedMail(
    mealOffer: MealOfferDocument,
    buyer: UserDocument,
    seller: UserDocument
  ): void {
    const heading = `${seller.firstName} accepted your reservation for the offer ${mealOffer.title}!`;
    const content = `Your reservation got accepted. Now you can confirm your request. Only after your confirmation ${
      mealOffer.price + mealOffer.transactionFee
    } credits will be deducted from your account. This prices includes ${
      mealOffer.transactionFee
    } credits transaction fee.`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(buyer.email, heading, mailText);
  }

  public sendUpdateReservationToSellerRejectedMail(
    mealOffer: MealOfferDocument,
    buyer: UserDocument
  ): void {
    const heading = `Your reservation for the offer ${mealOffer.title} got rejected`;
    const content = `Unfortunately your reservation for the offer ${mealOffer.title} got rejected! Heads up you will get the next one.`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(buyer.email, heading, mailText);
  }

  public sendUpdateReservationToBuyerConfirmedMails(
    mealOffer: MealOfferDocument,
    buyer: UserDocument,
    seller: UserDocument
  ): void {
    this.sendUpdateReservationToBuyerConfirmedForBuyer(
      mealOffer,
      buyer,
      seller
    );
    this.sendUpdateReservationToBuyerConfirmedForSeller(
      mealOffer,
      buyer,
      seller
    );
  }

  private sendUpdateReservationToBuyerConfirmedForBuyer(
    mealOffer: MealOfferDocument,
    buyer: UserDocument,
    seller: UserDocument
  ): void {
    const heading = `You confirmed your request for the offer ${mealOffer.title}`;
    const content = `Thanks for confirming your request for the offer ${mealOffer.title}. Now you can get in contact with ${seller.firstName}. The email address is ${seller.email}`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(buyer.email, heading, mailText);
  }

  private sendUpdateReservationToBuyerConfirmedForSeller(
    mealOffer: MealOfferDocument,
    buyer: UserDocument,
    seller: UserDocument
  ): void {
    const heading = `${buyer.firstName} confirmed the request for your offer ${mealOffer.title}`;
    const content = `${buyer.firstName} confirmed the request. ${buyer.firstName} just received your email address and will get in contact with you to clarify everything regarding the pickup`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(seller.email, heading, mailText);
  }

  public sendUpdateReservationToBuyerRejectedMail(
    mealOffer: MealOfferDocument,
    buyer: UserDocument,
    seller: UserDocument
  ): void {
    const heading = `${buyer.firstName} cancelled the request for your offer ${mealOffer.title}`;
    const content = `${buyer.firstName} cancelled the request for your offer. Don't be sad some else will come and get it`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(seller.email, heading, mailText);
  }

  private getTemplate(heading: string, content: string) {
    return `<h1>${heading}</h1><p>${content}</p><br><p>Best, your Treat Team</p>`;
  }

  public sendRegisterMail(user: UserDocument): void {
    const heading = `Welcome ${user.firstName}`;
    const content = `Thanks for signing up on Treat`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(user.email, heading, mailText);
  }

  private sendMail(to: string, subject: string, text: string): void | Error {
    const mailOptions = {
      from: this.email,
      to: to,
      subject: subject,
      html: text,
    };
    this.transporter.sendMail(
      mailOptions,
      function (error, info: nodemailer.SentMessageInfo) {
        if (error) {
          Logger.error({
            functionName: "sendMail",
            message: `Could not send mail to ${to}`,
            details: error,
          } as ILogMessage);
          throw new Error("Could not send mail");
        }
        Logger.info({
          functionName: "sendMail",
          message: "Successfully send mail",
          details: `Mail from ${info.from} to ${info.to}`,
        } as ILogMessage);
      }
    );
  }
}

export default MailService;
