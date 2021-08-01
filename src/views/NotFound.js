import React from "react";
import { Layout } from "../components";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Layout>
      <Result
        status="404"
        title="Page not found"
        subTitle="You cannot access this page"
        extra={
          <Button type="primary">
            <Link to="/user">Go back to User list</Link>
          </Button>
        }
      />
    </Layout>
  );
};

export default NotFound;
