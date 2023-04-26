import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Outlet,
} from "react-router-dom";
import Welcome from "./components/Welcome";
import useAuth from "./hooks/useAuth";
import PersistLogin from "./components/PersistLogin";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Homepage from "./containers/Homepage";
import Logout from "./components/Logout";

// Define protected route wrapping routes by authentication and role based authorization

const ProtectedRoute = ({ isAllowed, redirectPath = "/welcome", children }) => {
	if (!isAllowed) {
		return <Navigate to={redirectPath} replace />;
	}
	return children ? children : <Outlet />;
};

function AppRouter() {
	const { authState } = useAuth();

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Welcome />} />
				<Route path="welcome" element={<Welcome />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="logout" element={<Logout />} />

				<Route element={<PersistLogin />}>
					<Route element={<Layout />}>
						<Route element={<ProtectedRoute isAllowed={!!authState.userId} />}>
							<Route path="home" element={<Homepage />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;
