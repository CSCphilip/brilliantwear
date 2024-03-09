"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CookieBanner() {
  const [isBannerShown, setIsBannerShown] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("cookieBanner") !== "accepted") {
      setIsBannerShown(true);
    }
  }, []);

  const bannerVariants = {
    open: { height: "auto", transition: { duration: 1 } },
    closed: { height: 0, transition: { duration: 0.5 } },
  };

  function handleAccept() {
    setIsBannerShown(false);
    localStorage.setItem("cookieBanner", "accepted");
  }

  return (
    <motion.div
      initial={false}
      animate={isBannerShown ? "open" : "closed"}
      variants={bannerVariants}
      className="fixed bottom-0 z-50 w-screen bg-indigo-700 px-5 flex justify-center font-interSansSerif text-white"
    >
      <div className="w-full max-w-[500px] flex flex-col items-center mt-3">
        <p className="text-center">
          We use cookies to give you the best possible experience on our
          website. By clicking &quot;Accept&quot;, you are agreeing to the use
          of cookies.{" "}
          <a href="/privacy-notice" className="underline hover:text-gray-300">
            Learn more
          </a>
        </p>
        <button
          onClick={handleAccept}
          className="mt-3 mb-5 w-full max-w-[150px] lg:max-w-[350px] bg-gray-100 hover:bg-gray-300 text-black font-medium py-2 rounded-md"
        >
          Yes, I Accept
        </button>
      </div>
    </motion.div>
  );
}
