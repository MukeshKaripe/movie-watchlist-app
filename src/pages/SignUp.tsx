import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/img/new-pwd-bg.png';
import { Box, InputBaseProps, InputLabelProps, TextField, Typography } from '@mui/material';
import { bgColors } from '../utils/colorTheme';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [credentials, setCredentials] = useState({ email: '' });
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [combineSignin, setCombinedsignin] = useState([...defaultSignin]);
    const [EmailError, setEmailError] = useState(credentials.email);
    const navigate = useNavigate();
    const classes = useStyles();

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
    const handleSignup = () => {
        const isEmailValid = validateEmail(credentials.email);
        if (isEmailValid) {
            toast.success('Account Created');
            navigate('/login');
        }
    };
    useEffect(() => {
    // Retrieve existing users from localStorage
    const storedUsersString = localStorage.getItem('loginData');
    const storedUsers = storedUsersString ? JSON.parse(storedUsersString) : []; // Handle 'null'

    // Append the new user data to the existing users
    const updatedUsers = [...storedUsers, { ...credentials, id: Date.now().toString() }];

    // Update the state and store the new user data in localStorage
    setCombinedsignin(updatedUsers);
    localStorage.setItem('loginData', JSON.stringify(updatedUsers));
   
    }, [credentials]);
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
            <div className={classes.container}>
                <div className={classes.form}>
                    <h4>SignUp</h4>
                    <TextField sx={{ mb: 3 }}
                        label="Email"
                        type="text"
                        placeholder="Email"
                        className={classes.input}
                        value={credentials.email}
                        InputProps={inputProps}
                        InputLabelProps={labelProps}
                        error={!!EmailError}
                        helperText={EmailError}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    />
                    <button className={classes.button} onClick={handleSignup}>
                        Signup
                    </button>

                    <Typography className={classes.linkText}>
                        Have an account? <a href="/login" >LogIn</a>
                    </Typography>
                </div>
                <ToastContainer position="top-right"
                    autoClose={3000}
                />
            </div>
        </Box>
    );
};

export default SignUp;
