// components/Navbar/index.js
 
import React from "react";
import logo from '../../assets/LR6.png'
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
 
const Nav = styled.nav`
    background: #000000;
    height: 50px;
    display: flex;
    justify-content: left;
    padding: 20px;
    z-index: 12;
    /* Third Nav */
    /* justify-content: flex-start; */
`;
 
const NavLink = styled(Link)`
    color: #67544E;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #FFD6C9;
        text-shadow: #FFD6C9 2px 0 10px;
    }
`;
 
const Bars = styled(FaBars)`
    display: none;
    color: #FFFFFF;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;
 
const NavMenu = styled.div`
    display: flex;
    align-items: left;
    margin-right: -24px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Third Nav */
    /* width: 100vw;
  white-space: nowrap; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <div
                    style={{
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 1rem",
                        height: "100%"
                    }}
                >
                    <img src={logo} alt="loading..." style={{
                    alignItems: "center",marginLeft: "auto",
                    marginRight: "auto", width: "75px", height: "75px"}}/>
                </div>
                <Bars />
 
                <NavMenu>
                    <NavLink to="/" >
                        HOME
                    </NavLink>
                    <NavLink to="/socials" activeStyle>
                        SOCIALS
                    </NavLink>
                    <NavLink to="/events" activeStyle>
                        EVENTS
                    </NavLink>
                    <NavLink to="/drinks" activeStyle>
                        DRINKS
                    </NavLink>
                    <NavLink to="/food" activeStyle>
                        FOOD
                    </NavLink>
                    <NavLink to="/draw" activeStyle>
                        DRAW
                    </NavLink>
                    <NavLink to="/disco" activeStyle>
                        DISCO
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;