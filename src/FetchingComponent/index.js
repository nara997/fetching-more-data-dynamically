import "./index.css"

import { useQuery, gql } from '@apollo/client';


const GET_Datailed_view = gql`
query Getmessage($id: String! = "174563"){
    message(id: $id){
      id
      subject
      body
      language
      post_time
      metrics{
        views
      }
      author{
        view_href
        login
      }
      ratings{
        items{
          value
          user {
            id
          }
        }
      }
    }
  }
`;



const FetchingMore = (props)  => {

    const {id,showFunction } = props

    const { loading, error, data } = useQuery(GET_Datailed_view, {
        variables : {
          id: `${id}` 
      },})
    if (loading) return <p className="loadingStyle">Loading...</p>;
    if (error) return <p className="loadingStyle">Error : {error.message}</p>;

    return(
        <div className="detailedViewCard">

        <div className="card">
          <p>ID:<span>{data.message.id}</span></p>
          <p>Author: <span>{data.message.author.login}</span></p>
          <p>Language:<span>{data.message.language}</span></p>


        </div>
        <div className="card">
        <p>Views <br/><span>{data.message.metrics.views}</span></p>

          <p>Post Time<br/> <span>{data.message.post_time}</span></p>
        </div>
        <div className="card">
        <p>Subject=></p>
          <textarea cols="35" rows="4" className="textAreaStyling">{data.message.subject}</textarea>
        </div>
        
          <div className="card">
          <p>Body=></p>
          <textarea cols="35" rows="7" className="textAreaStyling">{data.message.body}</textarea>
          </div>
          <div className="url-container">

        <p>URL:<br/><span>{data.message.author.view_href}</span></p>
        </div>


       <button onClick={() =>showFunction(false) } className="hide-button">Hide</button>
       </div>
    )
}

 

    


export default FetchingMore