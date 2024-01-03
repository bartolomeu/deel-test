import { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { getBestProfession } from "../../services/admin";

function AdminBestProfession() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month, day].join('-');
  }

  const callApigetBestProfession = async () => {
    setLoading(true);
    const dateFromFormated = formatDate(dateFrom);
    const dateToFormated = formatDate(dateTo);
    const req = await getBestProfession(dateFromFormated, dateToFormated);
    if (!req.ok) {
      setLoading(false);
      console.log("request error !!");
      return;
    }
    setData(await req.text());
    setLoading(false);
  }

  
  return (
    <>
      <Form onSubmit={(e) => {e.preventDefault(); callApigetBestProfession()}}>
        <Row>
          <Form.Group as={Col} className="d-flex align-items-center">
            <Form.Label>From</Form.Label>
            <Form.Control
              type="date"
              placeholder="From"
              value={dateFrom}
              onFocus={(dateFrom)}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </Form.Group>
          {dateFrom}
          <Form.Group as={Col} className="d-flex align-items-center">
            <Form.Label>To</Form.Label>
            <Form.Control
              type="date"
              placeholder="To"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
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
      <h1 className="pt-5">{data && `The Best Profession is: ${data}`}</h1>
    </>
  );
}

export default AdminBestProfession;
