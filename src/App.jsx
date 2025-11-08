import { useEffect, useState } from 'react'
import moment from 'moment';
import classes from './styles/App.module.css';
import { IconTrash } from '@tabler/icons-react';

function App() {
  const [data, setdata] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const result = await window.api.getData();
    setdata(result);
  };

  fetchData();
}, []);

  const [username, setUsername] = useState('');
  const [log, setlog] = useState('');
  const [severity, setSeverity] = useState('low'); 

  const submit = async () => {
  if (!log.trim() || !username.trim()) return;

  const newEntry = {
    id: Date.now().toString(),
    username,
    log,
    date: moment().format("YYYY-MM-DD"),
    status: severity,
  };

  setdata((prev) => [...prev, newEntry]);
  setlog('');
  setUsername('');

  await window.api.submitData(newEntry);
};

const deleteBug=(id)=>{
const temp =data.filter((data)=>{return id!=data.id});
setdata(temp);
console.log(temp);
}

  const statusColor = (status) => {
    switch (status) {
      case 'high': return 'red';
      case 'moderate': return 'blue';
      case 'low': return 'rgb(9, 215, 9)';
    }
  };

  return (
    <>
      <h1 className={classes.header}>Bug Logger</h1>

      <div className={classes.row}>
        <input 
          placeholder='User Name' 
          className={classes.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input 
          placeholder='Enter the log' 
          className={classes.input}
          value={log}
          onChange={(e) => setlog(e.target.value)}
        />

        <select 
          className={classes.select}
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>

      <button className={classes.submit_btn} onClick={submit}>
        Submit
      </button>

      <div className={classes.container}>
        {data.length===0 && (
          <p style={{textAlign:'center',marginTop:'40%',color:'gray'}}>
            Empty logs
          </p>
        )}

        {data.map((datas) => {
          const date = moment(datas.date, "YYYY-MM-DD");
          return (
            <div key={datas.id} className={classes.content_box}>
              <div className={classes.left}>
                <h4 className={classes.log}>{datas.log}</h4>

                <h5 className={classes.username}>
                  Posted by: <span style={{color:"gray"}}>{datas.username}</span>
                </h5>

                <h5 style={{ color: statusColor(datas.status) }}>
                  {datas.status}
                </h5>
              </div>

              <div className={classes.right}>
                <h6 className={classes.date}>
                  {date.format("MMMM Do YYYY")}
                </h6>

                <IconTrash size={20} color='red' className={classes.bin} onClick={()=>deleteBug(datas.id)}/>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
