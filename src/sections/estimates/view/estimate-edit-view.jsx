import React, { useEffect, useState } from "react";
import EstimatesCreateEditView from "../estimate-create-edit-view";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEstimationsById } from "../../../redux/thunks/estimationThunk";

const EstimateEditView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [estimate, setEstimate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const getProject = async () => {
        try {
          setLoading(true);
          const estimateData = await dispatch(
            fetchEstimationsById(id)
          ).unwrap(); // Fetch project data
          setEstimate(estimateData); // Set the project in local state
        } catch (err) {
          setError("Error fetching project.");
        } finally {
          setLoading(false);
        }
      };
      getProject();
    }
  }, [id, dispatch]);
  return (
    <div>
      <EstimatesCreateEditView current={estimate} />
    </div>
  );
};

export default EstimateEditView;
