
export default function About() {
  return (
    <>
    <div className="container" >
        <h3 className='mb-4 my-1'>I-NoteBook</h3>
        <div className="accordion" id="accordionExample" >
            <div className="accordion-item">
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body" >
                    <strong>I-NoteBook is a React based Application to store notes on the Cloud</strong> 
                    <ul>
                    <li>This Application provides functionality to Add,Update,Delete Notes on Cloud.</li>
                    <li>JWT Authentication is used for User Login/Logout functionality for unique identification of a User.</li>
                    <li>Front-End developed on React Js.</li>
                    <li>Back-End developed on express for making API calls to database.</li> 
                    <li>MongoDB-Atlas is used for database Connectivity that let you store data on MongoDB Cloud.</li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    </div>

    </>
  )
}
