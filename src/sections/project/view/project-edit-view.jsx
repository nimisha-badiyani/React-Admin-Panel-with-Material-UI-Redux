import React, { useEffect, useState } from "react";
import CreateAndEditProjectForm from "../createAndEditProjectForm";
import { useDispatch } from "react-redux";
import { fetchProjectById } from "../../../redux/thunks/projectThunk";
import { useParams } from "react-router-dom";

const ProjectEditView = () => {
  const [project, setProject] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getProject = async () => {
        try {
          const projectData = await dispatch(fetchProjectById(id)).unwrap();
          setProject(projectData);
        } catch (err) {
          console.log(err);
        }
      };
      getProject();
    }
  }, [id, dispatch]);

  return (
    <div>
      <CreateAndEditProjectForm currunt={project} />
    </div>
  );
};

export default ProjectEditView;
