import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebaseConfig";
import { getDeviceToken } from "../../config/getDeviceToken";
import LoginLoading from "../../components/Shared/LoginLoading/LoginLoading";
import LoginForm from "./LoginForm/LoginForm";
import ToastNotification, {
  showToast,
} from "../../components/Shared/ToastNotification/ToastNotification";
import "./AboutApp.css";

const firebaseApp = initializeApp(firebaseConfig); // Initialize Firebase
const auth = getAuth(firebaseApp);

const PAGES_DATA = [
  {
    title: (
      <>
        Your Commute
        <br />
        Your Way
        <br />
        Your Schedule
      </>
    ),
    description:
      "Schedule your arrival and experience an instant attendance and ticketing with a quick QR code scan.",
  },
  {
    title: (
      <>
        Navigate Your
        <br />
        Journey Every
        <br />
        Step of the Way
      </>
    ),
    description:
      "Track your bus live, stay informed, and arrive on time, every time.",
  },
  {
    title: (
      <>
        Stay on Track
        <br />
        with Effortless
        <br />
        Payments
      </>
    ),
    description:
      "Simplify payments and stay on top of due dates with personalized notifications.",
  },
];

const SplashScreen = React.memo(({ loading }) => (
  <div className={`splash-screen ${loading ? "" : "slide-up"}`}>
    <img
      src="./uploads/splash-image.png"
      alt="Loading..."
      className="splash-image"
      loading="lazy"
    />
    <div className="splash-text">
      <p>Travent</p>
    </div>
  </div>
));

const PageContent = React.memo(({ currentPage, onNextPage }) => (
  <div className="page-container">
    <div className="page-header">
      <img
        src="./uploads/splash-image.png"
        alt="Travent Logo"
        className="logo"
        loading="lazy"
      />
      <div className="splash-text">
        <p>Travent</p>
      </div>
    </div>
    <div className="page-content">
      <img
        src="./uploads/bus.png"
        alt="Bus Icon"
        className="bus-icon"
        loading="lazy"
      />
      <h1>{PAGES_DATA[currentPage - 1].title}</h1>
      <p>{PAGES_DATA[currentPage - 1].description}</p>
      <div className="button-container">
        <button className="about-next-button" onClick={onNextPage}>
          {currentPage === 3 ? "Get Started" : "Next"}
        </button>
        <div className="page-progress">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`progress-dot ${currentPage >= dot ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
));

const AboutApp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const roleRoutes = useMemo(
    () => ({
      appadmin: "/app-admin",
      admin: "/admin",
    }),
    []
  );

  // Google SignIn handler
  const handleGoogleSignIn = useCallback(async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      console.log("Firebase token:", token);

      // Send the Firebase token to backend for validation
      const { data } = await axios.post(
        "https://travent-admin-server-suryaprabajicates-projects.vercel.app/api/auth/google-sign-in",
        { tokenId: token }
      );

      console.log("Response data:", data);

      // Store tokens and navigate
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem(
        "institutionId",
        data.institutionDetails.institutionId
      );
      localStorage.setItem(
        "institutionName",
        data.institutionDetails.institutionName
      );

      await getDeviceToken();

      const { role, uniqueRoute } = data;
      if (role === "admin") {
        navigate(`/admin/${uniqueRoute}`);
      } else if (role === "appadmin") {
        navigate("/app-admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Google Sign-In Error: ", error.message);

      // Error check using `error.response`
      if (error.response) {
        if (error.response.status === 404) {
          showToast(
            "error",
            error.response.data.message ||
              "User not found. Please register first."
          );
        } else {
          showToast(
            "error",
            "There was an issue during Google Sign-In. Please try again."
          );
        }
      } else {
        // Handle cases where `response` does not exist, e.g., network errors
        showToast("error", "Network error. Please try again later.");
      }
    }
  }, [navigate]);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setIsAuthenticating(true);

      // Validate email and password
      if (!email || !password) {
        showToast("error", "Please enter both email and password");
        setIsAuthenticating(false);
        return;
      }

      try {
        const { data } = await axios.post(
          "https://travent-admin-server-suryaprabajicates-projects.vercel.app/api/auth/login",
          { email, password }
        );

        const {
          accessToken,
          refreshToken,
          role,
          uniqueRoute,
          institutionDetails,
        } = data;

        // Store the access token and refresh token in local storage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Store institutionId only for admin role
        if (role === "admin" && institutionDetails?.institutionId) {
          localStorage.setItem(
            "institutionId",
            institutionDetails.institutionId
          );
          localStorage.setItem(
            "institutionName",
            institutionDetails.institutionName
          );
        }

        await getDeviceToken();

        if (role === "admin") {
          navigate(`/admin/${uniqueRoute}`); // Redirect to unique admin route
        } else if (role === "appadmin") {
          navigate("/app-admin");
        }
      } catch (error) {
        showToast(
          "error",
          error.response?.data?.message || "An error occurred"
        );
      } finally {
        setIsAuthenticating(false);
      }
    },
    [email, password, navigate]
  );

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev < 3 ? prev + 1 : 4));
  }, []);

  if (showSplash) {
    return <SplashScreen loading={loading} />;
  }

  return (
    <div className="app-container">
      <ToastNotification />
      {isAuthenticating && <LoginLoading />}
      {currentPage === 4 ? (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleLogin={handleLogin}
          handleGoogleSignIn={handleGoogleSignIn}
        />
      ) : (
        <PageContent currentPage={currentPage} onNextPage={nextPage} />
      )}
    </div>
  );
};

export default React.memo(AboutApp);
