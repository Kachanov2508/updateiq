import axios from "axios";
import Course from "../../../components/Course/Course";

const CourseItem = ({ course }) => {

    console.log(course);

    return (
        <Course course={course} />
    )
}

export default CourseItem;


export async function getServerSideProps(context) {

    const response = await axios.get(`${process.env.domain}/api/${context.params.courses}/${context.params.course}`)
    const course = await response.data;

    return {
        props: {
            course: course.data,
        }
    }
}