import React from 'react';
import { useHistory } from 'react-router-dom';
import './SidebarOption.scss';

const SidebarOption = ({ id, title }) => {
  const history = useHistory();
  return (
    <div className={`sidebarOption`} onClick={() => history.push(`/playlist/${id}`)}>
      <p>{title}</p>
    </div>
  );
};

export default SidebarOption;
