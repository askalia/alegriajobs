import React, { ChangeEvent, FC, FormEvent, useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { candidateService } from "shared/services/candidate.service";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

type ISignupProps = {} & RouteComponentProps;
interface IRegisterViewState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup: FC<ISignupProps> = (props) => {
  const [name, setName] = useState<IRegisterViewState["name"]>(initialState.name);
  const [email, setEmail] = useState<IRegisterViewState["email"]>(initialState.email);
  const [password, setPassword] = useState<IRegisterViewState["password"]>(initialState.password);
  const [confirmPassword, setConfirmPassword] = useState<IRegisterViewState["confirmPassword"]>(initialState.confirmPassword);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (confirmPassword !== password) {
      alert("passwords mismatch");
      return;
    }

    try {
      await candidateService.registerCandidate({
        name,
        email,
        password,
      });

      props.history.push("/auth/login");
    } catch (e) {
      console.log("err : ", e);
    }
  };
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5 text-center">
            <h2>Signup as a Candidate</h2>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={(e: any) => onSubmit(e)}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    name="name"
                    onChange={(e: ChangeEvent) =>
                      setName((e.target as HTMLInputElement).value)
                    }
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    autoComplete="new-email"
                    onChange={(e: ChangeEvent) =>
                      setEmail((e.target as HTMLInputElement).value)
                    }
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    onChange={(e: ChangeEvent) =>
                      setPassword((e.target as HTMLInputElement).value)
                    }
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm password"
                    type="password"
                    autoComplete="new-password"
                    name="confirmPassword"
                    onChange={(e: ChangeEvent) =>
                      setConfirmPassword((e.target as HTMLInputElement).value)
                    }
                  />
                </InputGroup>
              </FormGroup>

              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the &#160;
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <Link to="/auth/signin">Login to your account</Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default withRouter(Signup);
