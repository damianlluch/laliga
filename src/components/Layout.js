import React from "react";
import { Header } from "../components";
import styled from "styled-components";
import { Layout, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";
const { Content } = Layout;

const LayoutStyled = styled(Layout)`
  background-color: #f0f2f5;
`;
const ContentStyled = styled(Content)`
  margin: 10px 0px;
`;
const BreadcrumbStyled = styled(Breadcrumb)`
  cursor: pointer;
  margin: 10px auto;

  &:hover {
    color: #40a9ff;
  }
`;
const OwnLayout = ({ children, breadcrumb }) => {
  return (
    <LayoutStyled>
      <Header />
      {breadcrumb && (
        <BreadcrumbStyled>
          <Breadcrumb.Item>
            <RollbackOutlined />
            <Link to="/user">User list</Link>
          </Breadcrumb.Item>
        </BreadcrumbStyled>
      )}
      <ContentStyled>{children}</ContentStyled>
    </LayoutStyled>
  );
};

export default OwnLayout;
