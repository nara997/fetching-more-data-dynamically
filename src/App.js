import { useQuery, gql } from '@apollo/client';
import "./App.css"
import { useState } from 'react';
import FetchingMore from "./FetchingComponent/index"

const GET_SUBJECTS = gql`
  query GetSubjects{
   messages{
          items{
                 subject
                 id
                 body
                }       
              
              }
  }
`
;


// adding readmore and readless for long texts
const ReadMore = ({ prop }) => {
  const text = prop;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "  ...read more" : "  show less"}
      </span>
    </p>
  );
};




export default function App() {
  const { loading, error, data } = useQuery(GET_SUBJECTS);
  const [show, setShow] = useState(false)
  const[idValue, setIdValue] = useState("")

 
  
  if (loading) return <p className="loadingStyle">Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className='bg-conatiner'>
      <h1 className="heading">..More Data is Fetched and Displayed Dynamically By Clicking More Details And Also After Editing   Subject or Body(or both)You Can Send mutation by Clicking on Update...</h1>

      <div class="card">
        <div className="leftSideCard">

        {
        data.messages.items.map(eachMessage =>(
        <div className="semi-card" key ={eachMessage.id}>
        <p className="idstyling">id:{eachMessage.id}</p>
        <h3 className="App-link">subject:{eachMessage.subject}</h3>
        <div className="bodyStyling">
        <h4>body:
        {eachMessage.body.length >= 100 ? <ReadMore prop={eachMessage.body} /> : eachMessage.body}
        
        </h4>
        </div>
        <div className="buttonContainer">
        <button className='stylingBle'  onClick={() => {
          setShow(true)
          setIdValue(eachMessage.id)
        }}>More Details</button>
        </div>
        </div>))}
        </div>

        <div  className='rightSideCard'>
        {show && <FetchingMore showFunction={setShow} id={idValue}/> }  
        </div>
        
        
        </div>
      

      </div>
         
         
         
         );
}