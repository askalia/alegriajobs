import { FC, useState } from "react";
import { Job } from "../../shared/models";
import { Button, Col, Form, FormGroup, Row } from "reactstrap";
import ReactQuill from "react-quill";

import "./job-apply-panel.scss";
import "react-quill/dist/quill.snow.css";
import { IApplyJob } from "shared/services/candidature.service";
import { candidateService } from "shared/services/candidate.service";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { candidaturesActions } from "store/candidatures/candidatures.actions";
import { connect } from "react-redux";

type IJobApplyPanelProps = {
  job: Job;
  close: () => void;
  applyJob: (data: IApplyJob) => Promise<any>;
  refreshCandidatures: (candidateId: string) => Promise<void>;
} & RouteComponentProps;
const JobApplyPanel: FC<IJobApplyPanelProps> = ({
  job,
  close,
  applyJob,
  history,
  refreshCandidatures,
}) => {
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [resume, setResume] = useState<FileList>();

  ///let resume: any = null;
  const sendNow = (e: MouseEvent) => {
    e.preventDefault();

    applyJob({
      candidateId: candidateService.getCandidateId(),
      coverLetter,
      resume: (resume as FileList)[0],
      job,
    })
      .then(() => refreshCandidatures(candidateService.getCandidateId()))
      .then(redirectToJobsApplied);
  };

  const redirectToJobsApplied = () => history.push("/candidate/jobs/applied");

  const onFileSelected = (event: MouseEvent) => {
    setResume((event.target as HTMLInputElement).files as FileList);
  };

  return (
    <>
      <Form onSubmit={(e: any) => sendNow(e)}>
        <Row>
          <Col lg="12" className="description-container">
            <FormGroup>
              <label className="form-control-label" htmlFor="resume">
                Join your updated resume <i className="control-required"></i>
              </label>
              <input
                type="file"
                name="resume"
                id="resume"
                onChange={(e: any) => onFileSelected(e)}
              />
            </FormGroup>
          </Col>

          <Col lg="12">
            <FormGroup>
              <label className="form-control-label" htmlFor="coverLetter">
                Write a cover letter <i className="control-required"></i>
              </label>
              <div className="cover-letter-container">
                <ReactQuill
                  theme="snow"
                  value={coverLetter}
                  onChange={setCoverLetter}
                  id="coverLetter"
                  modules={{
                    toolbar: [
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "link",
                      "image",
                    ],
                  }}
                  bounds="cover-letter-container"
                />
              </div>
            </FormGroup>
          </Col>

          <Col lg="12 text-center">
            <Button
              type="button"
              color="default"
              outline
              onClick={close}
              className="btn-icon"
            >
              <span className="btn-inner--icon">
                <i className="ni ni-bold-left" />
                <span className="btn-inner--text">Cancel</span>
              </span>
            </Button>
            <Button color="success" type="submit" className="btn-icon">
              <span className="btn-inner--icon">
                <i className="ni ni-send" />
                <span className="btn-inner--text">Send it now</span>
              </span>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const mapDispatchToProps = () => ({
  refreshCandidatures: candidaturesActions.refreshCandidatures,
});

export default connect(null, mapDispatchToProps)(withRouter(JobApplyPanel));
