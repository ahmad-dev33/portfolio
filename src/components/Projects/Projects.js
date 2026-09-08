import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import api from "../../api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get("/projects/")
      .then((res) => setProjects(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>

        {loading && (
          <div className="text-center" style={{ padding: "40px" }}>
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {error && (
          <Alert variant="danger" style={{ marginTop: "20px" }}>
            Could not load projects. Please try again later.
          </Alert>
        )}

        {!loading && !error && (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {projects.map((project, index) => (
              <Col md={4} className="project-card" key={project.id || index}>
                <ProjectCard
                  imgPath={project.image}
                  title={project.title}
                  description={project.description}
                  ghLink={project.gh_link}
                  demoLink={project.demo_link}
                  techStack={
                    project.tech_stack
                      ? project.tech_stack.split(",").map((t) => t.trim())
                      : []
                  }
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default Projects;