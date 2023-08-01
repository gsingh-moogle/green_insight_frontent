import { useAuth } from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({
    children,
    roles,
}) => {
    const dataCheck = useAuth();
    const userHasRequiredRole = roles.includes(dataCheck?.userdata?.role) ? true : false;
    if (!userHasRequiredRole) {
        return dataCheck?.userdata?.role === 1 ? <Navigate to="/regional-level" /> : <Navigate to="/sustainable" />
    }

    return children;
};

export default PrivateRoute