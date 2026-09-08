import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Particle from "../Particle";
import api from "../../api";
import {
  AiFillGithub,
  AiOutlineMail,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await api.post("/contact/", { name, email, message });
      setSuccess("Thanks! Your message was sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(
        "Could not send the message. Make sure the backend is running and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="login-section" style={{ padding: "150px 0", color: "white" }}>
      <Particle />
      <Container>
        <h1 className="project-heading">
          Get In <strong className="purple">Touch</strong>
        </h1>
        <Row className="justify-content-center" style={{ paddingTop: "20px" }}>
          <Col md={6} className="login-card" style={{ backgroundColor: "#1b1a2e", padding: "40px", borderRadius: "10px", boxShadow: "0px 4px 20px rgba(119, 53, 136, 0.4)" }}>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formContactName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ background: "transparent", color: "white", borderColor: "#773588" }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formContactEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ background: "transparent", color: "white", borderColor: "#773588" }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formContactMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  style={{ background: "transparent", color: "white", borderColor: "#773588" }}
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading} style={{ width: "100%", backgroundColor: "#623686", borderColor: "#623686" }}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </Form>
          </Col>

          <Col md={5} style={{ paddingLeft: "40px", color: "white" }}>
            <h4>Or reach me directly:</h4>
            <p style={{ marginTop: "20px", fontSize: "16px" }}>
              <AiOutlineMail style={{ marginRight: "10px" }} /> ahmad.dana963@gmail.com
            </p>
            <ul className="footer-icons" style={{ marginLeft: "-40px" }}>
              <li className="social-icons">
                <a href="https://github.com/ahmad-dev33" style={{ color: "white" }} target="_blank" rel="noopener noreferrer">
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a href="https://www.linkedin.com/in/ahmad-dana-755072372/" style={{ color: "white" }} target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Contact;