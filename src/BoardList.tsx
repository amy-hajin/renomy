import { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Axios from "axios";

const Board = ({
  id,
  title,
  registerId,
  registerDate,
}: {
  id: number;
  title: string;
  registerId: string;
  registerDate: string;
}) => {
  return (
    <tr>
      <td>
        <input type="checkbox"></input>
      </td>
      <td>{id}</td>
      <td>{title}</td>
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};

/**
 * BoardList class
 */
class BoardList extends Component {
  state = {
    BoardList: [],
  };

  getList = () => {
    Axios.get("http://localhost:8000/list", {})
      .then((res) => {
        const { data } = res;
        this.setState({
          BoardList: data,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  /**
   */
  componentDidMount() {
    this.getList();
  }

  /**
   *
   * @returns {Component} Component
   */
  render() {
    // eslint-disable-next-line
    const { BoardList }: { BoardList: any } = this.state;

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>선택</th>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {
              // eslint-disable-next-line
              BoardList.map((v: any) => {
                return (
                  <Board
                    id={v.BOARD_ID}
                    title={v.BOARD_TITLE}
                    registerId={v.REGISTER_ID}
                    registerDate={v.REGISTER_DATE}
                    key={v.BOARD_ID}
                  />
                );
              })
            }
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
