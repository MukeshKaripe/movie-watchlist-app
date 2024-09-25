import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const defaultSignin = [{
    id: '1',
    email: 'mukesh@gmail.com',
    //   password: 'Aa2000@@'
},
{
    id: '2',
    email: 'anil@gmail.com',
    //   password: 'Aa2000@@'
},
];

const useStyles = makeStyles({
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
        padding: "12px",
        margin: "12px 0",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "16px",
        boxSizing: "border-box",
    },
    errorText: {
        color: "red",
        fontSize: "14px",
        marginBottom: "8px",
        textAlign: "left",
    },
    button: {
        backgroundColor: "#4CAF50",
        color: "#ffffff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        width: "100%",
        marginTop: "16px",
    },
    linkText: {
        fontSize: "14px",
        marginTop: "16px",
    },
    link: {
        color: "#4CAF50",
        textDecoration: "none",
        cursor: "pointer",
    },
});

const SignUp = () => {
    const [credentials, setCredentials] = useState({ email: '' });
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
        const updatedSignin = [...defaultSignin, { ...credentials, id: Date.now().toString() }];
        setCombinedsignin(updatedSignin);  
        localStorage.setItem('loginData', JSON.stringify(updatedSignin));
    }, [credentials]);

    return (
        <div className={classes.container}>
            <div className={classes.form}>
                <h4>SignUp</h4>
                <input
                    type="email"
                    placeholder="Email"
                    className={classes.input}
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />
                {EmailError && <div className={classes.errorText}>{EmailError}</div>}


                <button className={classes.button} onClick={handleSignup}>
                    Signup
                </button>

                <div className={classes.linkText}>
                    Have an account? <a href="/login" className={classes.link}>LogIn</a>
                </div>
            </div>
            <ToastContainer position="top-right"
                autoClose={3000}
            />
        </div>
    );
};

export default SignUp;
