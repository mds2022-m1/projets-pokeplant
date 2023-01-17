import {
  getResetPasswordStatus,
  getSession,
  setSession,
} from "../actions/session";
import { getProfileInformation } from "../actions/user-api";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { supabase } from "../app/supabaseClient";
import { passwordRecoveryUpdated } from "../features/session-slice";
import { useEffect } from "react";
// import useInterval from 'use-interval';
export const MagicInitializingComponent = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.session.session);

  useEffect(() => {
    dispatch(getSession());
    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
      if (_event === "PASSWORD_RECOVERY") {
        dispatch(passwordRecoveryUpdated(true));
        localStorage.setItem("passwordRecovery", "true");
      }
      
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If Session changes, fetch user information
  useEffect(() => {
    if (session) {
      dispatch(getProfileInformation(session));
      dispatch(getResetPasswordStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, dispatch]);

  // // Fetch Medical Devices once on component mount if the API is enabled AND the user is a patient
  // useEffect(() => {
  //   if(apiInstrumentFetchEnabled && userKind === "patient")
  //     dispatch(fetchAndSetMedicalDevices());
  // }, [apiInstrumentFetchEnabled, dispatch, userKind]);

  // useInterval(() => {
  //   // If API is enabled AND the user is a patient, fetch measurements for each medical device
  //   if(apiInstrumentFetchEnabled && userKind === "patient") {
  //       medicalDevices.forEach((medicalDevice, index) => {
  //           dispatch(fetchAndSetMedicalDeviceMeasurements(medicalDevice.id.toString()));
  //       });
  //   }
  // }, apiFetchDelay); // passing null instead of 1000 will cancel the interval if it is already running

  return null;
};
