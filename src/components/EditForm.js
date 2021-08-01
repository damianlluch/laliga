import React, { useState, useEffect, useCallback } from "react";
import { editUserApi } from "../api/reqresApi";
import { Button, Input, Form, Spin, Result } from "antd";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const FormStyled = styled(Form)`
  margin: 20px;
  padding: 40px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #eee;
  box-shadow: 0px 0px 8px 2px #ababab;
`;
const SpinStyled = styled(Spin)`
  display: block;
  margin: 10px auto;
`;
const ButtonGrid = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;
const EditForm = ({ id, setShowForm, avatar }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [editResponse, setEditResponse] = useState(0);
  const editUser = useCallback(
    async (form) => {
      try {
        setEditLoading(true);
        const response = await editUserApi(id, form);
        setEditLoading(false);
        dispatch({
          type: "update_user",
          payload: { id, ...response, avatar },
        });
        return setEditResponse(1);
      } catch (err) {
        setEditLoading(false);
        return setEditResponse(-1);
      }
    },
    [dispatch, setEditLoading, setEditResponse, avatar, id]
  );
  const handleChange = useCallback(
    (e) => {
      setForm({ ...form, [e.target.id]: e.target.value });
    },
    [form, setForm]
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      window.addEventListener("change", handleChange);
      window.addEventListener("submit", editUser);
    }

    return () => {
      mounted = false;
      window.removeEventListener("change", handleChange);
      window.removeEventListener("submit", editUser);
    };
  }, [editUser, handleChange]);
  return (
    <FormStyled onFinish={editUser}>
      <Form.Item
        label="First name"
        name="first_name"
        id="first_name"
        onChange={handleChange}
        rules={[
          {
            required: true,
            message: "Required",
          },
        ]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="last_name"
        id="last_name"
        onChange={handleChange}
        rules={[
          {
            required: true,
            message: "Required",
          },
        ]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        id="email"
        onChange={handleChange}
        rules={[
          {
            required: true,
            message: "Required",
          },
        ]}
      >
        <Input type="email" placeholder="Email" />
      </Form.Item>
      {editResponse === 1 && <Result status="success" title="Updated user" />}
      {editResponse === -1 && (
        <Result status="error" title="Unable to update user" />
      )}
      {editLoading ? (
        <SpinStyled size="large" />
      ) : (
        <ButtonGrid>
          <Button block type="primary" htmlType="submit">
            Update
          </Button>
          <Button block type="secondary" onClick={() => setShowForm(false)}>
            Hide form
          </Button>
        </ButtonGrid>
      )}
    </FormStyled>
  );
};

export default EditForm;
