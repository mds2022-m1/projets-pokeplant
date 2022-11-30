import { getAuth, signOut } from "firebase/auth";
import { useAppDispatch } from "../app/hooks";
import { userLoggedOut } from "../features/user-slice";
export function LogOut() {
    console.log("LogOut");
    
}
