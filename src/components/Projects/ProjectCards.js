import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      {props.imgPath ? (
        <Card.Img variant="top" src={props.imgPath} alt={props.title} />
      ) : null}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>

        {props.techStack && props.techStack.length > 0 && (
          <div style={{ marginBottom: "15px" }}>
            {props.techStack.map((tech) => (
              <Badge
                key={tech}
                pill
                bg="secondary"
                style={{ marginRight: "6px", marginBottom: "5px" }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {props.ghLink && (
          <Button variant="primary" href={props.ghLink} target="_blank">
            <BsGithub /> &nbsp; GitHub
          </Button>
        )}
        {"\n"}
        {"\n"}

        {props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            <CgWebsite /> &nbsp; Demo
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;