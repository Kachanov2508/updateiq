import axios from "axios";
import Course from "../../../../components/Course/Course";

const Lesson = ({course}) => {

    return (
      <div>
          <Course course={course} />
      </div>
    );
  };
  
  export default Lesson;
  

  export async function getServerSideProps(context) {

    const response = await axios.get(`${process.env.domain}/api/${context.params.courses}/${context.params.course}/${context.params.lesson}`);
    const course = await response.data;

    return {
      props: {
        course: course
      }
    }
  }