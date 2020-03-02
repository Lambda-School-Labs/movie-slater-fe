import React from "react";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import { Login } from "../components/auth/Login";
import { login } from "../actions";
import { renderWithRedux } from "../StoreFactory";

afterEach(cleanup);

test("login renders", () => {
  const { getByLabelText } = render(<Login />);
  const emailNode = getByLabelText("Email");
  const passwordNode = getByLabelText("Password");
  expect(emailNode).toBeInTheDocument();
  expect(passwordNode).toBeInTheDocument();
});

test.skip("calls onSubmit with the username and password when submitted", async () => {
  // Arrange
  const history = {
    push: jest.fn(() => "/")
  };
  const handleSubmit = jest.fn();
  const fakeUser = {
    email: "test@test.com",
    password: "test"
  };

  // render and grab your queries
  const { container, getByLabelText, getByText } = renderWithRedux(
    <Login handleSubmit={handleSubmit} login={login} history={history} />
  );

  // grab the input fields
  const emailNode = getByLabelText("Email");
  const passwordNode = getByLabelText("Password");
  const formNode = container.querySelector("form");
  const submitButtonNode = getByText("Log In");

  // fill out the fields with fake user
  emailNode.value = fakeUser.email;
  passwordNode.value = fakeUser.password;

  // Act
  fireEvent.submit(formNode);
  // Simulate.onSubmit(formNode);

  // Assert
  await wait(() => {
    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledWith(fakeUser);
    expect(submitButtonNode.type).toBe("submit");
  });
});
