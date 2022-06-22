import { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

/**
 * BoardList class
 */
class BoardList extends Component {
  //@return {Component} Component

  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>게시글1</td>
              <td>artistJay</td>
              <td>2022-03-29</td>
            </tr>
            <tr>
              <td>2</td>
              <td>게시글2</td>
              <td>artistJay</td>
              <td>2022-03-19</td>
            </tr>
            <tr>
              <td>3</td>
              <td>게시글3</td>
              <td>artistJay</td>
              <td>2022-03-09</td>
            </tr>
          </tbody>
        </Table>
        <Button variant="info">생성</Button>
        <Button variant="secondary">수정</Button>
        <Button variant="danger">삭제</Button>
      </div>
    );
  }
}

export default BoardList;
