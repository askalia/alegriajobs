import { FC, FormEvent, useState } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import candidateAuthService from "../../shared/services/candidate-auth.service";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  CardHeader,
} from "reactstrap";
import {
  mapUserDispatchToProps,
  IUserMapDispatchToProps,
} from "store/user/user.actions";

import {
  auth,
  FirebaseUser,
} from "../../shared/services/firebase-utils.service";

type ISigninPageProps = {} & RouteComponentProps & IUserMapDispatchToProps;

const defaultState = {
  email: "",
  password: "",
};

const Signin: FC<ISigninPageProps> = (props: ISigninPageProps) => {
  const [email, setEmail] = useState<FirebaseUser["email"]>(defaultState.email);
  const [password, setPassword] = useState<string>(defaultState.password);

  /*useEffect(() => {
    console.log('usef : ', auth.currentUser)
    if (candidateAuthService.isCandidateLoggedIn()) {
      props.history.push("/jobs");
    }
  }, [props.history]);
  */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await candidateAuthService.signIn(email as string, password);
      if (auth.currentUser) {
        props.setCurrentUser(auth.currentUser);
        props.history.push("/jobs");
      }
    } catch (e) {
      console.error("signin:error:", e);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5 text-center">
            <h2>Login as a Candidate</h2>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
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
            <Link to="/auth/signup">Create new account</Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};
export default connect(null, mapUserDispatchToProps)(withRouter(Signin));
