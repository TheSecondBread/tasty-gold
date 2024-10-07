import React from "react";

function TermsAndConditions() {
  return (
    <div>
      <div className="border-4 border-[#ac0e0b] mt-4 rounded-2xl mb-2 md:border-8 bg-[#ac0e0b]">
        <img src="offer.jpg" alt="offer image" className="rounded-xl" />
      </div>
      <div className="px-2 flex justify-center mt-10">
        <div className="bg-[#FFEDCC] border-4 border-[#980D0B] w-[396px] rounded-[20px] md:w-[600px] h-auto">
          <h1 className="text-[36px] laila-bold text-center custom-text-24 px-4 mt-10">
            Terms and Conditions
          </h1>
          <div className="laila flex flex-col gap-4 text-lg font-medium px-2 mb-10">
            <ol className="flex flex-col gap-4 text-lg font-medium px-2">
              <li>
                1. This offer is valid from 7th Oct 2024 to 30th Nov 2024, or until
                stocks last, whichever occurs first.
              </li>
              <li>
                2. Each mobile number is eligible to register for the Gold Fest offer up to eight times.
              </li>
              <li>
                3. To participate, customers must purchase 2 pouches of IL Tasty
                Gold oil. Participation is through a scratch card and QR code
                redemption process.
              </li>
              <li>
                4. Customers need to scratch the card, scan the QR code, fill the
                required details, and submit the form.
              </li>
              <li>
                5. By participating in this offer, you accept and agree to all
                terms and conditions outlined on our website.
              </li>
              <li>
                6. Participants and winners acknowledge that the company's
                decisions regarding the offer are final and binding.
              </li>
              <li>
                7. Every week, 50 lucky winners will be selected to win a 50 g
                Silver coin each.
              </li>
              <li>
                8. Additionally, as part of our Gold Bumper offer, 4 lucky winners
                will be chosen weekly to win either a 5 g GOLD COIN, a 270 Ltr
                REFRIGERATOR, or a 55-inch Smart LED TV.
              </li>
              <li>
                9. Winners and Gold Bumper Offer Winners will be notified via
                WhatsApp or a phone call, and the winners list will be published
                on our website{" "}
                <a href="https://goldfestoffer.tastygoldoils.com">
                  https://goldfestoffer.tastygoldoils.com
                </a>
                .
              </li>
              <li>
                10. For any further queries, you can reach us at{" "}
                <a href="tel:+918555977303">+91 85559 77303</a> between 10 AM to
                5 PM, Mon to Sat.
              </li>
              <li>
                11. ⁠The recipient who has won the prize will be ineligible to apply for the same offer in the future.
              </li>
            </ol>

            <h2>Additional Terms</h2>

            <ol>
              <li>
                1. The company reserves the right to alter or withdraw the offer at
                any time without prior notice.
              </li>
              <li>
                2. Offer is non-transferable and cannot be exchanged for cash.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
