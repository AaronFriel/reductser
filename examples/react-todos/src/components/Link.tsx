import * as React from 'react';

export interface LinkProps {
  active: boolean;
  onClick: (event: React.MouseEvent<any>) => void;
}

const Link: React.SFC<LinkProps> = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    disabled={active}
    style={{
      marginLeft: '4px'
    }}
  >
    {children}
  </button>
);

export default Link;
