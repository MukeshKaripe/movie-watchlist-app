import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/img/new-pwd-bg.png';
import { Box, IconButton, InputAdornment, InputBaseProps, InputLabelProps, TextField, Typography } from '@mui/material';
import { bgColors } from '../utils/colorTheme';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Tooltip } from '@mui/material';

const defaultSignin = [{
    id: '1',
    email: 'mukesh@gmail.com',
},
];

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
        padding: "3%",
        margin: "4% auto",
        width: "80%",
        backgroundColor: "#ffffff",
        maxWidth: "500px",
        textAlign: "center",
        '@media (max-width: 768px)': {
            padding: '5%',
            margin: '8% auto',
        },
    },
    form: {
        maxWidth: '300px',
        margin: 'auto',
        textAlign: 'center',
        width: '100%',
    },
    input: {
        width: "100%",
        borderRadius: "4px",
    },
    errorText: {
        color: "red",
        fontSize: "14px",
        marginBottom: "8px",
        textAlign: "left",
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
        padding: '16.5px 14px',
        marginBottom: '16px'
    },
    linkText: {
        fontSize: "14px",
        marginTop: "16px",
    },

});

const SignUp = () => {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [combineSignin, setCombinedsignin] = useState([...defaultSignin]);
    const [EmailError, setEmailError] = useState(credentials.email);
    const [PasswordError, setPasswordError] = useState(credentials.password);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showPassword, SetshowPassword] = useState(false);
    const [showConfirmPassword, SetshowConfirmPassword] = useState(false);
    const [nameError, setNameError] = useState('');

    const navigate = useNavigate();
    const classes = useStyles();
    const validateName = (name: string) => {
        const trimmedName = name.trim();

        // Allow only letters and spaces (you can include hyphens/apostrophes if needed)
        const namePattern = /^[a-zA-Z\s]+$/;

        if (!trimmedName) {
            setNameError('Name is required');
            toast.error('Name is required');
            return false;
        } else if (trimmedName.length < 2) {
            setNameError('Name must be at least 2 characters');
            toast.error('Name must be at least 2 characters');
            return false;
        } else if (!namePattern.test(trimmedName)) {
            setNameError('Name should not contain special characters or numbers');
            toast.error('Name should not contain special characters or numbers');
            return false;
        }

        setNameError('');
        return true;
    };

    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            setEmailError("Email Cannot Be Empty");
            return false;
        } else if (!emailPattern.test(email.toLowerCase())) {
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
            setPasswordError("Please Enter a Valid Password minimum 8 characters with combination of letters in upper and lowercase digits and special character");
            return false;
        }
        setPasswordError("");
        return true;
    };
    const handleSignup = () => {
        const isNameValid = validateName(credentials.name);
        const isEmailValid = validateEmail(credentials.email);
        const isPasswordValid = validatePassword(credentials.password);
        const isConfirmPasswordValid = validateConfirmPassword(credentials.confirmPassword);
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            setTimeout(() => {
                toast.success('Account Created');
            }, 0);
            navigate('/login');
        }
        else {
            toast.error('Invalid email or password please check your credentials!');
        }
    };
    const validateConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword === "") {
            setConfirmPasswordError("Confirm Password Cannot Be Empty");
            return false;
        } else if (confirmPassword !== credentials.password) {
            setConfirmPasswordError("Passwords do not match");
            return false;
        }
        setConfirmPasswordError("");
        return true;
    };

    useEffect(() => {
        if (combineSignin) {
            setCombinedsignin([...defaultSignin]);
        }
        // Retrieve existing users from localStorage
        const storedUsersString = localStorage.getItem('loginData');
        const storedUsers = storedUsersString ? JSON.parse(storedUsersString) : [];
        // Append the new user data to the existing users
        const updatedUsers = [...storedUsers, { ...credentials, id: Date.now().toString() }];
        setCombinedsignin(updatedUsers);
        localStorage.setItem('loginData', JSON.stringify(updatedUsers));
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
            // Clear localStorage (auto logout)
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('loggedInUser');
            toast.error('Oops! Please login again');
        }
    }, [credentials, combineSignin]);

    const inputProps: InputBaseProps = {
        style: {
            borderRadius: "8px",
            fontSize: "14px",
            backgroundColor: bgColors.gray4
        },
    };
    const labelProps: InputLabelProps = {
        style: { fontSize: 14 },
    };
    return (
        <Box className={classes.containerMainWrapper} >
            <div className={classes.container}>
                <div className={classes.form}>
                    <h4 style={{ marginTop: '0px' }}>SignUp</h4>
                    <TextField
                        sx={{ mb: 3 }}
                        label="Name"
                        type="text"
                        placeholder="Enter your name"
                        className={classes.input}
                        value={credentials.name}
                        InputProps={{
                            ...inputProps,
                            sx: {
                                height: '56px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                backgroundColor: '#fff',
                            },
                        }}
                        InputLabelProps={labelProps}
                        error={!!nameError}
                        helperText={nameError}
                        onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                    />

                    <TextField sx={{ mb: 3 }}
                        label="Email"
                        type="text"
                        placeholder="Email"
                        className={classes.input}
                        value={credentials.email}
                        InputProps={{
                            ...inputProps,
                        }}
                        InputLabelProps={labelProps}
                        error={!!EmailError}
                        helperText={EmailError}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    />
                    <Box sx={{ mb: 3 }} >
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className={classes.input}
                            value={credentials.password}
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
                            InputLabelProps={labelProps}
                            error={!!PasswordError}
                            helperText={PasswordError}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                    </Box>
                    <Box sx={{ mb: 3 }} >
                        <TextField
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            className={classes.input}
                            value={credentials.confirmPassword}
                            InputProps={{
                                ...inputProps,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => SetshowConfirmPassword(!showConfirmPassword)} edge="end">
                                            <Tooltip
                                                title={showConfirmPassword ? 'Hide Confirm Password' : 'Show Confirm Password'}
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
                                                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </Tooltip>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            InputLabelProps={labelProps}
                            error={!!confirmPasswordError}
                            helperText={confirmPasswordError}
                            onChange={(e) =>
                                setCredentials({ ...credentials, confirmPassword: e.target.value })
                            }
                        />
                    </Box>

                    <button className={classes.button} onClick={handleSignup}>
                        Sign Up
                    </button>
                    <Typography className={classes.linkText}>
                        Already have an account? <a href="/#/login" >Log In</a>
                    </Typography>
                </div>
            </div>
            <ToastContainer position="top-center"
                autoClose={3000}
            />
        </Box>
    );
};

export default SignUp;
