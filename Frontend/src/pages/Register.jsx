import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [form, setForm] = useState({ email: '', firstname: '', lastname: '', password: '' });
    const [submitting, setSubmitting] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const navigate = useNavigate();

    const backend = "https://chatgpt-project-rqr8.onrender.com/api/auth";

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    }

    // ⭐ Send OTP
    async function sendOtp() {
        if (!form.email) return alert("Enter Gmail first");

        try {
            const res = await axios.post(`${backend}/send-otp`, { email: form.email });
            alert(res.data.message);
            setOtpSent(true);
        } catch (err) {
            alert("Failed to send OTP");
        }
    }

    // ⭐ Register with OTP
    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await axios.post(`${backend}/register`, {
                email: form.email,
                fullName: {
                    firstName: form.firstname,
                    lastName: form.lastname
                },
                password: form.password,
                otp: otp
            }, {
                withCredentials: true
            });

            console.log(res);
            navigate("/");

        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || "Registration failed");
        }

        setSubmitting(false);
    }

    return (
        <div className="center-min-h-screen">
            <div className="auth-card" role="main" aria-labelledby="register-heading">
                <header className="auth-header">
                    <h1 id="register-heading">Create account</h1>
                    <p className="auth-sub">Join us and start exploring.</p>
                </header>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>

                    {/* EMAIL + SEND OTP */}
                    <div className="field-group">
                        <label htmlFor="email">Email</label>

                        <div style={{ display: "flex", gap: "10px" }}>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                            <button type="button" className="primary-btn" onClick={sendOtp}>
                                Send OTP
                            </button>
                        </div>
                    </div>

                    {/* OTP INPUT (after sent) */}
                    {otpSent && (
                        <div className="field-group">
                            <label>Enter OTP</label>
                            <input
                                type="text"
                                placeholder="6 digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="grid-2">
                        <div className="field-group">
                            <label htmlFor="firstname">First name</label>
                            <input id="firstname" name="firstname" placeholder="Jane"
                                value={form.firstname} onChange={handleChange} required />
                        </div>

                        <div className="field-group">
                            <label htmlFor="lastname">Last name</label>
                            <input id="lastname" name="lastname" placeholder="Doe"
                                value={form.lastname} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="field-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password"
                            placeholder="Create a password" value={form.password}
                            onChange={handleChange} required minLength={6} />
                    </div>

                    <button type="submit" className="primary-btn" disabled={submitting}>
                        {submitting ? 'Creating...' : 'Create Account'}
                    </button>
                </form>

                <p className="auth-alt">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
