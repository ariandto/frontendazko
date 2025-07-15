import React from 'react';
interface Props {
  item: any;
  delay: number;
}
const ResultCard: React.FC<Props> = ({ item, delay }) => {
  return (
    <div className="result-card" style={{ animationDelay: `${delay}s` }}>
      <div className="card-header">
        <div className="order-icon">
          <i className="fas fa-box"></i>
        </div>
        <div className="order-number">{item.noOrder}</div>
      </div>
      <div className="card-grid">
        {['kodeStore', 'storeName', 'name', 'noLC', 'delivery', 'viaHub'].map((field) => (
          <div className="info-group" key={field}>
            <div className="info-label">{field}</div>
            <div className="info-value">{item[field]}</div>
          </div>
        ))}
        {[
          { name: 'nameContact1', contact: 'contact1', label: 'Driver' },
          { name: 'nameContact2', contact: 'contact2', label: 'Ast. Driver' },
          { name: 'namePicHub1', contact: 'picHub1', label: 'PIC Hub 1' },
          { name: 'namePicHub2', contact: 'picHub2', label: 'PIC Hub 2' },
        ].map((info, idx) => (
          item[info.name] !== '#N/A' && (
            <div className="info-group" key={idx}>
              <div className="info-label">{info.label}</div>
              <div className="info-value">
                {item[info.name]}
                {item[info.contact] !== '#N/A' && (
                  <a href={item[info.contact]} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', marginLeft: 8 }}>
                    <i className="fab fa-whatsapp" style={{ fontSize: '1rem' }}></i>
                  </a>
                )}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};
export default ResultCard;
