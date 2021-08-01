import React, { useState } from "react";
import { Affix, Menu, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import logo from "../assets/images/logo.png";
import styled from "styled-components";
import { useUser } from "../context/user.context";

const Logo = styled.img`
  width: 350px;
  heigth: 400px;
`;

const LogoHome = styled.img`
  width: 100px;
  heigth: 110px;
`;

const HeaderStyled = styled.header`
  border-bottom: 1px solid #eee;
  margin-bottom: 5px;
`;
const MenuStyled = styled(Menu)`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
const MenuItem = styled(Menu.Item)`
  height: 500px !important;
`;

const MenuItemHome = styled(Menu.Item)`
  height: 150px !important;
`;

const OwnHeader = () => {
  const { logOut, token } = useUser();
  const handleClick = () => {
    return logOut();
  };
  const [top] = useState(0);
  return (
    <Affix offsetTop={top}>
      <HeaderStyled>
        <MenuStyled >
        {token 
            ?
              <MenuItemHome>
                <LogoHome src={logo} alt="logo" title="logo" />
              </MenuItemHome>
            : 
              <MenuItem>
                  <Logo src={logo} alt="logo" title="logo" />
              </MenuItem>
            }

          {token && (
            <MenuItemHome
              key="logout-menu"
              onClick={handleClick}
              icon={<LogoutOutlined />}
            >
              <Button type="primary" to="/login" danger>
                Log Out
              </Button>
            </MenuItemHome>
          )}
        </MenuStyled>
      </HeaderStyled>
    </Affix>
  );
};

export default OwnHeader;
