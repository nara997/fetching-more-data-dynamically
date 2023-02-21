import { gql, useMutation} from '@apollo/client';

import { useEffect } from 'react';


const SEND_MUTATION = gql`
mutation UpdateMessage($input: updateMessageInput!){
  updateMessage(input: $input){
    id
    subject
    body
  }
}
`;

function SendMutation(props){
  const {update, setToggle} = props
  const {id, subject, body} = update

  const [sendData, { data, loading, error }] = useMutation(SEND_MUTATION);

  
  useEffect(() =>{
      setToggle(false)

  }, [data])
  
   

  if (loading) return <p className="styling1">Submitting...</p>;
  if (error) return <p className="styling1">`Submission error! ${error.message}`</p>;
  sendData({ variables: { input: {id, subject, body} } })
   
  
    
  

  return(
    <div>
      <h1>mutation successfull...</h1>

     </div>
  )



}

export default SendMutation