import React, { Dispatch, SetStateAction } from 'react';
import { COMPONENT_STATE, ComponentStateTypes } from '../../const/config';
import SearchInput from './SearchInput';

interface NavbarProps {
  componentState: ComponentStateTypes;
  setComponentState: Dispatch<SetStateAction<ComponentStateTypes>>;
}

const Navbar = ({ componentState, setComponentState }: NavbarProps) => {
  const handleClick = (component: ComponentStateTypes) => {
    setComponentState(component);
  };

  const navBarLinks = [
    {
      id: 1,
      name: 'Instrumentos',
      component: COMPONENT_STATE.INSTRUMENTS,
    },
    {
      id: 2,
      name: 'Portfolio',
      component: COMPONENT_STATE.PORTFOLIO,
    },
  ];

  return (
    <nav className="cocos__navbar">
      <ul className="cocos__navbar-buttons">
        {navBarLinks.map(({ id, name, component }) => (
          <li className="cocos__navbar-buttons__list-item" key={id}>
            <button
              className={`${componentState === component ? 'cocos__navbar-buttons__list-item__active-button' : ''} cocos__navbar-buttons__list-item__button`}
              onClick={() => handleClick(component)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
      <SearchInput />
    </nav>
  );
};
export default Navbar;
