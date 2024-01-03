import { useContext, useState } from "react";
import { UserContext } from "../../userContext";
import { getContractorAll } from "../../services/contractor";
import { Button, Spinner } from "react-bootstrap";

function ContractorGetAll() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const { user } = useContext(UserContext);

  const callGetById = async() => {
    setLoading(true);
    const req = await getContractorAll(user);
    if (!req.ok) {
      setLoading(false);
      setData(null);
      console.log('request error !!');
      return;
    }
    const response = await req.json();
    setLoading(false);
    setData(response);
  }
  return (<>
    {
      user ? (
        <Button variant="primary" onClick={callGetById}>Search {loading && <Spinner size="sm" className="me-2" />}</Button>
      ) : 'Please Login'
    }
    <pre>{data && JSON.stringify(data, null, 2)}</pre>
  </>
  )
}

export default ContractorGetAll