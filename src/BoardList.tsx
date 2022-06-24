import React, { Component } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Board = ({
  id,
  title,
  registerId,
  registerDate,
  onCheckboxChange,
}: {
  id: number;
  title: string;
  registerId: string;
  registerDate: string;
  onCheckboxChange: any;
}) => {
  return (
    <tr>
      <td>
        <input type="checkbox" value={id} onChange={onCheckboxChange}></input>
      </td>
      <td>{id}</td>
      <td>{title}</td>
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};

interface IProps {
  isComplete: boolean;
  handleModify: any;
  renderComplete: any;
}

/**
 * BoardList class
 * @param {SS} e
 */
class BoardList extends Component<IProps> {
  handleDelete = () => {
    if (this.state.checkList.length === 0) {
      alert("삭제");
      return;
    }

    let boardIdList = "";

    this.state.checkList.forEach((v: any) => {
      boardIdList += `'${v}',`;
    });

    Axios.post("http://localhost:8000/delete", {
      boardIdList: boardIdList.substring(0, -1),
    })
      .then(() => {
        this.getList();
      })
      .catch((e) => {
        console.error(e);
      });
  };
  /**
   * @param {SS} props
   */
  constructor(props: any) {
    super(props);
    this.state = {
      isModifyMode: props.isModifyMode,
      BoardList: [],
      checkList: [],
    };
  }

  state = {
    BoardList: [],
    checkList: [],
    isModifyMode: false,
  };

  getList = () => {
    Axios.get("http://localhost:8000/list", {})
      .then((res) => {
        const { data } = res;
        this.setState({
          BoardList: data,
        });
        this.props.renderComplete();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  /**
   *
   * @param {boolean} checked
   * @param {any} id
   */
  onCheckboxChange = (checked: boolean, id: any) => {
    const list: Array<string> = this.state.checkList.filter((v) => {
      return v !== id;
    });

    if (checked) {
      list.push(id);
    }

    this.setState({
      checkList: list,
    });
  };
  // onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target, event.target.checked, event.target.value);
  //   console.log("checkbox changed");

  // };

  /**
   */
  componentDidMount() {
    this.getList();
  }

  /**
   */
  componentDidUpdate() {
    if (!this.props.isComplete) {
      this.getList();
    }
  }
  /**
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
                    onCheckboxChange={this.onCheckboxChange}
                  />
                );
              })
            }
          </tbody>
        </Table>
        <Link to="/write">
          <Button variant="info">생성</Button>
        </Link>
        <Button
          variant="secondary"
          onClick={() => {
            this.props.handleModify(this.state.checkList);
          }}
        >
          수정
        </Button>
        <Button variant="danger" onClick={this.handleDelete}>
          삭제
        </Button>
      </div>
    );
  }
}

export default BoardList;
