import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

export default function TermsAndConditions() {
  return (
    <main className="grow px-8 bg-information-background bg-cover bg-center flex flex-col items-center">
      <div className="mb-10 bg-gray-100 opacity-95 p-4 max-w-[1000px]">
        <h2 className="mb-2">Brilliantwear - Terms and Conditions</h2>
        <p className="text-red-600 opacity-100 mb-2">
          Disclaimer: Brilliantwear is a project and an idea in development.
        </p>
        <p>
          Welcome to Brilliantwear! By accessing our website and using our
          services, you agree to comply with and be bound by the following terms
          and conditions. Please read them carefully.
        </p>
        <ol className="mt-4 px-5 list-decimal space-y-2">
          <li>
            <p className="font-bold">Acceptance of Terms:</p>
            <p>
              By using Brilliantwear, you acknowledge that you have read,
              understood, and agree to be bound by these terms and conditions.
              If you do not agree with any part of these terms, please refrain
              from using our website.
            </p>
          </li>
          <li>
            <p className="font-bold">Privacy and Data Handling:</p>
            <p>
              Your privacy is important to us. Brilliantwear is dedicated to
              safeguarding your personal information and using it responsibly.
              We employ industry-standard practices to protect your data. For
              detailed information on how we collect, use, and secure your
              personal information, please review our{" "}
              <Link
                href="/privacy-notice"
                className="font-medium text-blue-600 hover:underline"
              >
                Privacy Notice
              </Link>
              .{" "}
            </p>
          </li>
          <li>
            <p className="font-bold">Product Information:</p>
            <p>
              We strive to provide accurate and up-to-date information regarding
              our products. However, we do not warrant the accuracy,
              completeness, or reliability of any product descriptions or images
              on our website.
            </p>
          </li>
          <li>
            <p className="font-bold">Order and Payment:</p>
            <p>
              When you place an order on Brilliantwear, you agree to provide
              accurate and complete information. Payments are processed through
              secure and trusted payment gateways. We reserve the right to
              refuse or cancel any order for any reason.
            </p>
          </li>
          <li>
            <p className="font-bold">Product Returns:</p>
            <p>
              If, for any reason, you are dissatisfied with your Brilliantwear
              purchase, please contact us within a reasonable timeframe. We will
              work with you to address your concerns and explore potential
              solutions. Keep in mind that certain conditions may apply, and we
              are committed to ensuring your satisfaction with our products.
            </p>
          </li>
          <li>
            <p className="font-bold">Intellectual Property:</p>
            <p>
              All content on Brilliantwear, including text, images, logos, and
              designs, is the property of Brilliantwear and is protected by
              intellectual property laws. You may not use, reproduce, or
              distribute our content without our express written permission.
            </p>
          </li>
          <li>
            <p className="font-bold">Disclaimer of Warranties:</p>
            <p>
              Brilliantwear is provided "as is" and without warranties of any
              kind, whether express or implied. We do not warrant that our
              website will be error-free, secure, or uninterrupted.
            </p>
          </li>
          <li>
            <p className="font-bold">Limitation of Liability:</p>
            <p>
              Brilliantwear shall not be liable for any direct, indirect,
              incidental, consequential, or punitive damages arising out of your
              use of our website or products.
            </p>
          </li>
          <li>
            <p className="font-bold">Changes to Terms and Conditions:</p>
            <p>
              Brilliantwear reserves the right to modify or update these terms
              and conditions at any time without prior notice. It is your
              responsibility to review these terms periodically.
            </p>
          </li>
        </ol>
        <p className="mt-4">
          By using Brilliantwear, you agree to abide by these terms and
          conditions. If you have any questions or concerns, please feel free to{" "}
          <Link
            href="/contact"
            className="font-medium text-blue-600 hover:underline"
          >
            contact us
          </Link>
          .
        </p>
        <p className="font-bold mt-4 mb-2">
          Thank you for choosing Brilliantwear!
        </p>
      </div>
    </main>
  );
}
