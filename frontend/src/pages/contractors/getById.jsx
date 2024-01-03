import { useContext, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { UserContext } from "../../userContext";
import { getContractorById } from "../../services/contractor";

function ContractorGetById() {
  const [searchID, setSearchID] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const { user } = useContext(UserContext);

  const callGetById = async () => {
    setLoading(true);
    const req = await getContractorById(searchID, user);
    if (!req.ok) {
      setLoading(false);
      setData(null);
      console.log("request error !!");
      return;
    }
    const response = await req.json();
    setLoading(false);
    setData(response);
  };
  return (
    <>
      <input
        type="text"
        className="me-2"
        value={searchID}
        onChange={(e) => setSearchID(e.target.value)}
      />
      {user ? (
        <Button variant="primary" onClick={callGetById}>
          Search {loading && <Spinner size="sm" className="me-2" />}
        </Button>
      ) : (
        "Please Login"
      )}
      <pre>{data && JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default ContractorGetById;
