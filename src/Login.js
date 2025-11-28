
import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [universityId, setUniversityId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!onLogin(universityId, password)) {
      setError('الرقم الجامعي أو كلمة المرور غير صحيحة.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>تسجيل الدخول</h2>
        <p>الرجاء إدخال الرقم الجامعي وكلمة المرور</p>
        <div className="input-group">
          <label htmlFor="universityId">الرقم الجامعي</label>
          <input
            type="text"
            id="universityId"
            value={universityId}
            onChange={(e) => setUniversityId(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">كلمة المرور</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">دخول</button>
      </form>
    </div>
  );
}

export default Login;
