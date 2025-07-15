import React from 'react';
interface Props {
  message: string;
  type: 'success' | 'error' | 'warning';
}
const Notification: React.FC<Props> = ({ message, type }) => (
  <div
    style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 25px',
      background:
        type === 'success'
          ? 'rgba(76, 175, 80, 0.9)'
          : type === 'error'
          ? 'rgba(244, 67, 54, 0.9)'
          : 'rgba(255, 193, 7, 0.9)',
      color: 'white',
      borderRadius: '10px',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      fontWeight: 500,
      animation: 'slideIn 0.3s ease-out',
    }}
  >
    {message}
  </div>
);
export default Notification;