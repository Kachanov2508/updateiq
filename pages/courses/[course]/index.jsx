import { useEffect, useState } from "react";
import axios from "axios";
// import router from 'next/router';
import Cours from "../../../components/Course/Course";

const Course = () => {
    const [course, setCourse] = useState({})
    const [firstVideo, setFirstVideo] = useState()

    const getCourse = async () => {
        const respons = await axios.get(`/api${window.location.pathname}`)
        // const respons = await axios.get(`/api/courses/${router.query.course}`)
        setCourse(respons.data.course);
        
        const firstFolder = await respons.data.course.folders.sort(function(a, b) {
            if (a.folderName.toLowerCase() < b.folderName.toLowerCase()) return -1;
            if (a.folderName.toLowerCase() > b.folderName.toLowerCase()) return 1;
            return 0;
        })

        const firstFile = firstFolder[0].files.sort(function(a, b) {
            if (a.fileName.toLowerCase() < b.fileName.toLowerCase()) return -1;
            if (a.fileName.toLowerCase() > b.fileName.toLowerCase()) return 1;
            return 0;
        })
        const firstFileUrl = firstFile.find(item => item.fileName.includes(".mp4"))
        
        setFirstVideo(firstFileUrl.fileUrl)
    }

    useEffect(() => {
        getCourse();
    }, []);


    return (
        <div>
            <Cours />
        </div>
    )
}

export default Course
