import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function IconUser({ size = 'lg', styles = { color: '#6E7582' } }) {
  return (
    <div>
      <FontAwesomeIcon icon={faUser} style={styles} size={size} />
    </div>
  );
}

export default IconUser;
