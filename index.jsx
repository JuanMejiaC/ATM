const ATMDeposit = ({ onChange, isDeposit, isValid}) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
    </label>
  );
};


const ACCHistory = ({ hist }) => {
  let history = hist.map((item, index) =>{
  let color1 = item.amount < 0? "red" : "green";
  let color2 = index % 2 === 0? "#f6dfeb" : "#e4bad4";
    return <div className="row border-between" key={index} style={{background:color2}}><div className="col-md-1" style={{color:color1}}>{`${Math.abs(item.amount)}`}</div><div className="col-md-1" style={{color:color1}}>{`${item.balance}`}</div></div>;
  });
  history.unshift(<div className="row border-between" key={-1} style={{background:"#edffec"}}><div className="col-md-1">Amount</div><div className="col-md-1">Balance</div></div>);
  return <div className="container">{history}</div>;
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [accHistory, setAccHistory] = React.useState([]);
  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);

    if(Number(event.target.value) <= 0) {
      setValidTransaction(false);
      return;
    }
    
    if(atmMode == "Cash Back" && totalState < Number(event.target.value)){
      setValidTransaction(false); 
    }else{
      setValidTransaction(true);
    }

    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newTotal, temp;
    if(isDeposit){
      newTotal = totalState + deposit;
      temp = deposit;
    }else{
      if(totalState >= deposit){
        newTotal = totalState - deposit;
        temp = deposit * -1;
      }else{
        alert("Not enough funds")
        return;
      }
    }
    console.log(temp);
    setTotalState(newTotal);
    setAccHistory([...accHistory, {"amount":temp,"balance": newTotal}]);
  };

  const handleModeSelect = (e) => {
    setAtmMode(e.target.value);
    switch(e.target.value) {
      case "Deposit":
        setIsDeposit(true);
        break;
      case "Cash Back":
        setIsDeposit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={handleModeSelect} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      {
        atmMode != "" && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
      }
      <ACCHistory hist={accHistory}></ACCHistory>
    </form>
  );
};


// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
