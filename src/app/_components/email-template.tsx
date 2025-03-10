import * as React from 'react';
import { CSSProperties } from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  phoneNumber,
  message,
}) => {
  const tableContainerStyle: CSSProperties = {
    padding: '20px',
  };

  const tableStyle: CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thTdStyle: CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const thStyle: CSSProperties = {
    ...thTdStyle,
    width: '30%',
    backgroundColor: '#f4f4f4',
  };
  return (
    <div style={tableContainerStyle}>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={thStyle}>Name</th>
            <td style={thTdStyle}>{name}</td>
          </tr>
          <tr>
            <th style={thStyle}>Email</th>
            <td style={thTdStyle}>{email}</td>
          </tr>
          <tr>
            <th style={thStyle}>Phone Number</th>
            <td style={thTdStyle}>{phoneNumber}</td>
          </tr>
          <tr>
            <th style={thStyle}>Message</th>
            <td style={thTdStyle}>{message}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
