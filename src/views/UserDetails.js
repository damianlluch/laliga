import React, { useState, useEffect, useCallback } from "react";
import { Layout, EditForm } from "../components";
import { getUserApi, deleteUserApi } from "../api/reqresApi";
import { useDispatch, useSelector } from "react-redux";
import { Card, Spin, Button, Skeleton } from "antd";
import { Result } from "antd";
import { useParams } from "react-router-dom";
import styled from "styled-components";
const { Meta } = Card;

const CardStyled = styled(Card)`
  height: 100%;
  width: 20%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ButtonGrid = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const SpinStyled = styled(Spin)`
  display: block;
  margin: 10px auto;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const UserDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userLoader, setUserLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deleteReponse, setDeleteReponse] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const deleteUser = useCallback(
    async (id) => {
      try {
        setDeleteLoader(true);
        setShowForm(false);
        await deleteUserApi(id);
        dispatch({
          type: "set_user_data",
          payload: "",
        });
        setDeleteLoader(false);
        return setDeleteReponse(1);
      } catch (err) {
        setDeleteLoader(false);
        return setDeleteReponse(-1);
      }
    },
    [setShowForm, dispatch]
  );
  useEffect(() => {
    let mounted = true;
    const getUserEffect = async (id) => {
      try {
        setUserLoader(true);
        const response = await getUserApi(id);
        setUserLoader(false);
        return dispatch({
          type: "set_user_data",
          payload: response.data,
        });
      } catch (err) {
        return setUserLoader(false);
      }
    };
    if (mounted) {
      getUserEffect(id);
    }
    return () => {
      mounted = false;
      window.removeEventListener("click", deleteUser);
    };
  }, [dispatch, id, deleteUser]);
  return (
    <Layout breadcrumb={true}>
      <CardContainer>
        {deleteReponse === 1 && (
          <Result status="success" title="User deleted" />
        )}
        {deleteReponse === -1 && (
          <Result status="error" title="User could not be deleted" />
        )}
        {userLoader && <SpinStyled size="large" />}
        {!userLoader && user.email && deleteReponse === 0 && (
          <>
            <CardStyled cover={<img alt="example" src={user.avatar} />}>
              <Skeleton loading={userLoader} avatar active>
                <Meta
                  title={`${user.first_name} ${user.last_name}`}
                  description={user.email}
                />
              </Skeleton>
              {deleteLoader && <SpinStyled size="large" />}
              <ButtonGrid>
                <Button block type="primary" onClick={() => setShowForm(true)}>
                  Edit
                </Button>
                <Button block type="danger" onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>
              </ButtonGrid>
            </CardStyled>
          </>
        )}
        {showForm && (
          <EditForm
            id={user.id}
            setShowForm={setShowForm}
            avatar={user.avatar}
          />
        )}
      </CardContainer>
    </Layout>
  );
};

export default UserDetails;
