import React from "react";
import { MdReceiptLong } from "react-icons/md";

export const TermsConditions = () => {
  return (
    <div className="max-w-5xl mx-auto mt-[80px] mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg items-center justify-center flex flex-col">
      <div className="flex dark:text-white text-gray-700 text-2xl  font-semibold">
        Terms and Conditions <i className="fa-solid fa-exclamation text-3xl font-bold ml-2"></i>
      </div>
      
  <div className="space-y-6 dark:text-gray-300 text-gray-600 text-lg mt-6 mb-6 max-h-screen overflow-y-auto pr-2 max-w-3xl">
    <p>1. <strong className="text-yellow-500">Meal Registration Policy:</strong> Meal charges are based on your <em>registered meal record</em>, not your daily checkout. Even if absent, you must pay for all registered meals.</p>
    <hr/>
    <p>2. <strong className="text-yellow-500">Checkout Time Restriction:</strong> Checkout is available only between <strong>11:00 AM and 12:00 PM</strong>.</p>
    <hr/>
    <p>3. <strong className="text-yellow-500">Missed Checkout Rule:</strong> If you do not checkout 5 times within a month, you will not be eligible for our food service next month.</p>
    <hr/>
    <p>4. <strong className="text-yellow-500">Billing & Payment:</strong> Charges are calculated monthly based on your registered meals, regardless of attendance.</p>
    <hr/>
    <p>5. <strong className="text-yellow-500">Privacy:</strong> Your information is only used for food tracking and internal billing purposes.</p>
    <hr/>
  </div>
</div>

    
  );
};
