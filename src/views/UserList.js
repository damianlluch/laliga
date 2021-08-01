import React, { useState, useEffect } from "react";
import { Layout } from "../components";
import { getUsersApi } from "../api/reqresApi";
import { useDispatch, useSelector } from "react-redux";
import { Card, Spin, Pagination, Result, Avatar, Skeleton } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
const { Meta } = Card;

const PaginationStyled = styled(Pagination)`
  text-align: center;
  margin: 20px auto;
`;
const ListContainer = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const SpinStyled = styled(Spin)`
  display: block;
  margin: 10px auto;
`;
const LinkStyled = styled(Link)`
  margin: 10px auto;
  @media (max-width: 768px) {
    width: 50%;
  }
`;

const CardContainer = styled(Card)`
  width: 300

  @media (max-width: 768px) {
    width: 100 
  }
`

const UserList = () => {
  const dispatch = useDispatch();
  const { usersList } = useSelector((state) => state.user.user);
  const [usersLoader, setUsersLoader] = useState(false);

  const onShowSizeChange = async (current) => {
    setUsersLoader(true);
    const response = await getUsersApi(current);
    setUsersLoader(false);
    return dispatch({
      type: "set_users_list",
      payload: response.data,
    });
  };
  useEffect(() => {
    let mounted = true;
    const getUsersEffect = async () => {
      try {
        setUsersLoader(true);
        const response = await getUsersApi(1);
        setUsersLoader(false);
        return dispatch({
          type: "set_users_list",
          payload: response.data,
        });
      } catch (err) {
        return setUsersLoader(false);
      }
    };
    if (mounted) {
      getUsersEffect();
    }
    return () => (mounted = false);
  }, [dispatch]);
  return (
    <Layout>
      <ListContainer>
        {usersList &&
          usersList.map((item, index) => (
            <LinkStyled key={index} to={"/user/" + item.id}>
              <CardContainer cover={<img alt="example" src={item.avatar} />}>
                <Skeleton loading={usersLoader} avatar active>
                <Meta
                  title={`${item.first_name} ${item.last_name}`}
                  description={item.email}
                />
                </Skeleton>
              </CardContainer>
            </LinkStyled>
          ))}
      </ListContainer>
      {!usersLoader && !usersList && (
        <Result status="error" title="Users not found" />
      )}
      {usersLoader && <SpinStyled size="large" />}
      {usersList && <PaginationStyled total={12} onChange={onShowSizeChange} />}
    </Layout>
  );
};

export default UserList;
