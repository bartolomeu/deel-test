import { useContext, useState } from "react";
import { BuildingFillCheck, BuildingFillExclamation } from 'react-bootstrap-icons';

import { UserContext } from "../../userContext";
import { Button, Spinner, Table } from "react-bootstrap";
import { getUnpaidJobs, postPayJob } from "../../services/jobs";

function JobsUnpaid() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const callGetUpaid = async () => {
    setLoading(true);
    const req = await getUnpaidJobs(user);
    if (!req.ok) {
      setLoading(false);
      console.log("request error !!");
      return;
    }
    setData(await req.json());
    setLoading(false);
  };

  const callApiPayJob = async (id) => {
    const req = await postPayJob(id, user);
    if (!req.ok) {
      console.log("request error !!");
      return;
    }
    callGetUpaid();
  }

  return (
    <>
      {user ? (
        <Button variant="primary" onClick={callGetUpaid}>
          Search {loading && <Spinner size="sm" className="me-2" />}
        </Button>
      ) : (
        "Please Login"
      )}

      {data && data.length > 0 && <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Price</th>
            <th>Paid</th>
            <th>Contract ID</th>
            <th>Contract Terms</th>
            <th>Contract Status</th>
            <th/>
          </tr>
        </thead>
        <tbody>
          {data.map((d, ind) => <tr key={ind}>
            <td>{d.id}</td>
            <td>{d.description}</td>
            <td>{d.price}</td>
            <td className="text-center">{d.paid ? 
             <BuildingFillCheck />: 
             <BuildingFillExclamation />
             }</td>
            <td>{d.Contract.id}</td>
            <td>{d.Contract.terms}</td>
            <td>{d.Contract.status}</td>
            <td>
              <Button variant="primary" onClick={() => {callApiPayJob(d.id)}}>Pay</Button>
            </td>
          </tr>
            )}
        </tbody>
      </Table>}
    </>
  );
}

export default JobsUnpaid;
