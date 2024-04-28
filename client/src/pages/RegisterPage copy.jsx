import { Link } from "react-router-dom"
import styled from "styled-components";
  

const RegisterPage = () => {
  return (
    <Wrapper>
    <body>
    <div class="navbar">
      <h1>Colegio De San Gabriel Arcangel</h1>
    </div>
    <div class="containerlog">
        <div class="heading"> 
          Register
        </div>

      <div>
      <form action="">
        <label htmlFor="fname">First Name</label><br />
        <input type="text" id="fname" name="fname" /><br />
        <label htmlFor="mname">Middle Name</label><br />
        <input type="text" id="mname" name="mname" /><br />
        <label htmlFor="lname">Last Name</label><br />
        <input type="text" id="lname" name="lname" /><br />
        <Link  to="/login">Already have an account?</Link>
        <br /> 
        <button class="submit" value="Submit">Register</button>
      </form>
      </div>
    </div>

  </body>
  </Wrapper>


  )
}

const Wrapper = styled.div`

  .containerlog
  {
    float: left;
    text-align: left  ;
    
    background-color: white;
    width: 50%;
    margin: 15px;
    padding: 20px;
    border-radius: 15px;
  }
  
  .heading
  {
    width: 100%;
    text-align: center;
    margin: 5px;
    padding: 5px;
    border-radius: 15px;
    background-color: maroon;
    color: aliceblue;
  }

  .colegio
  {
    /* background-image: image("cdsga-bg.jpg"); */
    width: 100%;
    height: 100%;
    margin:0%;
    padding: 10px;
    background-color: aliceblue;
  }
`

export default RegisterPage