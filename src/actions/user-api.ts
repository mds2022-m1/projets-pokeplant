import { Session } from "@supabase/supabase-js";
import { supabase } from "../app/supabaseClient";
import { userGenderChanged, userIdChanged, userNameChanged } from "../features/user-slice";

export const getProfileInformation = (session: Session) => {
  return async (
    dispatch: (arg0: { type: string; payload: any }) => void,
    getState: any
  ) => {
    try {
      const { user } = session;

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, gender`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data)
        dispatch(userNameChanged(data.username));
        dispatch(userIdChanged(user.id));
        dispatch(userGenderChanged(data.gender))
      }
    } catch (error) {
      console.log((error as any).message);
    }
  };
};

export const updateProfileInformation = (session: Session, data: any) => {
  return async (
    dispatch: (arg0: { type: string; payload: any }) => void,
    getState: any
  ) => {
    try {
      const { user } = session;

      const updates = {
        id: user.id,
        username: data.username,
        website: data.website,
        avatar_url: data.avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      } else {
        dispatch(userNameChanged(data.username));
        dispatch(userIdChanged(user.id));
      }
    } catch (error) {
      alert((error as any).message);
    }
  };
};

