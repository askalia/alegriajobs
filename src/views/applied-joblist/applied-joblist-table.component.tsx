import { FC } from "react";
import {
  Card,
  CardHeader,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Table,
} from "reactstrap";
import shortid from "shortid";
import { Candidature, Job } from "../../shared/models";

export const AppliedJoblistTable: FC<IAppliedJoblistTableProps> = ({
  candidatures,
  findJobById,
  onSelect,
}) => (
  <Card className="shadow">
    <CardHeader className="border-0">
      <Row>
        <Col lg="6">
          <FormGroup>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-zoom-split-in" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Search by title" type="text" />
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    </CardHeader>
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr>
          <th scope="col"></th>
          <th scope="col">Job title</th>
          <th scope="col">Resume</th>
          <th scope="col">Cover letter</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(candidatures) &&
          candidatures.map((candidature) => (
            <tr
              key={shortid.generate()}
              onClick={(e: any) => onSelect(candidature, e)}
            >
              <td>
                <i className="ni ni-send" />
              </td>
              <td>
                {
                  findJobById(candidature.fields.job[0] as string)?.fields
                    ?.title
                }
              </td>
              <td>
                <a
                  href={candidature?.fields?.resume[0]?.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    alt="resume file"
                    src={candidature?.fields?.resume[0]?.thumbnails?.small?.url}
                  />
                </a>
              </td>
              <td>
                {candidature?.fields.cover_letter
                  .split(" ")
                  .splice(0, 10)
                  .join(" ") + "..."}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  </Card>
);

interface IAppliedJoblistTableProps {
  candidatures: Candidature[];
  findJobById: (jobId: string) => Job | undefined;
  onSelect: (candidature: Candidature, e?: MouseEvent) => void;
}
