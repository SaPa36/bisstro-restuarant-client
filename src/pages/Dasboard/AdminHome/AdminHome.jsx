import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";


const AdminHome = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h2>Welcome, {user?.displayName || 'Back'}!</h2>
        </div>
    );
};

export default AdminHome;