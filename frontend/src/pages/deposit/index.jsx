import { useContext, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { UserContext } from "../../userContext";
import { postDeposit } from "../../services/balance";

function Deposit() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const callApiDeposit = async () => {
    const body = { amount };
    setLoading(true);
    const req = await postDeposit(user, body);
    if (!req.ok) {
      const resp = await req.json();
      alert(resp.message);
      console.log("request error !!");
      console.log(resp);
      setLoading(false);
      return;
    }
    setLoading(false);
    alert("Deposit Success");
  };
  return (
    <>
      <input
        type="number"
        className="me-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      {user ? (
        <Button variant="primary" onClick={callApiDeposit}>
          Deposit {loading && <Spinner size="sm" className="me-2" />}
        </Button>
      ) : (
        "Please Login"
      )}
    </>
  );
}

export default Deposit;
