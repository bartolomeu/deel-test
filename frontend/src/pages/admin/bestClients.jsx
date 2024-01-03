import { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { getBestClients } from "../../services/admin";

function AdminBestClients() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState("");
  const [data, setData] = useState();

  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();
    return [year, month, day].join("-");
  };

  const callApigetBestClients = async () => {
    setLoading(true);
    const dateFromFormated = formatDate(dateFrom);
    const dateToFormated = formatDate(dateTo);
    const req = await getBestClients(dateFromFormated, dateToFormated, limit);
    if (!req.ok) {
      setLoading(false);
      console.log("request error !!");
      return;
    }
    setData(await req.text());
    setLoading(false);
  };

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          callApigetBestClients();
        }}
      >
        <Row>
          <Form.Group as={Col} className="d-flex align-items-center">
            <Form.Control
              type="date"
              placeholder="From"
              value={dateFrom}
              onFocus={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </Form.Group>
          {dateFrom}
          <Form.Group as={Col} className="d-flex align-items-center">
            <Form.Control
              type="date"
              placeholder="To"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} className="d-flex align-items-center">
            <Form.Control
              type="number"
              placeholder="Limit"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </Form.Group>
          <Col>
            <Button variant="primary" type="submit">
              Search
              {loading && <Spinner size="sm" className="me-2" />}
            </Button>
          </Col>
        </Row>
      </Form>
      {data &&
        data.map((data, index) => (
          <h2 className="pt-5" key={index}>
            The Client {data.fullName} has paid {data.paid}
          </h2>
        ))}
    </>
  );
}

export default AdminBestClients;
