import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { bgColors } from '../utils/colorTheme';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, IconButton, InputAdornment, InputBaseProps, InputLabelProps, TextField, Typography } from '@mui/material';
import backgroundImage from '../assets/img/new-pwd-bg.png';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Tooltip } from '@mui/material';

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
        '@media (max-width: 768px)': {
            padding: '5%',
            margin: '8% auto !important',
            maxWidth: '300px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    },
    inputField: {
        width: "100%",
        borderRadius: "8px",
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
});

const LogIn = ({ setIsAuthenticated }: any) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const focused = false
    const hovered = false
    const [EmailError, setEmailError] = useState(credentials.email);
    const [PasswordError, setPasswordError] = useState(credentials.password);
    const [showPassword, SetshowPassword] = useState(false);

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
    const validatePassword = (password: string) => {
        const passwordPattern =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            ;
        if (password === "") {
            setPasswordError("Password Cannot Be Empty");
            return false;
        }
        else if (!passwordPattern.test(password)) {
            setPasswordError("Please Enter a Valid Password");
            return false;
        }
        setPasswordError("");
        return true;
    };
    const handleLogin = () => {
        const isEmailValid = validateEmail(credentials.email);
        const isPasswordValid = validatePassword(credentials.password);
        if (isEmailValid && isPasswordValid) {
            let isValidUser = false;
            try {
                for (let index = 0; index < handleDataLogin.length; index++) {
                    const element = handleDataLogin[index];
                    if (credentials.email === element.email) {
                        setIsAuthenticated(true);
                        localStorage.setItem('isAuthenticated', 'true');
                        localStorage.setItem('loggedInUser', JSON.stringify(element));
                        isValidUser = true;
                        setTimeout(() => {
                            toast.success('Login successful!');
                            setTimeout(() => {
                                navigate('/');
                            }, 1000);
                        }, 0);
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
            toast.error('Invalid email or password please check your credentials!');
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
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
            toast.error('Oops! Please login again');
            // Clear localStorage (auto logout)
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('loggedInUser');
        }
    }, []);
    return (
        <Box className={classes.containerMainWrapper} >
            <Box className={classes.container} sx={{ width: { xs: '300px', md: '500px' }, margin: 'auto', textAlign: 'center' }}>
                <div style={{ width: '300px', margin: 'auto', textAlign: 'center' }}>
                    <h4 style={{ marginTop: '0px' }}>LogIn</h4>
                    <Box sx={{ mb: 3 }} >
                        <TextField
                            label="Email"
                            type="text"
                            placeholder="Email"
                            className={classes.inputField}
                            value={credentials.email}
                            autoComplete="username"
                            InputProps={{
                                ...inputProps,
                                sx: {
                                    borderRadius: '8px',
                                },
                            }}
                            InputLabelProps={labelProps}
                            error={!!EmailError}
                            helperText={EmailError}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        />
                    </Box>
                    <Box sx={{ mb: 3 }} >
                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={credentials.password}
                            className={classes.inputField}
                            error={!!PasswordError}
                            autoComplete="current-password"
                            helperText={PasswordError}
                            onChange={(e) =>
                                setCredentials({ ...credentials, password: e.target.value })
                            }
                            InputProps={{
                                ...inputProps,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => SetshowPassword(!showPassword)} edge="end">
                                            <Tooltip
                                                title={showPassword ? 'Hide Password' : 'Show Password'}
                                                placement="top"
                                                arrow
                                                enterDelay={300}
                                                leaveDelay={150}
                                                sx={{
                                                    '& .MuiTooltip-tooltip': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.87)',
                                                        padding: '6px 10px',
                                                        fontSize: '13px'
                                                    }
                                                }}
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </Tooltip>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <button className={classes.button} onClick={handleLogin}>
                        Log In
                    </button>
                    <Typography style={{ marginTop: '16px' }}>
                        Don't have an account? <a href="/#/signup">Sign Up</a>
                    </Typography>
                </div>
            </Box>
            <ToastContainer position="top-center" autoClose={3000} />
        </Box>
    );
};

export default LogIn;
