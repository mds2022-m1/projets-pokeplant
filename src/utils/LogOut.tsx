import { getAuth, signOut } from "firebase/auth";
import { useAppDispatch } from "../app/hooks";
import { userLoggedOut } from "../features/user-slice";
export function LogOut() {
    const auth = getAuth();
    userLoggedOut();
    signOut(auth).then(() => {
        // Sign-out successful.
        
    }
    ).catch((error) => {
        // An error happened.
        console.log(error);
    });
        
}
