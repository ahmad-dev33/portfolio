import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      
      await login(username, password);
      
      navigate("/project");
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="login-section" style={{ padding: "150px 0", color: "white" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="login-card" style={{ backgroundColor: "#1b1a2e", padding: "40px", borderRadius: "10px", boxShadow: "0px 4px 20px rgba(119, 53, 136, 0.4)" }}>
            <h2 className="text-center mb-4" style={{ color: "#cd5ff8" }}>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Group className="d-flex">
                  <Form.Control 
                    type="text" 
                    placeholder="Enter username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                    style={{ background: "transparent", color: "white", borderColor: "#773588" }}
                  />
                </Form.Group>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  style={{ background: "transparent", color: "white", borderColor: "#773588" }}
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading} style={{ width: "100%", backgroundColor: "#623686", borderColor: "#623686" }}>
                {loading ? "Loading..." : "Login"}
              </Button>
            </Form>
            
            <p className="text-center mt-3 text-muted">
              Don't have an account? <span style={{ color: "#cd5ff8", cursor: "pointer" }} onClick={() => navigate("/register")}>Create a new account</span>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Login;