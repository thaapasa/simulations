import React from 'react';
import './App.css';

const BYLicense: React.FC = () => (
  <a
    href="http://creativecommons.org/licenses/by/3.0/"
    title="Creative Commons BY 3.0"
    target="_blank"
  >
    CC 3.0 BY
  </a>
);

const CreditsView: React.FC = () => (
  <div>
    Logo icon (nine squares) made by{' '}
    <a href="https://www.freepik.com/" title="Freepik">
      Freepik
    </a>{' '}
    from{' '}
    <a href="https://www.flaticon.com/" title="Flaticon">
      www.flaticon.com
    </a>{' '}
    is licensed by <BYLicense />
  </div>
);

export default CreditsView;
