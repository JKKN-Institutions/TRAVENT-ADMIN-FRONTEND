import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./AboutApp.css";
import LoginLoading from "../../components/Shared/LoginLoading/LoginLoading";
import LoginForm from "./LoginForm/LoginForm";

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

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setIsAuthenticating(true);

      try {
        const { data } = await axios.post(
          "https://travent-admin-server.vercel.app/api/auth/login",
          { email, password }
        );

        const { token, institutionDetails } = data;
        const decodedToken = jwtDecode(token);
        localStorage.setItem("authToken", token);

        const route = roleRoutes[decodedToken.role];
        if (route) {
          navigate(route, { state: { institutionDetails } });
        }
      } catch (error) {
        alert(error.response?.data?.message || "An error occurred");
      } finally {
        setIsAuthenticating(false);
      }
    },
    [email, password, navigate, roleRoutes]
  );

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev < 3 ? prev + 1 : 4));
  }, []);

  if (showSplash) {
    return <SplashScreen loading={loading} />;
  }

  return (
    <div className="app-container">
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
        />
      ) : (
        <PageContent currentPage={currentPage} onNextPage={nextPage} />
      )}
    </div>
  );
};

export default React.memo(AboutApp);
