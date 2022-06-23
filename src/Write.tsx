import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";

/**
 *  Write class
 */
class Write extends Component {
  // @return {Component} Component

  state = {
    isModifyMode: false,
    title: "",
    content: "",
  };

  write = () => {
    Axios.post("http://localhost:8000/insert", {
      title: this.state.title,
      content: this.state.content,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  update = () => {
    Axios.post("http://localhost:8000/update", {
      title: this.state.title,
      content: this.state.content,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // eslint-disable-next-line
  handleChange = (e: any) => {
    console.log("### e : ", e);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={this.handleChange}
              placeholder="뭐라고 적으면 좋을까"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextatea1">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              onChange={this.handleChange}
              placeholder="어떻게 적어야 좋을까"
            />
          </Form.Group>
        </Form>
        <Button
          variant="info"
          onClick={this.state.isModifyMode ? this.update : this.write}
        >
          완료
        </Button>
        <Button variant="secondary">취소</Button>
      </div>
    );
  }
}

export default Write;
