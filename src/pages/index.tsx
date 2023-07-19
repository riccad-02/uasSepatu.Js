import axios from 'axios';
import { useState,useEffect } from "react";
import { stat } from "fs";

import Link from 'next/link';

// const client = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com/posts"
// });

const koneksiSepatu = axios.create({
   baseURL: "http://127.0.0.1:5000/api/sepatu"
 }); 

export default function FormSepatu() {
    const [sepatu, setSepatu] =  useState(null);
    const [kode_sepatu, setKode_sepatu] = useState("");
    const [nama_sepatu, setNama_sepatu] = useState("");
    const [pembeli, setPembeli] = useState("");
    const [size_sepatu, setSize_sepatu] = useState("");
    const [foto, setFoto] = useState("");
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
    const [stateedit,setEdit]=useState("hide");

  const handleSubmitAdd =  (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiSepatu
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });    
 }

  const handleSubmitEdit =  (event) => {
    event.preventDefault();
    const address = "/"+event.target.kode_sepatu.value;
      alert(address);
  //const formData = new FormData(event.target);
    const formData = {
      kode_sepatu: event.target.kode_sepatu.value,
      nama_sepatu: event.target.nama_sepatu.value,
      pembeli: event.target.pembeli,
      size_sepatu: event.target.size_sepatu,
      foto: event.target.foto,
      }

  alert(formData);
  koneksiSepatu
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

    const handleAdd = (event) => {
      setAdd("show");
      setbtnAdd("hide");
      setEdit("hide");   
}

    const handleCancelAdd = (event) => {
      setAdd("hide");
      setbtnAdd("show");
      setEdit("hide");
}

    const handleCancelEdit = (event) => {
      setAdd("hide");
      setbtnAdd("show");
      setEdit("hide");
      setKode_sepatu("");
      setNama_sepatu("");
      setPembeli("");
      setSize_sepatu("");
      setFoto("");
}

    const handleDelete = (event) => {
      event.preventDefault();
      var kode_sepatu = event.target.value;
      koneksiSepatu.delete(`/${kode_sepatu}`)
        .then(response => {
          console.log('Data berhasil dihapus:', response.data);
          setSepatu(
           sepatu.filter((sepatu) => {
               return sepatu.kode_sepatu !== kode_sepatu;
            }))
       
          // Lakukan langkah-langkah lain setelah penghapusan data
        })
        .catch(error => {
          console.error('Gagal menghapus data:', error);
    })
  }

      const handleEdit = (event) => {
        event.preventDefault();
        var kode_sepatu = event.target.value;
 
              const bjEdit = sepatu.filter((sepatu) => {
                   return sepatu.kode_sepatu == kode_sepatu;
        });
                    if(bjEdit!=null){
                      setKode_sepatu(bjEdit[0].kode_sepatu);
                      setNama_sepatu(bjEdit[0].nama_sepatu);
                      setPembeli(bjEdit[0].pembeli);
                      setSize_sepatu(bjEdit[0].size_sepatu);
                      setFoto(bjEdit[0].foto);
                      setAdd("hide");
                      setbtnAdd("hide");
                      setEdit("show");
          }
        }

    useEffect(() => {
      async function getSepatu() {
        const response = await koneksiSepatu.get("/").then(function (axiosResponse) {
            setSepatu(axiosResponse.data.data);
         })
         .catch(function (error) {
         
          alert('error from sepatu in api sepatu: '+error);
         });;
          }
      getSepatu();
    }, []);

  if(!sepatu) {
    return (

      <div><center><h1>Loading...</h1></center></div>

    )
  }

 

    return (
      

      <center>
      <div className="background">

      <br />
      <h1 style={{fontFamily: "Hobo Std",
                color:"brown", 
                fontSize:"50px",
                }}>TOKO SEPATU</h1><br />
      <div>
      <title>LabPemograman</title>
      <button id="btnadd" onClick={handleAdd} className={statebutonadd} 
              style={{backgroundColor: "black",
                      color:"yellow",
                      borderWidth:"1px",
                      padding:"13px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>ADD</button>

       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd}><br></br>
       <h2 style={{color:"white"}}>INPUT DATA</h2><br></br>

        <table border={3}>
            <tbody style={{color:"yellow",padding:"3px"}}>
        
        <tr>
            <td><label> Kode sepatu : </label></td>
            <td><input type="text" id="kode_sepatu" name="kode_sepatu"/></td>
        </tr> 

        <tr>
            <td><label> Nama sepatu : </label></td>
            <td><input type="text" id="nama_sepatu" name="nama_sepatu"/></td>
        </tr> 

        <tr>
            <td><label> Pembeli : </label></td>
            <td><input type="text" id="pembeli" name="pembeli"/></td>
        </tr> 

        <tr>
            <td><label> Size sepatu : </label></td>
            <td><input type="text" id="size_sepatu" name="size_sepatu"/></td>
        </tr> 

        <tr>
            <td><label> Foto : </label></td>
            <td><input type="file" name="image"/></td>
        </tr>
        
        <br ></br>

            </tbody>
        </table>

          <input type="submit"  
                style={{padding: "5px",
                        color:"black",
                        backgroundColor:"red",
                        cursor: "pointer"
                        }}/>

          <input type="button" value="Cancel" onClick={handleCancelAdd} 
                style={{padding: "5px",
                        color:"black",
                        backgroundColor:"red",
                        cursor: "pointer"
                      }}
          
          /><br ></br><br ></br>
          </form>  
      
 <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}><br></br>
          <h2 style={{color:"white"}}>FORM EDIT</h2><br></br>

        <table border={3}> 
          
              <tbody style={{color:"yellow"}}>
        <tr>
            <td><label> Kode sepatu : </label></td>
            <td><input type="text" id="kode_sepatu"  value={kode_sepatu} name="kode_sepatu"/></td>
        </tr>

        <tr>
            <td><label> Nama sepatu : </label></td>
            <td><input type="text" id="nama_sepatu"  value={nama_sepatu} name="nama_sepatu"
               onChange={(e) => setNama_sepatu(e.target.value)}/></td>
        </tr>

        <tr>
            <td><label> Pembeli : </label></td>
            <td><input type="text" id="pembeli"  value={pembeli} name="pembeli"
               onChange={(e) => setPembeli(e.target.value)}/></td>
        </tr>

        <tr>
            <td><label> Size sepatu : </label></td>
            <td><input type="text" id="size_sepatu"  value={size_sepatu} name="size_sepatu"
               onChange={(e) => setSize_sepatu(e.target.value)}/></td>
        </tr>

        <tr>
            <td><label> Foto : </label></td>
            <td><input type="file" name="image"/></td>
        </tr>
        
        <br ></br>

              </tbody>
          </table>

          <input type="submit" 
                style={{padding:"3px",
                        color:"red",
                        backgroundColor:"yellow",
                        cursor: "pointer"
                        }}/>

|
          <input type="button" value="Cancel" onClick={handleCancelEdit}  
                style={{padding: "3px",
                        color:"red",
                        backgroundColor:"brown",
                        cursor: "pointer"
                      }}
          
          /><br ></br><br ></br>
          </form><br/><br/>
      
        <h3 style={{fontFamily:"arial black", fontSize:"30px", backgroundColor:"green", color:"BLACK", 
        width:"40%", borderRadius:"7px",}}>
            DAFTAR PEMBELIAN SEPATU</h3>
            
          <table className='desain'>
            
              <thead>
                <tr>         
                <th className="desain1">Kode Sepatu</th>
                <th className="desain1">Nama Sepatu</th>
                <th className="desain1">Pembeli</th>
                <th className="desain1">Size Sepatu</th>
                <th className="desain1">Foto</th>
                <th colSpan={2}>Action</th>
                </tr>
              </thead>
      
              <tbody>
              {sepatu.map((bj) =>
                  <tr style={{textAlign:'center'}}> 
                    <td>{bj.kode_sepatu}</td>
                    <td>{bj.nama_sepatu}</td>
                    <td>{bj.pembeli}</td>
                    <td>{bj.size_sepatu}</td>
                    <td><img src={bj.foto} width="150"/></td>

          <td><button onClick={handleEdit} value={bj.kode_sepatu} 
              style={{backgroundColor: "Green",
                      color:"black",
                      borderWidth:"1px",
                      padding:"5px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>Edit</button></td>

          <td><button onClick={handleDelete} value={bj.kode_sepatu}
              style={{backgroundColor: "Red",
                      color:"black",
                      borderWidth:"1px",
                      padding:"5px",
                      borderRadius:"5px",
                      cursor: "pointer"
                      }}>Delete</button></td>

                  </tr>
              )}
              </tbody>
                 
    </table>
    </div>
    </div>
    </center>     
            
    )
  }
  
