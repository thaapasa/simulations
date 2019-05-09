import React from 'react';
import './App.css';

const FlatIconCredit = ({
  title,
  creator,
  creatorUrl,
}: {
  title: string;
  creator: string;
  creatorUrl: string;
}) => (
  <div>
    {title} made by{' '}
    <a href={creatorUrl} title={creator}>
      {creator}
    </a>{' '}
    from{' '}
    <a href="https://www.flaticon.com/" title="Flaticon">
      www.flaticon.com
    </a>{' '}
    is licensed by{' '}
    <a
      href="http://creativecommons.org/licenses/by/3.0/"
      title="Creative Commons BY 3.0"
      target="_blank"
    >
      CC 3.0 BY
    </a>
  </div>
);

const CreditsView: React.FC = () => (
  <>
    <FlatIconCredit
      title="Logo icon (nine squares)"
      creator="Freepik"
      creatorUrl="https://www.freepik.com/"
    />
    <FlatIconCredit
      title="App icons (play, pause, fast forward, skip)"
      creator="Smashicons"
      creatorUrl="https://www.flaticon.com/authors/smashicons"
    />
  </>
);

export default CreditsView;
