import React, { type ReactElement, ReactNode } from 'react';

interface TableProps {
  tableHeader: string[];
  children: ReactNode;
}

const Table = ({ tableHeader, children }: TableProps): ReactElement => {
  return (
    <div className="responsive-table">
      <table className="cocos__table">
        <thead>
          <tr>
            {tableHeader.map(item => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        {children}
      </table>
    </div>
  );
};

export default Table;
