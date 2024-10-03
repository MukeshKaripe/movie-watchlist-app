import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { bgColors } from '../utils/colorTheme';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, InputBaseProps, InputLabelProps, TextField, Typography } from '@mui/material';
import backgroundImage from '../assets/img/new-pwd-bg.png';

const useStyles = makeStyles({
    containerMainWrapper: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center',
        backgroundImage: `url(${backgroundImage})`
    },
    container: {
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "15px",
        paddingBlock: "3%",
        marginBlock: "4%",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
    },
    inputField: {
        width: "100%",
        borderRadius: "4px",
    },
    button: {
        backgroundColor: bgColors.green,
        width: "100%",
        fontSize: "14px",
        fontWeight: "bold",
        borderRadius: "8px",
        cursor: "pointer",
        color: "#fff",
        border: "none",
        padding: '16.5px 14px'
    },
    link: {
        fontSize: "16px",
        color: bgColors.green,
        cursor: "pointer",
    },
    promptText: {
        marginBottom: "4%",
        fontWeight: "bold",
        textAlign: "left",
    },
    blackColor: {
        color: "#303030",
        fontWeight: "600",
        fontSize: "14px",
    },
    boldLabel: {
        fontWeight: "500",
        fontFamily: "inter",
        color: "rgba(100, 110, 123, 0.9)",
    },
});

const LogIn = ({ setIsAuthenticated }: any) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [EmailError, setEmailError] = useState(credentials.email);
    const [error, setError] = useState("");

    const classes = useStyles();
    const navigate = useNavigate();
    const validationLogin = localStorage.getItem('loginData');
    const handleDataLogin = validationLogin ? JSON.parse(validationLogin) : [];
    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            setEmailError("Email Cannot Be Empty");
            return false;
        } else if (!emailPattern.test(email.toLowerCase()) && email !== "") {
            setEmailError("Invalid Email Address");
            return false;
        }
        setEmailError("");
        return true;
    };
    const handleLogin = () => {
        const isEmailValid = validateEmail(credentials.email);
        if (isEmailValid) {
            let isValidUser = false;
            try {
                for (let index = 0; index < handleDataLogin.length; index++) {
                    const element = handleDataLogin[index];
                    if (credentials.email === element.email) {
                        setIsAuthenticated(true);
                        localStorage.setItem('isAuthenticated', 'true');
                        toast.success('Login successful!');
                        navigate('/');
                        isValidUser = true;
                        break;
                    }
                }
                if (!isValidUser) {
                    toast.error('Invalid email!');
                }
            } catch (error) {
                console.error('Error during login:', error);
                toast.error('An error occurred. Please try again.');
            }
        } else {
            toast.error('Invalid email!');
        }
    };

    const inputProps: InputBaseProps = {
        style: {
            borderRadius: "8px",
            fontSize: "14px",
            backgroundColor: focused
                ? bgColors.gray4
                : hovered
                    ? bgColors.gray2
                    : bgColors.white,
        },
    };
    const labelProps: InputLabelProps = {
        style: { fontSize: 14 },
    };
    return (
        <Box className={classes.containerMainWrapper} >
            <div className={classes.container} style={{ width: '500px', margin: 'auto', textAlign: 'center' }}>
                <div style={{ width: '300px', margin: 'auto', textAlign: 'center' }}>
                    <h4>LogIn</h4>
                    <Box sx={{ mb: 3 }} >
                        <TextField
                            label="Email"
                            type="text"
                            placeholder="Email"
                            className={classes.inputField}
                            value={credentials.email}
                            InputProps={inputProps}
                            InputLabelProps={labelProps}
                            error={!!EmailError}
                            helperText={EmailError}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        />
                    </Box>
                    <button className={classes.button} onClick={handleLogin}>
                        LogIn
                    </button>
                    <Typography style={{ marginTop: '16px' }}>
                        Don't Have an account? <a href="/signup">SignUp</a>
                    </Typography>
                </div>
            </div>
        </Box>
    );
};

export default LogIn;
