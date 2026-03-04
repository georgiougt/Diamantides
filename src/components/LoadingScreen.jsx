import companyLogo from '../assets/company-logo.png';
import '../styles/LoadingScreen.css';

const LoadingScreen = ({ isVisible, onFinished }) => {
    return (
        <div className={`loading-screen ${!isVisible ? 'loading-screen--hidden' : ''}`}
            onTransitionEnd={() => { if (!isVisible) onFinished?.(); }}
        >
            <div className="loading-screen__content">
                <img
                    src={companyLogo}
                    alt="Diamantides Yachting"
                    className="loading-screen__logo"
                />
                <div className="loading-screen__bar-track">
                    <div className="loading-screen__bar-fill"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
