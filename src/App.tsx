import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { Books } from "./model/Book";
import { useDispatch, useSelector } from "react-redux";
import { saveToLocal } from "./saveToLocal/saveToLocal";
import { addBook, deleteBook } from "./action/action";

export default function App() {
  const bookState = useSelector((state: any) => state.bookReducer);
  const dispatch = useDispatch();

  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [nameBook, setNameBook] = useState<string>("");
  const [studentBorrow, setStudentBorrow] = useState<string>("");
  const [dateBorrow, setDateBorrow] = useState<string>("");
  const [datePaid, setDatePaid] = useState<string>("");
  const [bookToDelete, setBookToDelete] = useState<Books | null>(null);

  // Lỗi khi không nhập thông tin
  const [nameBookError, setNameBookError] = useState<boolean>(false);
  const [studentBorrowErr, setStudentBorrowErr] = useState<boolean>(false);
  const [dateErr, setDateErr] = useState<boolean>(false);

  // Hàm định dạng ngày tháng năm
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Hàm thêm mới thông tin sách
  const handleAddBook = () => {
    if (!nameBook) {
      setNameBookError(true);
    }
    if (!studentBorrow) {
      setStudentBorrowErr(true);
    }
    const currentDate = new Date().toISOString().split("T")[0];

    if (dateBorrow < currentDate || datePaid < currentDate) {
      setDateErr(true);
    } else {
      setDateErr(false);
    }

    const newBook: Books = {
      id: Math.ceil(Math.random() * 1000),
      nameBook,
      studentBorrow,
      dateBorrow,
      datePaid,
      status: false, // Giả định rằng status true là đã trả, false là chưa trả
    };

    const updatedBooks = [...bookState, newBook];
    saveToLocal("listBooks", updatedBooks);
    dispatch(addBook("ADD", newBook));

    handleCloseAdd();
  };

  // Hiển thị modal thêm mới sách
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  // Hiển thị modal xác nhận xóa
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (book: Books) => {
    setBookToDelete(book);
    setShowDelete(true);
  };

  // Xử lý xóa sách sau khi xác nhận
  const confirmDeleteBook = () => {
    if (bookToDelete) {
      const updatedBooks = bookState.filter(
        (book: Books) => book.id !== bookToDelete.id
      );
      saveToLocal("listBooks", updatedBooks);
      dispatch(deleteBook("DELETE", bookToDelete.id));
      setBookToDelete(null);
      window.location.reload();
    }
    setShowDelete(false);
  };

  return (
    <div className="container">
      <div className="header-container">
        <div className="left-header">
          <h3>Quản lý mượn trả sách</h3>
        </div>
        <div className="right-header">
          <Form.Select aria-label="Default select example">
            <option>Lọc theo trạng thái</option>
            <option value="1">Đã trả</option>
            <option value="2">Chưa trả</option>
          </Form.Select>

          <Button variant="primary" onClick={handleShowAdd}>
            Thêm
          </Button>

          <Modal show={showAdd} onHide={handleCloseAdd}>
            <Modal.Header closeButton>
              <Modal.Title>Thêm thông tin sách</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="nameBook">
                  <Form.Label>Tên sách</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên sách"
                    value={nameBook}
                    onChange={(e) => setNameBook(e.target.value)}
                    autoFocus
                  />
                  {nameBookError && (
                    <span style={{ fontSize: 14, color: "red" }}>
                      Tên sách không được để trống
                    </span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="studentBorrow">
                  <Form.Label>Tên người mượn</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tên người mượn"
                    value={studentBorrow}
                    onChange={(e) => setStudentBorrow(e.target.value)}
                  />
                  {studentBorrowErr && (
                    <span style={{ fontSize: 14, color: "red" }}>
                      Tên người mượn không được để trống
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="dateBorrow">
                  <Form.Label>Ngày mượn</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateBorrow}
                    onChange={(e) => setDateBorrow(e.target.value)}
                  />
                  {dateErr && (
                    <span style={{ fontSize: 14, color: "red" }}>
                      Ngày mượn không được bé hơn ngày hiện tại
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="datePaid">
                  <Form.Label>Ngày trả</Form.Label>
                  <Form.Control
                    type="date"
                    value={datePaid}
                    onChange={(e) => setDatePaid(e.target.value)}
                  />
                  {dateErr && (
                    <span style={{ fontSize: 14, color: "red" }}>
                      Ngày trả không được bé hơn ngày hiện tại
                    </span>
                  )}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdd}>
                Hủy
              </Button>
              <Button variant="primary" onClick={handleAddBook}>
                Thêm
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Xác nhận xóa</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn muốn xóa sách này không?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDelete}>
                Hủy
              </Button>
              <Button variant="danger" onClick={confirmDeleteBook}>
                Xóa
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sách</th>
            <th>Sinh viên mượn</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th>Hoạt động</th>
          </tr>
        </thead>
        <tbody>
          {bookState.map((book: Books, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{book.nameBook}</td>
              <td>{book.studentBorrow}</td>
              <td>{formatDate(book.dateBorrow)}</td>
              <td>{formatDate(book.datePaid)}</td>
              <td style={{ width: 200 }}>
                <Form.Select
                  aria-label="Default select example"
                  style={{ background: book.status ? "green" : "red" }}
                >
                  {book.status === true ? (
                    <>
                      <option style={{ background: "white" }} value="2">
                        Chưa trả
                      </option>
                      <option
                        style={{ background: "white" }}
                        value="1"
                        selected
                      >
                        Đã trả
                      </option>
                    </>
                  ) : (
                    <>
                      <option
                        style={{ background: "white" }}
                        value="2"
                        selected
                      >
                        Chưa trả
                      </option>
                      <option style={{ background: "white" }} value="1">
                        Đã trả
                      </option>
                    </>
                  )}
                </Form.Select>
              </td>
              <td>
                <Button variant="warning">Sửa</Button>{" "}
                <Button variant="danger" onClick={() => handleShowDelete(book)}>
                  Xóa
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
