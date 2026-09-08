import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("user/register/", { username, email, password });
      alert("Account created successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      setError("Failed to create account. The username might already be taken.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="login-section" style={{ padding: "150px 0", color: "white" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} style={{ backgroundColor: "#1b1a2e", padding: "40px", borderRadius: "10px", boxShadow: "0px 4px 20px rgba(119, 53, 136, 0.4)" }}>
            <h2 className="text-center mb-4" style={{ color: "#cd5ff8" }}>Create New Account</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="input username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                  style={{ background: "transparent", color: "white", borderColor: "#773588" }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="input email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  style={{ background: "transparent", color: "white", borderColor: "#773588" }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="input strong password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  style={{ background: "transparent", color: "white", borderColor: "#773588" }}
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading} style={{ width: "100%", backgroundColor: "#623686", borderColor: "#623686" }}>
                {loading ? "Loading..." : "Register"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Register;