import './App.css';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';

//Data to be worked on
var data = [
  {
    id: 10,
    name: "PARCEL1",
    sequence: 1,
    group: "Mumbai"
  },
  {
    id: 11,
    name: "PARCEL2",
    sequence: 2,
    group: "Mumbai"
  },
  {
    id: 13,
    name: "PARCEL3",
    sequence: 3,
    group: "Mumbai"
  },
  {
    id: 19,
    name: "PARCEL4",
    sequence: 4,
    group: "Delhi"
  },
  {
    id: 18,
    name: "PARCEL5",
    sequence: 5,
    group: "Delhi"
  },
  {
    id: 21,
    name: "PARCEL6",
    sequence: 6,
    group: "Kolkata"
  },
  {
    id: 12,
    name: "PARCEL7",
    sequence: 7,
    group: "Kolkata"
  },
  {
    id: 22,
    name: "PARCEL8",
    sequence: 8,
    group: "Kolkata"
  },
  {
    id: 23,
    name: "PARCEL9",
    sequence: 9,
    group: "Kolkata"
  },
  {
    id: 24,
    name: "PARCEL10",
    sequence: 10,
    group: "Mumbai"
  },
  {
    id: 25,
    name: "PARCEL11",
    sequence: 11,
    group: "Mumbai"
  },
  {
    id: 31,
    name: "PARCEL12",
    sequence: 12,
    group: "Mumbai"
  },
  {
    id: 34,
    name: "PARCEL13",
    sequence: 13,
    group: "Mumbai"
  },
  {
    id: 35,
    name: "PARCEL14",
    sequence: 14,
    group: "Delhi"
  },
  {
    id: 41,
    name: "PARCEL15",
    sequence: 15,
    group: "Delhi"
  },
  {
    id: 42,
    name: "PARCEL16",
    sequence: 16,
    group: "Delhi"
  },
  {
    id: 43,
    name: "PARCEL17",
    sequence: 17,
    group: "Delhi"
  },
  {
    id: 44,
    name: "PARCEL18",
    sequence: 18,
    group: "Kolkata"
  },
  {
    id: 53,
    name: "PARCEL19",
    sequence: 19,
    group: "Kolkata"
  },
  {
    id: 57,
    name: "PARCEL20",
    sequence: 20,
    group: "Kolkata"
  }
];

console.log("Reset==>", data);
// creating a copy of the data
var updatedDataObject = Object.assign(data);
function App() {

  let distinctGroup;
  const [store, setStore] = useState("");
  let selectedGroupName;
  let newName;
  let tempName = " ";


  const updateParcelValue = (val) => {
    if (store === val) {
      tempName = null;
    }
    setStore(val);
  }

  //Display the Groups that the elements belong to.
  function Head(props) {
    distinctGroup = [...new Set(props.data.map(x => x.group))]
    return (
      <header>
        <ul>
          {distinctGroup.map((element) => <li><Button variant="contained" disabled>{element}</Button></li>)}
        </ul>
      </header>

    )
  }
//display list of parcels
  function List(props) {
    return (
      <section>
\        <ul>
          {updatedDataObject.sort((a, b) => a.sequence > b.sequence ? 1 : -1).map((element) => <li key={element.id}><Button variant="contained" onClick={() => { updateParcelValue(element) }}>{element.name}</Button></li>)}
        </ul>
        <h1>
          Selected Parcel : {tempName === null ? "" : store.name}
        </h1>
      </section>
    )
  }
//Accept Values from user.
  function InsertElement() {
    const [name, setName] = useState("");
    newName = name;
    const selectedGroup = (value) => {
      selectedGroupName = value;
    }
    let dropdownList = distinctGroup.length > 0
      && distinctGroup.map((item, i) => {
        return (
          <option key={i} value={item}>{item}</option>
        )
      }, this);

    return (
      <div>
        <label>Enter Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>Select Location Group:</label>
        <select onClick={(e) => selectedGroup(e.target.value)}>
          {dropdownList}
        </select>
      </div>
    )
  }
//All Logic for data manipulation
  function ButtonFooter() {
    //AddBefore
    function addBefore() {
      if (newName === "" || newName === undefined || newName === null || selectedGroupName === "" || selectedGroupName === null || selectedGroupName === undefined) {
        alert("Please Fill in the details")
      } else {

        updatedDataObject.forEach(element => {
          if (element.sequence === store.sequence) {
            updatedDataObject.push({ "id": element.id + 5, "name": newName, "sequence": store.sequence, "group": selectedGroupName })
            updatedDataObject.forEach(element => {
              if (element.sequence >= store.sequence) {
                updatedDataObject.sequence = element.sequence++;
              }
            });
          }
        });
      }

    }

    //Add After
    function addAfter() {
      if (newName === "" || newName === undefined || newName === null || selectedGroupName === "" || selectedGroupName === null || selectedGroupName === undefined) {
        alert("Please Fill in the details")
      } else {
        updatedDataObject.forEach(element => {
          if (element.sequence + 1 === store.sequence) {
            console.log("Matched");
            updatedDataObject.push({ "id": element.id + 5, "name": newName, "sequence": store.sequence, "group": selectedGroupName })
            updatedDataObject.forEach(element => {
              if (element.sequence + 1 > store.sequence) {
                updatedDataObject.sequence = element.sequence++;
              }
            });
          }
        });
      }
    }
    //Replace
    function replace() {
      if (newName === "" || newName === undefined || newName === null || selectedGroupName === "" || selectedGroupName === null || selectedGroupName === undefined) {
        alert("Please Fill in the details")
      } else {
        updatedDataObject.forEach(element => {
          if (element.sequence === store.sequence) {
            updatedDataObject = updatedDataObject.filter(function (e) {
              return e.sequence !== store.sequence;
            })
            updatedDataObject.push({ "id": element.id + 5, "name": newName, "sequence": store.sequence, "group": selectedGroupName })
          }
        });
      }
    }

    //Delete selected
    function deleteParcel() {
      // updatedDataObject = data;
      if (!store) {
        alert("Select a package.")
      }
      updatedDataObject.forEach(element => {
        if (element.sequence === store.sequence) {
          updatedDataObject = updatedDataObject.filter(function (e) {
            return e.sequence !== store.sequence;
          })
        }
      });
    }

    //Refresh to reset all data
    function refresh() {

      updatedDataObject = null;
      updatedDataObject = data;
      window.location.reload()

    }
    function showFinal() {
      console.log("SHOW FINAL==>", updatedDataObject)
    }
    return (
      <footer>

        <Button variant="contained" onClick={() => { addBefore(newName, data, store, selectedGroupName) }} >Add Before</Button>
        <Button variant="contained" onClick={() => { addAfter(newName, data, store, selectedGroupName) }} >Add After</Button>
        <Button variant="contained" onClick={() => { replace(newName, data, store, selectedGroupName) }} >Replace</Button>
        <Button variant="contained" onClick={() => { deleteParcel(data, store) }} >Delete</Button>
        <Button variant="contained" onClick={() => { refresh(data, store) }} >Refresh</Button>
        <Button variant="contained" onClick={() => { showFinal(data) }} >Show Final</Button>
      </footer>
    )
  }


//Main return call
  return (
    <div className="App">
      <Head data={data} />
      <List data={data} />
      <InsertElement />
      <footer>
        <ButtonFooter />
      </footer>
    </div>
  );
}

export default App;
