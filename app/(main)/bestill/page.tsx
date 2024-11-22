"use client";

import React, { useState, useEffect } from "react";

//Components
import FormLayout from "./_components/FormLayout";
import axiosInstance from "@/lib/axiosInstance";

//Cookies
import { setCookie, getCookieValue } from "@/lib/cookies";

type Props = {};

export default function OrderForm({}: Props) {
  //useState
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralUserName, setReferralUserName] = useState<string | null>(null);
  const [referralUserId, setReferralUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  //Function
  const fetchReferralData = async (code: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/get/referral/${code}`);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      } // Remove the else block here
      const data = response.data;
      // Add null checks before accessing nested properties
      setReferralUserName(data.user?.firstName || null);
      setReferralUserId(data.affiliate?.userId || null);

      return data;
    } catch (error) {
      setError((error as Error).message);
      // Add this line to re-throw the error
      throw error;
    } finally {
      setLoading(false);
    }
  };

  //useEffect
  useEffect(() => {
    async function handleReferralCode() {
      try {
        // Add this try-catch block
        //console.log("This is the cookie");
        const existingCode = await getCookieValue("referralCode");

        //console.log("This is the existing code", existingCode);

        if (existingCode) {
          setReferralCode(existingCode);
          const data = await fetchReferralData(existingCode);
          //console.log("This is the data", data);
        } else {
          // If no cookie exists, check the URL for a referral code
          const params = new URLSearchParams(window.location.search);
          const urlCode = params.get("ref");

          if (urlCode) {
            setReferralCode(urlCode);
            const data = await fetchReferralData(urlCode);

            // Set the referral code cookie
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30); // Cookie expires in 30 days
            //await setCookie("referralCode", urlCode, expirationDate);
          }
        }
      } catch (error) {
        console.log("Error in handleReferralCode:");
        setError((error as Error).message);
      }
    }

    handleReferralCode();
  }, []);

  return (
    <div>
      <FormLayout
        referralUserName={referralUserName || ""}
        referralUserId={referralUserId || ""}
      />
    </div>
  );
}
