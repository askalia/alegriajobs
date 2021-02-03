import { FC, ReactElement } from "react";
import { Badge, Col, Form, FormGroup, Row } from "reactstrap";
import { Job } from "../../shared/models";
import Drawer from "../layouts/Drawer/Drawer";
import Markdown from "markdown-to-jsx";
import shortid from "shortid";
import "./job-detail-panel.scss";

export type JobDetailPanelProps = {
  job: Job | null;
};

export const JobDetailPanel: FC<JobDetailPanelProps> = ({
  job,
}): ReactElement => {
  const getForm = () => (
    <div>
      <div
        className="justify-content-between align-items-center row"
        style={{ marginBottom: "100px" }}
      >
        <h3 className="p-10">
          <Badge
            color={job?.fields?.category === "tech" ? "info" : "warning"}
            pill
          >
            {job?.fields?.category}
          </Badge>
          &#160;&#160;{job?.fields?.title}{" "}
          <span style={{ float: "right" }}>
            posted : {job?.fields?.posted_at}
          </span>
        </h3>
      </div>
      <Form>
        <div className="pl-lg-10">
          <Row>
            <Col lg="12" className="description-container">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-email">
                  About
                </label>
                <Markdown>{job?.fields?.description || ""}</Markdown>
              </FormGroup>
            </Col>
            <Col lg="12">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-username">
                  Location
                </label>
                <p>{job?.fields?.location || "N.C."}</p>
              </FormGroup>
            </Col>
            <Col lg="3">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-last-name">
                  Skills
                </label>
                <p>
                  <ul>
                    {job?.fields?.hard_skills.map((hs) => (
                      <li>
                        <Badge color="success" key={shortid.generate()} pill>
                          {hs.name}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </p>
              </FormGroup>
            </Col>

            <Col lg="3">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-username">
                  Status
                </label>
                <p>{job?.fields?.status}</p>
              </FormGroup>
            </Col>
            <Col lg="3" className="description-container">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-email">
                  Company
                </label>
                <p>
                  <a href={`mailto:${job?.fields.employer?.email}`}>
                    {job?.fields?.employer?.name}
                  </a>
                </p>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <hr className="my-4" />
      </Form>
    </div>
  );

  return <Drawer>{getForm()}</Drawer>;
};
