import Markdown from "markdown-to-jsx";
import React, { FC } from "react";
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
}) => (
  <div className="jobs-applied-container">
    <ul>
      {(candidatures || []).map((candidature) => {
        const job = findJobById(candidature.fields.job[0] as string);
        return (
          <li key={shortid.generate()}>
            <Card style={{ width: "20rem" }} key={`jobcard-${job?.id}`}>
              <CardImg
                alt="..."
                src={require(`assets/img/jobs/${job?.fields?.tag}.jpg`).default}
                top
              />
              <CardBody>
                <CardTitle className="text-center">
                  <h3>{job?.fields?.title}</h3>
                </CardTitle>
                <CardText>
                  <Markdown>
                    {(job?.fields?.description || "")
                      .split(" ")
                      .splice(0, 30)
                      .join(" ") + "..."}
                  </Markdown>
                </CardText>
                <Button
                  block
                  color="primary"
                  href="#pablo"
                  onClick={(e: any) => onSelect(candidature, e)}
                >
                  View
                </Button>
              </CardBody>
            </Card>
          </li>
        );
      })}
    </ul>
  </div>
);

interface IAppliedJoblistCardsProps {
  candidatures: Candidature[];
  findJobById: (jobId: string) => Job | undefined;
  onSelect: (candidature: Candidature, e?: MouseEvent) => void;
}

export default AppliedJoblistCards;
