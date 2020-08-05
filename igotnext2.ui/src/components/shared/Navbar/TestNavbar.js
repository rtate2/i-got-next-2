// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from 'reactstrap';

// class TestNavbar extends React.Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false,
//       navCollapsed: true,
//       showNavbar: false,
//     };
//   }

//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen,
//     });
//   }

//   render() {
//     const { navCollapsed } = this.state;
//     return (
//         <div>
//             <Navbar color="light" light expand="md">
//                 <NavbarBrand href="/">reactstrap</NavbarBrand>
//                 <NavbarToggler onClick={this.toggle} />
//                 <Collapse isOpen={this.state.isOpen} navbar>
//                     <Nav className="ml-auto" navbar>
//                         <NavItem>
//                             <NavLink href="/components/">Components</NavLink>
//                         </NavItem>
//                         <NavItem>
//                             <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
//                         </NavItem>
//                         <UncontrolledDropdown nav inNavbar>
//                             <DropdownToggle nav caret>
//                                 Options
//             </DropdownToggle>
//                             <DropdownMenu right>
//                                 <DropdownItem>
//                                     Option 1
//               </DropdownItem>
//                                 <DropdownItem>
//                                     Option 2
//               </DropdownItem>
//                                 <DropdownItem divider />
//                                 <DropdownItem>
//                                     Reset
//               </DropdownItem>
//                             </DropdownMenu>
//                         </UncontrolledDropdown>
//                     </Nav>
//                 </Collapse>
//             </Navbar>
//         </div>
//     );
//   }
// }

// export default TestNavbar;

import React, { useState } from 'react';
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
} from 'reactstrap';

const TestNavbar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">I Got Next 2.0</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/teams">Teams</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/currentgame">Current Game</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/availableplayers">Available Players</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TestNavbar;
