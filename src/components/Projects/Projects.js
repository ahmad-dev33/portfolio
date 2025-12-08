import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import mapping from "../../Assets/Projects/mapping.png";
import trading from "../../Assets/Projects/trading.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/face_recognition.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
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
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="MovieMate"
              description="MovieMate is a sleek and intuitive mobile app built with Expo React Native, designed to bring the magic of cinema to your fingertips. Users can browse trending movies, view detailed information including cast, trailers, and ratings, and create personalized watchlists. With a responsive design and smooth navigation, MovieMate offers a seamless experience across both Android and iOS devices—perfect for movie lovers on the go"
              ghLink="https://github.com/ahmad-dev33/Movie_App"
              demoLink="https://example.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Bits-0f-C0de"
              description="My personal telegram news bot which is build with python-telegram-bot api. It fetches the news from various news sources and send it to the user on telegram. The user can also choose the category of news he wants to receive. The bot is deployed on heroku and is running 24/7."
              ghLink="https://github.com/ahmad-dev33/news"
              demoLink="https://example.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Editor.io"
              description="My personal forex trading bot which is build with python. It uses the forex-python library to fetch the real-time forex data and then uses a simple algorithm to make buy/sell decisions. The bot is deployed on heroku and is running 24/7."
              ghLink="https://github.com/ahmad-dev33/forex"
              demoLink="https://example.tech/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={mapping}
              isBlog={false}
              title="Mapping AI"
              description="A python based bot that wworks with tesorflow and opencv to create a mapping of the place based on drone pictures."
              ghLink="https://github.com/ahmad-dev33/mapping"
              demoLink="https://example.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="Facial_recognition_tool"
              description="facial recognizer python_Tensorflow based ."
              ghLink="https://github.com/ahmad-dev33/Facial_recognition_tool"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={trading}
              isBlog={false}
              title="kucoin trading bot"
              description="python kucoin trading app trained to trade with the signals it recived from telegram signal chanel and works when it recive an email from the user."
              // demoLink="https://github.com/ahmad-dev33/forex/"      <--------Please include a demo link here 
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
