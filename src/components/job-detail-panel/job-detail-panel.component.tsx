import { FC, ReactElement, useState } from "react";
import { Badge, Button, Col, FormGroup, Row } from "reactstrap";
import { Job } from "../../shared/models";
import Drawer from "../layouts/Drawer/Drawer";
import Markdown from "markdown-to-jsx";
import shortid from "shortid";
import "./job-detail-panel.scss";
import { JobApplyPanel } from "../job-apply-panel/job-apply-panel.component";
import { IApplyJob } from "shared/services/candidature.service";

export type JobDetailPanelProps = {
  job: Job;
  close: () => void;
  applyJob: (data: IApplyJob) => void;
};

const formatSalary = (num: number) => {
  let formattedNumber = "";
  const numAsString = String(num);
  for (let i = numAsString.length - 1; i >= 0; i--) {
    formattedNumber +=
      formattedNumber.length === 3 ? `.${numAsString[i]}` : numAsString[i];
  }
  return formattedNumber.split("").reverse().join("");
};

export const JobDetailPanel: FC<JobDetailPanelProps> = ({
  job,
  close,
  applyJob
}): ReactElement => {
  const [toggleApplyJobPanel, setToggleApplyJobPanel] = useState<boolean>(
    false
  );

  const closeDetailView = () => setToggleApplyJobPanel(false);

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
          &#160;&#160;{job?.fields?.title}
          <span style={{ float: "right" }}>
            {formatSalary(job?.fields?.salary || 0)} € per annum
          </span>
        </h3>
      </div>

      <div className="pl-lg-10">
        <Row>
          <Col lg="12" className="description-container">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-email">
                About
              </label>
              <div className="md-description">
                <Markdown>{job?.fields?.description || ""}</Markdown>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          {toggleApplyJobPanel === false && (
            <>
              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-last-name"
                  >
                    Skills
                  </label>

                  <ul>
                    {job?.fields?.hard_skills.map((hs) => (
                      <li key={shortid.generate()}>
                        <Badge color="success" key={shortid.generate()} pill>
                          {hs.name}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </FormGroup>
              </Col>

              <Col lg="4">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Location
                  </label>
                  <div>{job?.fields?.location || "N.C."}</div>
                </FormGroup>
              </Col>
              <Col lg="4" className="company-container">
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-email">
                    Company
                  </label>
                  <div>
                    <a href={`mailto:${job?.fields.employer?.email}`}>
                      {job?.fields?.employer?.name}
                    </a>
                  </div>
                </FormGroup>
              </Col>
              <Col lg="12 text-center">
                <hr className="my-4" />
                <Button
                  type="button"
                  color="default"
                  outline
                  onClick={(e) => close()}
                >
                  <span className="btn-inner--icon">
                    <i className="ni ni-button-power" />
                    <span className="btn-inner--text">Close</span>
                  </span>
                </Button>
                <Button
                  color="success"
                  type="button"
                  onClick={(e) => setToggleApplyJobPanel(!toggleApplyJobPanel)}
                >
                  <i className="ni ni-briefcase-24" />
                  <span className="btn-inner--text">Apply now</span>
                </Button>
              </Col>
            </>
          )}
          {toggleApplyJobPanel === true && (
            <Col lg="12">
              <JobApplyPanel job={job} close={closeDetailView}  applyJob={applyJob}/>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );

  return <Drawer>{getForm()}</Drawer>;
};
