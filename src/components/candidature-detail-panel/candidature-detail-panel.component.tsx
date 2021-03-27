import { FC, ReactElement, useEffect, useState } from "react";
import { Button, Col, FormGroup, Row } from "reactstrap";
import { Candidature, Job } from "../../shared/models";
import Drawer from "../layouts/Drawer/Drawer";
import Markdown from "markdown-to-jsx";
import { Link } from "react-router-dom";
import "./candidature-detail.scss";
import { Document, Page } from "react-pdf";
import ReactQuill from "react-quill";
import MarkdownIt from "markdown-it";

export type CandidatureDetailPanelProps = {
  candidature: Candidature;
  job: Job;
  close: () => void;
};

export const CandidatureDetailPanel: FC<CandidatureDetailPanelProps> = ({
  candidature,
  job,
  close,
}): ReactElement => {
  const [coverLetterEditMode, setCoverLetterEditMode] = useState<Boolean>(
    false
  );
  const [coverLetter, setCoverLetter] = useState<string>(
    new MarkdownIt().render(candidature.fields.cover_letter)
  );

  useEffect(() => {
    setCoverLetterEditMode(false);
  }, []);

  const getForm = () => (
    <div>
      <div
        className="justify-content-between align-items-center row"
        style={{ marginBottom: "100px" }}
      >
        <h3 className="p-10">
          You've applied to :{" "}
          <Link to={`/candidate/jobs/${job.id}`} rel="noreferrer">
            {job?.fields?.title}
          </Link>
        </h3>
      </div>

      <div className="pl-lg-10">
        <Row className="details-container">
          <Col lg="12" className="resume-container">
            <FormGroup>
              <label className="form-control-label">Your resume</label>
              <div className="md-description">
                {(candidature?.fields?.resume || [])[0]?.url?.includes(
                  ".pdf"
                ) && (
                  <Document file={(candidature?.fields?.resume || [])[0]?.url}>
                    <Page pageNumber={1} />
                  </Document>
                )}
                {!(candidature?.fields?.resume || [])[0]?.url.includes(
                  ".pdf"
                ) && (
                  <a
                    href={(candidature?.fields?.resume || [])[0]?.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={(candidature?.fields?.resume || [])[0]?.url}
                      alt={(candidature.fields.resume || [])[0]?.filename}
                    />
                  </a>
                )}
              </div>
            </FormGroup>
          </Col>
          <Col lg="12" className="cover-letter-container">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-email">
                Your cover letter
              </label>
              <div className="md-description">
                <div
                  className="callout callout-success"
                  onClick={(e) => setCoverLetterEditMode(true)}
                >
                  {coverLetterEditMode === false ? (
                    <Markdown>{coverLetter}</Markdown>
                  ) : (
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
                  )}
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>

        <Row>
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
          </Col>
        </Row>
      </div>
    </div>
  );

  return <Drawer>{getForm()}</Drawer>;
};
