import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice",
};

export default function PrivacyNotice() {
  return (
    <main className="grow px-8 bg-information-background bg-cover bg-center flex flex-col items-center">
      <div className="mb-10 bg-gray-100 opacity-95 p-4 max-w-[1000px]">
        <h2 className="mb-2">Brilliantwear - Privacy Notice</h2>
        <p className="text-red-600 opacity-100 mb-2">
          Disclaimer: Brilliantwear is a project and an idea in development.
        </p>
        <p className="my-2 text-gray-600 font-bold">
          Last Updated: 23 February 2024
        </p>
        <p>
          Your privacy is important to us, and we are committed to protecting
          your personal information. This Privacy Notice explains how we
          collect, use, disclose, and safeguard your information in accordance
          with the General Data Protection Regulation (GDPR).
        </p>
        <h3 className="text-xl lg:text-2xl mt-3">Information We Collect</h3>
        <ol className="mt-1 ms-5 list-decimal">
          <li className="font-bold mt-0.5">
            <p>Personal Information:</p>
            <div className="-ms-3.5 font-normal">
              <p>We collect the following personal information:</p>
              <ul className="ms-5 mt-1 list-disc">
                <li>Email</li>
                <li>Name</li>
                <li>Phone number</li>
                {/* <li>
                  Address (Street, Street number, City, Postal Code, Country)
                </li> */}
                <li>Street and number</li>
                <li>City</li>
                <li>Postal code</li>
                <li>Country</li>
                <li>Service point chosen during checkout</li>
                <li>Cart details</li>
                <li>Paypal order capture details</li>
              </ul>
            </div>
          </li>
          <li className="font-bold mt-2">
            <p>Cookies:</p>
            <p className="-ms-4 font-normal">
              Only third-party cookies are used on the website from Paypal
              during the payment step of the checkout process.
            </p>
          </li>
          <li className="font-bold mt-2">
            <p>Shopping Assistant Queries:</p>
            <p className="-ms-4 font-normal">
              We save data related to your queries made to the shopping
              assistant for future features and to improve this feature. Please
              note that shopping assistant queries cannot be associated with
              your personal data.
            </p>
          </li>
          <li className="font-bold mt-2">
            <p>Device Information:</p>
            <p className="-ms-4 font-normal">
              We collect the IP address of the device accessing the website,
              along with URLs visited.
            </p>
          </li>
        </ol>
        <h3 className="text-xl lg:text-2xl mt-3">
          How We Use Your Information
        </h3>
        <p>We use your information for the following purposes:</p>
        <ul className="ms-5 mt-1 list-disc">
          <li>
            <b>Order Processing:</b> To process and fulfill your orders.
          </li>
          <li>
            <b>Contact:</b> To get in touch in case you fill in the contact
            request form.
          </li>
          <li>
            <b>Future Features:</b> To utilize shopping assistant queries for
            future features and improve this feature.
          </li>
        </ul>
        <h3 className="text-xl lg:text-2xl mt-3">Data Retention</h3>
        <p>
          We retain your personal information for as long as necessary to
          fulfill the relevant purposes described in this Privacy Notice but no
          longer than 10 years.
        </p>
        <h3 className="text-xl lg:text-2xl mt-3">Data Security</h3>
        <p>We prioritize the security of your information:</p>
        <ul className="ms-5 mt-1 list-disc">
          <li>
            <b>Encryption:</b> We use encryption for all communication.
          </li>
          <li>
            <b>Storage:</b> Data is stored with authorization.
          </li>
          <li>
            <b>Server Location:</b> Information is saved on servers within
            Europe.
          </li>
        </ul>
        <h3 className="text-xl lg:text-2xl mt-3">Your Choices</h3>
        <ul className="ms-5 mt-1 list-disc">
          <li>
            <b>Opt-Out:</b> While we do not use your information for
            personalization and marketing, you can still opt-out of any
            non-essential communication.
          </li>
          <li>
            <b>Access and Correction:</b> You can request access to your
            personal information, correct inaccuracies, or request removal.
          </li>
        </ul>
        <h3 className="text-xl lg:text-2xl mt-3">Data Sharing</h3>
        <p>We do not share your information with any external parties.</p>
        <h3 className="text-xl lg:text-2xl mt-3">
          Changes to This Privacy Notice
        </h3>
        <p>
          We may update this Privacy Notice from time to time to reflect changes
          in our practices. The updated notice will be posted on our website
          with the revised &quot;Last Updated&quot; date.
        </p>
        <h3 className="text-xl lg:text-2xl mt-3">Contact Us</h3>
        <p>
          If you have any questions or concerns regarding your privacy, or if
          you wish to remove your data, please{" "}
          <Link
            href="/contact"
            className="font-medium text-blue-600 hover:underline"
          >
            contact us
          </Link>
          .
        </p>
        <p className="font-bold mt-4 mb-2">
          Thank you for trusting Brilliantwear with your information.
        </p>
      </div>
    </main>
  );
}
