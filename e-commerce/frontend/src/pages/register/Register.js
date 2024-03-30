import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({ firstname: '', lastname: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5239/api/User', user);
            console.log('Registration successful:', response.data);
            // Chuyển hướng đến trang chủ sau khi đăng ký thành công
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.response.data);
            setError('Đăng ký không thành công. Hãy thử lại.');
        }
    };




    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Đăng Ký</h2>
                            <form>
                                <div className="form-group">
                                    <label>First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.firstname}
                                        onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.lastname}
                                        onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    />
                                </div>
                                {error && <p className="text-danger">{error}</p>}
                                <button type="button" className="btn btn-primary btn-block" onClick={handleRegister}>
                                    Đăng Ký
                                </button>
                            </form>                              
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;