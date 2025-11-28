
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ student, onLogout }) {
  const [nextLecture, setNextLecture] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const findNextLecture = () => {
      const now = new Date();
      const upcomingLectures = student.lectures
        .map(lec => ({ ...lec, time: new Date(lec.time) }))
        .filter(lec => lec.time > now)
        .sort((a, b) => a.time - b.time);
      
      return upcomingLectures.length > 0 ? upcomingLectures[0] : null;
    };

    const lecture = findNextLecture();
    setNextLecture(lecture);

    if (lecture) {
      const calculateTimeRemaining = () => {
        const now = new Date();
        const difference = lecture.time - now;

        if (difference > 0) {
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
          setTimeRemaining({ hours, minutes, seconds });
        } else {
          setTimeRemaining(null);
          // Optional: re-calculate for the next lecture after one has passed
          setNextLecture(findNextLecture());
        }
      };

      calculateTimeRemaining();
      const interval = setInterval(calculateTimeRemaining, 1000);
      return () => clearInterval(interval);
    }
  }, [student.lectures]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>مرحباً، {student.name}</h1>
        <button onClick={onLogout} className="logout-button">تسجيل الخروج</button>
      </div>

      <div className="dashboard-content">
        {nextLecture ? (
          <div className="lecture-card">
            <h2>محاضرتك القادمة</h2>
            <p className="course-name">{nextLecture.course}</p>
            <p><strong>الوقت:</strong> {nextLecture.time.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</p>
            <p><strong>القاعة:</strong> {nextLecture.room}</p>
            {timeRemaining && (
              <div className="countdown-timer">
                <h3>الوقت المتبقي:</h3>
                <div className="timer">
                  <span>{String(timeRemaining.hours).padStart(2, '0')}</span>:
                  <span>{String(timeRemaining.minutes).padStart(2, '0')}</span>:
                  <span>{String(timeRemaining.seconds).padStart(2, '0')}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="lecture-card">
            <h2>لا يوجد محاضرات قادمة اليوم</h2>
            <p>استمتع بيومك!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
