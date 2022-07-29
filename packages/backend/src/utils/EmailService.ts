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
    const subject = `TREAT | You reserved ${mealOffer.title} from ${mealOffer.user.firstName}`;
    const heading = `Thanks for your reservation, ${buyer.firstName}!`;
    const content = `Now, ${
      mealOffer.user.firstName
    } can accept your reservation. You can check the status of your reservations <a href="${this.configService.get(
      "CLIENT_URL"
    )}/meal-reservations/sent">here</a>. Don't worry, we will also notify you if there are any updates! :)`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(buyer.email, subject, mailText);
  }

  private sendCreateReservationMailForSeller(
    mealOffer: MealOfferDocumentWithUser,
    buyer: UserDocument,
    seller: UserDocument
  ): void {
    const subject = `TREAT | ${buyer.firstName} reserved ${mealOffer.title}`;
    const heading = `You received a new reservation for ${mealOffer.title}`;
    const content = `${buyer.firstName} reserved your meal ${
      mealOffer.title
    }. Now, you can accept or reject the reservation <a href="${this.configService.get(
      "CLIENT_URL"
    )}/meal-reservations/received">here</a>.`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(seller.email, subject, mailText);
  }

  public sendUpdateReservationToSellerAcceptedMail(
    mealOffer: MealOfferDocument,
    buyer: UserDocument,
    seller: UserDocument
  ): void {
    const subject = `TREAT | ${seller.firstName} accepted your reservation for ${mealOffer.title}`;
    const heading = `${buyer.firstName}, you are one step away from getting ${mealOffer.title}!`;
    const content = `Your reservation got accepted. Now you can confirm your request <a href="${this.configService.get(
      "CLIENT_URL"
    )}/meal-reservations/sent">here</a>. Only after your confirmation, the price of ${
      mealOffer.price + mealOffer.transactionFee
    } credits will be deducted from your account (including ${
      mealOffer.transactionFee
    } credits transaction fee).<br /><br />Here are the details for when you pick up the meal: ${
      mealOffer.pickUpDetails
    }`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(buyer.email, subject, mailText);
  }

  public sendUpdateReservationToSellerRejectedMail(
    mealOffer: MealOfferDocument,
    buyer: UserDocument
  ): void {
    const subject = `TREAT | Your reservation for ${mealOffer.title} got cancelled`;
    const heading = `Next time, ${buyer.firstName}!`;
    const content = `Unfortunately, the seller rejected your reservation for ${
      mealOffer.title
    }. Heads up, go to <a href="${this.configService.get(
      "CLIENT_URL"
    )}">www.treat.de</a> and reserve another meal! :)`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(buyer.email, subject, mailText);
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
    const subject = `TREAT | You confirmed your reservation for ${mealOffer.title}`;
    const heading = `Enjoy your meal, ${buyer.firstName}!`;
    const content = `Thanks for confirming your reservation for ${mealOffer.title}.<br /><br />Here are the pickup details: ${mealOffer.pickUpDetails}<br /><br /><b>Please contact ${seller.firstName} to pick up the meal: <a href="mailto:${seller.email}">${seller.email}</a></b>`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(buyer.email, subject, mailText);
  }

  private sendUpdateReservationToBuyerConfirmedForSeller(
    mealOffer: MealOfferDocument,
    buyer: UserDocument,
    seller: UserDocument
  ): void {
    const subject = `TREAT | Reservation for ${mealOffer.title} has been confirmed`;
    const heading = `Congrats, ${buyer.firstName} has confirmed the reservation for ${mealOffer.title}`;
    const content = `${buyer.firstName} decided to pick up your meal. ${buyer.firstName} received your email address to contact you for clarifying everything regarding the pickup.`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(seller.email, subject, mailText);
  }

  public sendUpdateReservationToBuyerRejectedMail(
    mealOffer: MealOfferDocument,
    buyer: UserDocument,
    seller: UserDocument
  ): void {
    const subject = `TREAT | Reservation for ${mealOffer.title} has been cancelled`;
    const heading = `Next time, ${buyer.firstName}!`;
    const content = `${buyer.firstName} cancelled the request for your offer ${mealOffer.title}. Don't worry, someone else will come and get it! :)`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(seller.email, subject, mailText);
  }

  private getTemplate(heading: string, content: string) {
    return `<div style="display: block; width: 100%; height: 100%">
                <div style="display: block; max-width: 600px; margin: 2em auto; background-color: rgb(239, 239, 239);">
                    <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100px; background-color: #BFD0CD; text-align: center">
                        <div style="text-decoration: underline; text-decoration-color: white; color: black; font-size: 3em;">TREAT</div>
                    </div>
                    <div style="display: block; width: 100%; padding: 1em; box-sizing: border-box">
                      <h1>${heading}</h1>
                      <p>${content}</p>
                      <p>Best, your TREAT Team</p>
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 50px; background-color: #8A8A8A; text-align: center">
                        <div><a href="${this.configService.get(
                          "CLIENT_URL"
                        )}" style="color: white">www.treat.de</a></span>
                    </div>
                </div>
            </div>`;
  }

  public sendRegisterMail(user: UserDocument): void {
    const subject = `Welcome to TREAT, ${user.firstName}`;
    const heading = `Welcome, ${user.firstName}!`;
    const content = `Thanks for signing up to TREAT. Get started, and grab your first meal <a href="${this.configService.get(
      "CLIENT_URL"
    )}/meals">here</a>. Enjoy! :)<br /><br />Do you have leftovers? Offer your first meal <a href="${this.configService.get(
      "CLIENT_URL"
    )}/meals/create">here</a>.`;
    const mailText = this.getTemplate(heading, content);
    this.sendMail(user.email, subject, mailText);
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
