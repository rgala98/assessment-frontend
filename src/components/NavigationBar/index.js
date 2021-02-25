import React, { useState } from "react";

import styles from "./index.module.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar
        color="primary"
        dark
        expand="md"
        variant="tabs"
        className={styles.navBar}
      >
        <NavbarBrand href="/prime" className={styles.navBrand}><h1>RAHUL GALA</h1></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className={styles.navItem}>
              <NavLink href="/prime" className={styles.navLink}>
                Prime Number
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/student" className={styles.navLink}>
                Student Database
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/sudoku" className={styles.navLink}>
                Sudoku Game
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
