import Student from "./Student.jsx";

function App() {
    return(
      <>
        <Student name="Spongebob" age={30} isStudent={true} />
        <Student name="Patric" age={42} isStudent={false} />
        <Student />


      </>
    );
}

export default App
