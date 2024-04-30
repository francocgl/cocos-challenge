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
            {tableHeader.map((item, index) => (
              <th
                key={item}
                className={index === 0 ? 'cocos__table__number' : ''}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        {children}
      </table>
    </div>
  );
};

export default Table;
