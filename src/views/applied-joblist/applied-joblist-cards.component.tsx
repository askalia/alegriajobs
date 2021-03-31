import Markdown from "markdown-to-jsx";
import React, { FC } from "react";
import { Link, useHistory } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";
import shortid from "shortid";

import { Candidature, Job } from "../../shared/models";
import "./applied-joblist-cards.scss";

export const AppliedJoblistCards: FC<IAppliedJoblistCardsProps> = ({
  candidatures,
  findJobById,
  onSelect,
  onUnapply,
}) => {
  const history = useHistory();

  const redirect = (e: MouseEvent) => {
    e.preventDefault();

    history.push("/candidate/jobs");
  }
  return (
    <div className="jobs-applied-container">
      <ul>
        {(candidatures || []).map((candidature) => {
          const job = findJobById(candidature.fields.job[0] as string);
          return (
            <li key={shortid.generate()}>
              <Card style={{ width: "20rem" }} key={`jobcard-${job?.id}`}>
                <CardImg
                  alt="..."
                  src={
                    require(`assets/img/jobs/${job?.fields?.tag}.jpg`).default
                  }
                  top
                />
                <CardBody>
                  <CardTitle className="text-center">
                    <h3>{job?.fields?.title}</h3>
                  </CardTitle>
                  
                    <Markdown>
                      {(job?.fields?.description || "")
                        .split(" ")
                        .splice(0, 30)
                        .join(" ") + "..."}
                    </Markdown>
                  
                  <div className="candidature-actions">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e: any) => onSelect(candidature, e)}
                    >
                      View
                    </Button>
                    <Button
                      color="danger"
                      outline
                      href="#pablo"
                      onClick={(e: any) => onUnapply(candidature, e)}
                    >
                      Unapply
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </li>
          );
        })}
        {candidatures.length === 0 && (
          <div>
            <Card style={{ width: "18rem" }}>
              <CardBody style={{textAlign:"center"}}>
                <CardText>You don't have applied to any job yet</CardText>
                <Button color="primary" onClick={(e: any) => redirect(e)}>
                  Go to jobs
                </Button>
              </CardBody>
            </Card>
          </div>
        )}
      </ul>
    </div>
  );
};

interface IAppliedJoblistCardsProps {
  candidatures: Candidature[];
  findJobById: (jobId: string) => Job | undefined;
  onSelect: (candidature: Candidature, e?: MouseEvent) => void;
  onUnapply: (candidature: Candidature, e?: MouseEvent) => void;
}

export default AppliedJoblistCards;
